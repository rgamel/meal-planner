import { RecipesContext } from 'app/recipeContext'
import { DialogTitle } from 'components/DialogTitle'
import { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import RecipeForm from './RecipeForm'

export function UpsertRecipe() {
  const { recipes } = useContext(RecipesContext)
  const params = useParams()
  const id = params.id ?? ''
  const recipeToEdit = recipes[id]

  const nav = useNavigate()

  function handleClose() {
    nav('/recipes')
  }

  return (
    <div className="space-y-4 p-10">
      <DialogTitle>{`${recipeToEdit ? 'Edit' : 'Create'} Recipe`}</DialogTitle>
      <RecipeForm recipeToEdit={recipeToEdit} handleClose={handleClose} />
    </div>
  )
}
