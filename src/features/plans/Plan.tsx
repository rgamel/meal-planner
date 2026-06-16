import { usePlans } from 'app/hooks'
import { IconButton } from 'components/Button'
import { Card } from 'components/Card'
import { Edit } from 'components/icons/Edit'
import { Save } from 'components/icons/Save'
import { isEmpty } from 'lodash/fp'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Plan as IPlan } from 'types'

import { EmptyPlanMessage } from './EmptyPlanMessage'
import { PlanActions } from './PlanActions'
import { PlanHeader } from './PlanHeader'
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
        <Card>
          {(plan?.recipes || []).map((recipeWithQuantity: { id: string; quantity: string }) => (
            <PlanItem recipeWithQuantity={recipeWithQuantity} key={recipeWithQuantity.id} planId={planId} />
          ))}
        </Card>
      ) : (
        <EmptyPlanMessage />
      )}
      <PlanActions planId={planId} plan={plan} />
    </>
  )
}

export function ActionButton({
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
