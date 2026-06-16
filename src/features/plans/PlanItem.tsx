import { useIngredients, usePlans, useRecipes } from 'app/hooks'
import { getAllGroceries } from 'features/groceries/utils/getAllGroceries'
import { titleCase } from 'helpers'

import { QuantitySelect } from './QuantitySelect'

type PlanItemProps = {
  recipeWithQuantity: { id: string; quantity: string }
  planId: string
}

export function PlanItem({ recipeWithQuantity, planId }: PlanItemProps): JSX.Element {
  const { plans } = usePlans()
  const { recipes } = useRecipes()
  const { ingredients } = useIngredients()

  const readablePlanIngredients = getAllGroceries([recipeWithQuantity], recipes, plans, planId).map(
    (item) => ingredients[item.itemId].name,
  )

  return (
    <div className="">
      <div className="flex flex-row justify-between">
        <span>{titleCase(recipes[recipeWithQuantity.id]?.name) || recipeWithQuantity.id}</span>
        <span className="flex items-baseline justify-end bg-red-300">
          {'x'}
          <QuantitySelect recipeWithQuantity={recipeWithQuantity} />
        </span>
      </div>

      <p className="ml-3 pb-4 text-sm text-gray-400">{readablePlanIngredients.map((i) => i).join(', ')}</p>
    </div>
  )
}
