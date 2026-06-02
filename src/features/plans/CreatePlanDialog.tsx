import { Dialog } from '@mui/material'
import { usePlans } from 'app/hooks'
import { Button } from 'components/Button'
import { DialogTitle } from 'components/DialogTitle'
import { useState } from 'react'

type CreatePlanDialogProps = {
  setIsPlanDialogOpen(open: boolean): void
}

export function CreatePlanDialog({ setIsPlanDialogOpen }: CreatePlanDialogProps) {
  const [planName, setPlanName] = useState('')
  const { addNewPlan } = usePlans()

  function openDialog() {
    setIsPlanDialogOpen(false)
  }

  function onNameChange(e: { target: { value: string } }) {
    setPlanName(e.target.value)
  }

  function handleClick() {
    addNewPlan(planName)
    setIsPlanDialogOpen(false)
  }

  const canCreate = planName.trim() !== ''

  return (
    <Dialog fullWidth open onClose={openDialog}>
      <div className="mx-6 my-4 space-y-4">
        <DialogTitle>Create Plan</DialogTitle>
        <div className="flex flex-col">
          <input
            id="planNameInput"
            className="block w-full rounded-t-lg py-2 pr-20 pl-6 text-lg ring-1 ring-gray-300 ring-inset focus:ring-2 focus:ring-blue-700 focus:ring-inset"
            placeholder="Plan name"
            value={planName}
            onChange={onNameChange}
          />
          <Button className="rounded-none rounded-b-lg" variant="outlined" disabled={!canCreate} onClick={handleClick}>
            Create Meal Plan
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
