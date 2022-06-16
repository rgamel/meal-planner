import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Fab,
    Icon,
    List,
    ListItem,
    ListItemText,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { usePlans } from 'app/hooks';
import { startCase } from 'lodash';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Plans() {
    const { plans, addPlan } = usePlans();
    const [isPlanDialogOpen, setIsPlanDialogOpen] = useState(false);
    const [planName, setPlanName] = useState('');
    const nav = useNavigate();

    return (
        <>
            <Typography variant="h1">Plans</Typography>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {Object.values(plans).map((plan) => (
                    <ListItem
                        key={plan.id}
                        onClick={() => {
                            nav(`${plan.id}`);
                        }}
                    >
                        <ListItemText primary={startCase(plan.name)} />
                    </ListItem>
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
                            onChange={(e) => {
                                setPlanName(e.target.value);
                            }}
                            sx={{ mb: 1 }}
                        />
                        <Button
                            variant="contained"
                            onClick={() => {
                                addPlan({ name: planName, recipes: [], shoppedItems: [] });
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
