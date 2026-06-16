import { usePlans, useSelectedRecipes } from 'app/hooks'
import { RecipesContext } from 'app/recipeContext'
import { Button } from 'components/Button'
import { Card } from 'components/Card'
import { PageTitle } from 'components/PageTitle'
import { AddFab } from 'features/groceries/AddFab'
import { EmptyPlanMessage } from 'features/plans/EmptyPlanMessage'
import groupBy from 'lodash/fp/groupBy'
import { useContext } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

import { RecipeCategorySection } from './RecipeCategorySection'

export default function Recipes() {
  const { recipes } = useContext(RecipesContext)
  const { clearAllSelected } = useSelectedRecipes()
  const { plans, selectedPlanId } = usePlans()
  const nav = useNavigate()

  const recipesMemo = Object.values(recipes)
  const recipesByCategory = groupBy('categoryId', recipesMemo)

  return (
    <>
      {selectedPlanId ? (
        <PageTitle>
          <RouterLink to={`/plans/${selectedPlanId}`}>{plans[selectedPlanId].name}</RouterLink>
        </PageTitle>
      ) : null}
      <div>
        <Card>
          {!recipesMemo.length ? (
            <EmptyPlanMessage />
          ) : (
            <ul className="font-regular divided-y">
              {Object.keys(recipesByCategory).map((categoryId) => (
                <RecipeCategorySection
                  key={categoryId}
                  recipes={recipesByCategory[categoryId]}
                  categoryId={categoryId}
                />
              ))}
            </ul>
          )}

          <AddFab onClick={() => nav('new')} />
        </Card>
        <div className="m-2 flex">
          <Button onClick={clearAllSelected}>Clear Selected</Button>
          <Button onClick={() => nav('/groceries')}>Groceries</Button>
        </div>
      </div>
    </>
  )
}
