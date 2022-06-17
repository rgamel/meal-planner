import {
    Button,
    Grid,
    Icon,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListSubheader,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { usePlannedQuantity, usePlans, useRecipes } from 'app/hooks';
import { isEmpty, noop, startCase } from 'lodash/fp';
import { useConfirm } from 'material-ui-confirm';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function QuantitySelect({
    recipeWithQuantity: { id, quantity },
}: {
    recipeWithQuantity: { id: string; quantity: string };
}) {
    // TODO: implement persisting quantities
    const [q, setQ] = useState(quantity);
    const updatePlannedQuantity = usePlannedQuantity();
    return (
        <Select
            value={q}
            onChange={(e) => {
                setQ(e.target.value);
                updatePlannedQuantity(id, e.target.value);
            }}
            sx={{ minWidth: 75 }}
        >
            <MenuItem value="0.5">0.5</MenuItem>
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
        </Select>
    );
}

export default function Plan() {
    const planId = useParams().id as string;
    const { recipes } = useRecipes();
    const { plans, setSelectedPlan, deletePlan, updatePlan } = usePlans();
    const nav = useNavigate();
    const confirm = useConfirm();

    const plan = plans[planId];

    const [editingName, setEditingName] = useState(false);
    const [planName, setPlanName] = useState(startCase(plan?.name));

    const currentRecipes = plan?.recipes || [];

    useEffect(() => {
        setSelectedPlan(planId);
    }, [planId, setSelectedPlan]);

    const handleDelete = () => {
        confirm({
            title: `Delete ${planName}?`,
            description: 'This cannot be undone',
            confirmationButtonProps: { color: 'error', variant: 'contained' },
        })
            .then(() => {
                deletePlan(planId);
                nav('/plans');
            })
            .catch(noop);
    };

    return (
        <div>
            <IconButton
                onClick={() => {
                    nav('/plans');
                }}
            >
                <Icon>arrow_back</Icon>
            </IconButton>
            <Stack direction="row">
                {editingName ? (
                    <>
                        <TextField onChange={(e) => setPlanName(e.target.value)} value={planName} />
                        <Button
                            onClick={() => {
                                updatePlan({ ...plan, name: planName });
                                setEditingName(false);
                            }}
                        >
                            Save
                        </Button>
                    </>
                ) : (
                    <>
                        <Typography variant="h4">{planName}</Typography>
                        <IconButton
                            onClick={() => {
                                setEditingName(true);
                            }}
                        >
                            <Icon>edit</Icon>
                        </IconButton>
                    </>
                )}
            </Stack>
            {!isEmpty(currentRecipes) ? (
                <List
                    sx={{ width: '100%', bgcolor: 'background.paper' }}
                    subheader={<ListSubheader>Recipes</ListSubheader>}
                >
                    {currentRecipes.map((recipeWithQuantity: { id: string; quantity: string }) => {
                        const recipeId = recipeWithQuantity.id;
                        return (
                            <ListItem key={recipeId}>
                                <ListItemText primary={startCase(recipes[recipeId]?.name) || recipeId} />
                                <QuantitySelect recipeWithQuantity={recipeWithQuantity} />
                            </ListItem>
                        );
                    })}
                </List>
            ) : (
                <Typography variant="h6">No recipes for this plan</Typography>
            )}
            <Grid container columns={12}>
                <Grid item xs={6}>
                    <Button
                        fullWidth
                        variant={isEmpty(currentRecipes) ? 'contained' : 'outlined'}
                        onClick={() => {
                            setSelectedPlan(planId);
                            nav('/recipes');
                        }}
                    >
                        Recipes
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        fullWidth
                        variant={!isEmpty(currentRecipes) ? 'contained' : 'outlined'}
                        onClick={() => {
                            setSelectedPlan(planId);
                            nav('/groceries');
                        }}
                    >
                        Groceries
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={handleDelete} fullWidth color="error">
                        Delete Plan
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}
