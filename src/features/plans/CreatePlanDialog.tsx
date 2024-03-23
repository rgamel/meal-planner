import { Dialog } from '@mui/material';
import { usePlans } from 'app/hooks';
import { Button } from 'components/Button';
import { DialogTitle } from 'components/DialogTitle';
import { Dispatch, SetStateAction, useState } from 'react';

type CreatePlanDialogProps = {
    setIsPlanDialogOpen: Dispatch<SetStateAction<boolean>>;
};

export function CreatePlanDialog({ setIsPlanDialogOpen }: CreatePlanDialogProps) {
    const [planName, setPlanName] = useState('');
    const { addPlan } = usePlans();

    return (
        <Dialog fullWidth open onClose={() => setIsPlanDialogOpen(false)}>
            <div className="mx-6 my-4 space-y-4">
                <DialogTitle>Create Plan</DialogTitle>
                <div className="flex flex-col">
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
                    <Button
                        className="rounded-none rounded-b-lg"
                        variant="outlined"
                        disabled={planName.trim() === ''}
                        onClick={() => {
                            addPlan({ name: planName, recipes: [], shoppedItems: [], groceries: [] });
                            setIsPlanDialogOpen(false);
                        }}
                    >
                        Create Meal Plan
                    </Button>
                </div>
            </div>
        </Dialog>
    );
}
