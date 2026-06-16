import { usePlans } from 'app/hooks'
import { IconButton } from 'components/Button'
import { ArrowBack } from 'components/icons/ArrowBack'
import { titleCase } from 'helpers'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { ActionButton } from './Plan'
import { PlanName } from './PlanNameProps'

export function PlanHeader(): JSX.Element {
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
