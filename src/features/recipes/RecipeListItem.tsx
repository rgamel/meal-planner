import { useSelectedRecipes } from 'app/hooks'
import { useCallback, useMemo } from 'react'
import { Recipe } from 'types'

import { IconButton } from '../../components/Button'
import { Edit } from '../../components/icons/Edit'
import { titleCase } from '../../helpers'

type RecipeListItemProps = {
  recipe: Recipe
  editRecipe: (recipe: Recipe) => void
}

export default function RecipeListItem({ recipe, editRecipe }: RecipeListItemProps) {
  const label = titleCase(recipe.name)
  const { selectedRecipes, handleSelectRecipe } = useSelectedRecipes()
  const checked = selectedRecipes.map((sr) => sr.id).includes(recipe.id)

  function handleChange() {
    handleSelectRecipe(recipe.id)
  }

  function onClickEdit() {
    editRecipe(recipe)
  }

  return (
    <li className="flex flex-row justify-between">
      <div className="flex flex-row items-center">
        <input type="checkbox" className="mr-2" checked={checked} onChange={handleChange} />
        <div className="text-md">{label}</div>
      </div>
      <IconButton className="" onClick={onClickEdit}>
        <div className="-mb-2">
          <Edit className="stroke-gray-600" />
        </div>
      </IconButton>
    </li>
  )
}
