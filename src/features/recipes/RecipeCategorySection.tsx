import { useCategories } from 'app/hooks'
import clsx from 'clsx'
import { Accordion } from 'components/Accordion'
import { titleCase } from 'helpers'
import { useState } from 'react'
import { Recipe } from 'types'

import RecipeListItem from './RecipeListItem'

type RecipeSectionProps = {
  recipes: Recipe[]
  categoryId: string
  editRecipe: (recipe: Recipe) => void
}
export function RecipeCategorySection({ recipes, editRecipe, categoryId }: RecipeSectionProps) {
  const { categories } = useCategories()
  const label = titleCase(categories[categoryId]?.name)
  return (
    <div className="px-6">
      <Accordion
        heading={<h2 className="flex py-4 text-xl font-semibold text-gray-900">{label}</h2>}
        content={
          <ul>
            {recipes.map((r) => (
              <RecipeListItem key={r.id} recipe={r} editRecipe={editRecipe} />
            ))}
          </ul>
        }
      />
    </div>
  )
}
