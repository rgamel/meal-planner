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
import { usePlans, useRecipes, useSelectedPlan } from 'app/hooks';
import { isEmpty } from 'lodash/fp';
// import Fraction from 'fraction.js';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function QuantitySelect({ recipeId: _recipeId }: { recipeId: string }) {
    // TODO: implement persisting quantities
    const [quantity, setQuantity] = useState('1');
    return (
        <Select
            value={quantity}
            onChange={(e) => {
                setQuantity(e.target.value);
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
    const { id } = useParams();
    const { recipes } = useRecipes();
    const { plans, deletePlan, updatePlan } = usePlans();
    const { setSelectedPlan } = useSelectedPlan();
    const nav = useNavigate();

    const plan = plans[id as string];

    const [editingName, setEditingName] = useState(false);
    const [planName, setPlanName] = useState(plan?.name);

    const currentRecipes = plan?.recipes || [];

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
                    {currentRecipes.map((recipeId) => (
                        <ListItem key={recipeId}>
                            <ListItemText primary={recipes[recipeId]?.name || recipeId} />
                            <QuantitySelect recipeId={recipeId} />
                        </ListItem>
                    ))}
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
                            setSelectedPlan(id as string);
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
                            setSelectedPlan(id as string);
                            nav('/groceries');
                        }}
                    >
                        Groceries
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        onClick={() => {
                            // eslint-disable-next-line no-alert
                            const response = prompt(
                                'If you are sure you want to delete, please type the name of the plan below. This cannot be undone',
                            );
                            if (response?.toLowerCase() === plan?.name.toLowerCase()) {
                                deletePlan(id as string);
                                // eslint-disable-next-line no-alert
                                alert('Plan deleted');
                                nav('/plans');
                            }
                        }}
                        fullWidth
                        color="error"
                    >
                        Delete Plan
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}
