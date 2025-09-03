import { Dialog } from '@mui/material';
import { usePlans } from 'app/hooks';
import { Button } from 'components/Button';
import { DialogTitle } from 'components/DialogTitle';
import { Dispatch, SetStateAction, useState } from 'react';

type CreatePlanDialogProps = {
    setIsPlanDialogOpen(open: boolean): void
};

export function CreatePlanDialog({ setIsPlanDialogOpen }: CreatePlanDialogProps) {
    const [planName, setPlanName] = useState('');
    const { addNewPlan } = usePlans();

    function openDialog() {
        setIsPlanDialogOpen(false)
    }

    function onNameChange(e: { target: { value: string } }) {
        setPlanName(e.target.value);
    }

    function handleClick() {
        alert('a click was did')
        addNewPlan(planName);
        setIsPlanDialogOpen(false);
    }

    const canCreate = planName.trim() !== ''

    return (
        <Dialog fullWidth open onClose={openDialog}>
            <div className="mx-6 my-4 space-y-4">
                <DialogTitle>Create Plan</DialogTitle>
                <div className="flex flex-col">
                    <input
                        id="planNameInput"
                        className="block w-full rounded-t-lg py-2 pl-6 pr-20 text-lg ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-700"
                        placeholder="Plan name"
                        value={planName}
                        onChange={onNameChange}
                    />
                    <Button
                        className="rounded-none rounded-b-lg"
                        variant="outlined"
                        disabled={!canCreate}
                        onClick={handleClick}
                    >
                        Create Meal Plan
                    </Button>
                </div>
            </div>
        </Dialog>
    );
}
