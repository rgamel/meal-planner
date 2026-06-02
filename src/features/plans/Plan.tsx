import { usePlans } from 'app/hooks'
import { Button, DeleteButton, IconButton } from 'components/Button'
import { ArrowBack } from 'components/icons/ArrowBack'
import { Edit } from 'components/icons/Edit'
import { Save } from 'components/icons/Save'
import { PageTitle } from 'components/PageTitle'
import { titleCase } from 'helpers'
import { isEmpty, noop } from 'lodash/fp'
import { useConfirm } from 'material-ui-confirm'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Plan as IPlan } from 'types'

import { EmptyPlanMessage } from './EmptyPlanMessage'
import { PlanItem } from './PlanItem'

export default function Plan(): JSX.Element {
  const planId = useParams().id as string
  const { plans, setSelectedPlanId } = usePlans()

  const plan = plans[planId]
  const hasRecipes = !isEmpty(plan?.recipes ?? [])

  useEffect(() => {
    setSelectedPlanId(planId)
  }, [planId, setSelectedPlanId])

  return (
    <>
      <PlanHeader />
      {hasRecipes ? (
        <div className="m-4">
          <ul className="w-full divide-y divide-gray-200 rounded-xl border-2 border-gray-200 bg-white">
            {(plan?.recipes || []).map((recipeWithQuantity: { id: string; quantity: string }) => (
              <PlanItem recipeWithQuantity={recipeWithQuantity} key={recipeWithQuantity.id} planId={planId} />
            ))}
          </ul>
        </div>
      ) : (
        <EmptyPlanMessage />
      )}
      <PlanActions planId={planId} plan={plan} />{' '}
    </>
  )
}

function PlanHeader(): JSX.Element {
  const { plans, setSelectedPlanId } = usePlans()
  const planId = useParams().id as string
  const plan = plans[planId]
  const [editingName, setEditingName] = useState(false)
  const [planName, setPlanName] = useState(titleCase(plan?.name))
  const nav = useNavigate()

  useEffect(() => {
    setSelectedPlanId(planId)
  }, [planId, setSelectedPlanId])

  function navToPlans() {
    nav('/plans')
  }

  function onInputChange(e: { target: { value: string } }) {
    const inputValue = e.target.value ?? ''
    if (inputValue.trim() === '') {
      return
    }
    setPlanName(inputValue)
  }

  return (
    <div className="align-center flex flex-row justify-around">
      <IconButton className="m-2 p-2" onClick={navToPlans}>
        <div className="opacity-50">
          <ArrowBack />
        </div>
      </IconButton>

      <PlanName editingName={editingName} planName={planName} onInputChange={onInputChange} />
      <ActionButton editing={editingName} setEditingName={setEditingName} plan={plan} planName={planName} />
    </div>
  )
}

type PlanNameProps = {
  editingName: boolean
  planName: string
  onInputChange(e: { target: { value: string } }): void
}

function PlanName({ editingName, planName, onInputChange }: PlanNameProps) {
  if (!editingName) {
    return (
      <PageTitle>
        <span className="align-middle">{planName}</span>
      </PageTitle>
    )
  }
  return (
    <input
      className="block w-full rounded-lg py-2 pr-20 pl-6 text-lg ring-1 ring-gray-300 ring-inset focus:ring-2 focus:ring-blue-700 focus:ring-inset"
      value={planName}
      onChange={onInputChange}
    />
  )
}

function ActionButton({
  editing,
  plan,
  planName,
  setEditingName,
}: {
  plan: IPlan
  planName: string
  editing: boolean
  setEditingName(input: boolean): void
}) {
  const { updatePlan } = usePlans()

  function startEditingName() {
    setEditingName(true)
  }

  function stopEditingName() {
    updatePlan({ ...plan, name: planName })
    setEditingName(false)
  }

  const clickHandler = editing ? stopEditingName : startEditingName
  const Icon = editing ? Save : Edit

  return (
    <IconButton className="m-2 p-2" onClick={clickHandler}>
      <div className="opacity-50">
        <Icon />
      </div>
    </IconButton>
  )
}

type PlanActionsProps = {
  planId: string
  plan: IPlan
}
function PlanActions({ planId, plan }: PlanActionsProps) {
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
