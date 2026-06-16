import { useCategories } from 'app/hooks'
import { Accordion } from 'components/Accordion'
import { titleCase } from 'helpers'
import { useNavigate } from 'react-router-dom'
import { Recipe } from 'types'

import RecipeListItem from './RecipeListItem'

type RecipeSectionProps = {
  recipes: Recipe[]
  categoryId: string
}

export function RecipeCategorySection({ recipes, categoryId }: RecipeSectionProps) {
  const { categories } = useCategories()
  const label = titleCase(categories[categoryId]?.name)
  const nav = useNavigate()

  return (
    <div className="">
      <Accordion
        heading={<h2 className="">{label}</h2>}
        content={
          <ul>
            {recipes.map((r) => (
              <RecipeListItem key={r.id} recipe={r} editRecipe={() => nav(`${r.id}`)} />
            ))}
          </ul>
        }
      />
    </div>
  )
}
