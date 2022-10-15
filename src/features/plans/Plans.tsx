import { useState } from 'react';
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Fab,
    Icon,
    Link,
    List,
    ListItem,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import startCase from 'lodash/fp/startCase';
import { Link as RouterLink } from 'react-router-dom';
import { usePlans } from 'app/hooks';

function PlanListItem({ id, name }: { id: string; name: string }) {
    return (
        <ListItem key={id}>
            <Typography>
                <Link component={RouterLink} to={`${id}`}>
                    {startCase(name)}
                </Link>
            </Typography>
        </ListItem>
    );
}

export default function Plans() {
    const { plans, addPlan } = usePlans();
    const [isPlanDialogOpen, setIsPlanDialogOpen] = useState(false);
    const [planName, setPlanName] = useState('');

    return (
        <>
            <Typography variant="h1">Plans</Typography>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {Object.values(plans).map((plan) => (
                    <PlanListItem key={plan.id} id={plan.id} name={plan.name} />
                ))}
            </List>
            <Fab
                color="primary"
                aria-label="add"
                onClick={() => {
                    setIsPlanDialogOpen(true);
                }}
                sx={{ position: 'fixed', bottom: 24, right: 24 }}
            >
                <Icon>add</Icon>
            </Fab>
            <Dialog fullWidth open={isPlanDialogOpen} onClose={() => setIsPlanDialogOpen(false)}>
                <DialogTitle>Create Plan</DialogTitle>
                <DialogContent>
                    <Stack direction="column">
                        <TextField
                            required
                            variant="filled"
                            autoFocus
                            label="Plan name"
                            onChange={(e: { target: { value: string } }) => {
                                setPlanName(e.target.value);
                            }}
                            sx={{ mb: 1 }}
                        />
                        <Button
                            variant="contained"
                            onClick={() => {
                                addPlan({ name: planName, recipes: [], shoppedItems: [], groceries: [] });
                                setIsPlanDialogOpen(false);
                            }}
                        >
                            Create
                        </Button>
                    </Stack>
                </DialogContent>
            </Dialog>
        </>
    );
}
