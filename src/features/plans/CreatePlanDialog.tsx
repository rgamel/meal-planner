import { Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import { usePlans } from 'app/hooks';
import { Dispatch, SetStateAction, useState } from 'react';

type CreatePlanDialogProps = {
    setIsPlanDialogOpen: Dispatch<SetStateAction<boolean>>;
};

export function CreatePlanDialog({ setIsPlanDialogOpen }: CreatePlanDialogProps) {
    const [planName, setPlanName] = useState('');
    const { addPlan } = usePlans();

    return (
        <Dialog fullWidth open onClose={() => setIsPlanDialogOpen(false)}>
            <DialogTitle>Create Plan</DialogTitle>
            <DialogContent>
                <div className="my-6 flex flex-col">
                    {/* <TextField
                        required
                        variant="filled"
                        autoFocus
                        label="Plan name"
                        onChange={(e: { target: { value: string } }) => {
                            setPlanName(e.target.value);
                        }}
                        sx={{ mb: 1 }}
                    /> */}
                    <input
                        id="planNameInput"
                        className="block w-full rounded-t-lg py-2 pl-6 pr-20 text-lg ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-700"
                        placeholder="Plan name"
                        autoFocus
                        value={planName}
                        onChange={(e: { target: { value: string } }) => {
                            setPlanName(e.target.value);
                        }}
                    />
                    <button
                        className="w-full rounded-b-lg bg-blue-700 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-300"
                        disabled={planName.trim() === ''}
                        onClick={() => {
                            addPlan({ name: planName, recipes: [], shoppedItems: [], groceries: [] });
                            setIsPlanDialogOpen(false);
                        }}
                    >
                        Create Meal Plan
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
