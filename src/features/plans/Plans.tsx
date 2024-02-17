import { Button, Dialog, DialogContent, DialogTitle, List, Stack, TextField, Typography } from '@mui/material';
import { usePlans } from 'app/hooks';
import { AddFab } from 'features/groceries/AddFab';
import { useState } from 'react';
import { PlanListItem } from './PlanListItem';

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
            <AddFab
                onClick={() => {
                    setIsPlanDialogOpen(true);
                }}
            />
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
