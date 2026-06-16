import { usePlans } from 'app/hooks'
import { Button, DeleteButton } from 'components/Button'
import { isEmpty, noop } from 'lodash/fp'
import { useConfirm } from 'material-ui-confirm'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plan as IPlan } from 'types'

type PlanActionsProps = {
  planId: string
  plan: IPlan
}

export function PlanActions({ planId, plan }: PlanActionsProps) {
  const { setSelectedPlanId, deletePlan } = usePlans()
  const nav = useNavigate()
  const confirm = useConfirm()

  const navToRecipes = useCallback(() => {
    setSelectedPlanId(planId)
    nav('/recipes')
  }, [planId, setSelectedPlanId, nav])

  const navToGroceries = useCallback(() => {
    setSelectedPlanId(planId)
    nav('/groceries')
  }, [planId, setSelectedPlanId, nav])

  const hasRecipes = !isEmpty(plan?.recipes ?? [])

  const handleDelete = () => {
    confirm({
      title: `Delete ${plan.name}?`,
      description: 'This cannot be undone',
      confirmationButtonProps: { color: 'error', variant: 'contained' },
    })
      .then(() => {
        deletePlan(planId)
        nav('/plans')
      })
      .catch(noop)
  }

  return (
    <div className="flex flex-col">
      <div className="m-4 inline-flex">
        <Button
          type="button"
          variant={!hasRecipes ? 'contained' : 'outlined'}
          className="w-full rounded-none rounded-l-md"
          onClick={navToRecipes}
        >
          Recipes
        </Button>
        <Button
          type="button"
          variant={hasRecipes ? 'contained' : 'outlined'}
          className="w-full rounded-none rounded-r-md"
          onClick={navToGroceries}
        >
          Groceries
        </Button>
      </div>
      <div className="flex justify-center">
        <DeleteButton type="button" onClick={handleDelete}>
          Delete Plan
        </DeleteButton>
      </div>
    </div>
  )
}
