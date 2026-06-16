import { Fieldset } from '@headlessui/react'
import { TextField } from '@mui/material'
import { Button, DeleteButton } from 'components/Button'
import { Input } from 'components/Input'
import { GroceryItems } from 'features/groceries/GroceryItems'
import Fraction from 'fraction.js'
import { isNil, noop } from 'lodash'
import { useConfirm } from 'material-ui-confirm'
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EntityOptionType, GroceryItem, Recipe } from 'types'

import { useRecipes, useCategories } from '../../app/hooks'
import Autocomplete from '../../components/Autocomplete'
import IngredientInput from './IngredientInput'

type RecipeFormProps = {
  recipeToEdit: Recipe | null
  handleClose(): void
}

// TODO: use React-Final-Form for form management and validation plz k thnkx
export default function RecipeForm({ recipeToEdit, handleClose }: RecipeFormProps) {
  const { addRecipe, updateRecipe, deleteRecipe } = useRecipes()
  const { categories, addCategory, deleteCategory } = useCategories()
  const [groceries, setGroceries] = useState<GroceryItem[]>([])
  const [category, setCategory] = useState<EntityOptionType | null>(null)
  const [recipeName, setRecipeName] = useState('')
  const confirm = useConfirm()
  const nav = useNavigate()

  useEffect(() => {
    // TODO: get rid of this useEffect, use the props as default values for state instead
    if (!recipeToEdit) return
    setRecipeName(recipeToEdit.name)
    setCategory(categories[recipeToEdit.categoryId || ''])
    setGroceries(recipeToEdit.groceries)
  }, [recipeToEdit, categories])

  function commitGroceryItem(quantity: Fraction, uomId: string, itemId: string, isAldi: boolean) {
    const match = groceries.find((g) => g.itemId === itemId)
    if (match?.uomId === uomId && match.isAldi === isAldi) {
      groceries.splice(groceries.indexOf(match), 1)
      setGroceries([...groceries, { ...match, quantity: quantity.add(match.quantity).toFraction(true) }])
      return
    }
    setGroceries([...groceries, { quantity: quantity.toFraction(true), uomId, itemId, isAldi }])
  }

  function deleteGroceryItem(item: GroceryItem) {
    setGroceries((prev) => prev.filter((g: GroceryItem) => g !== item))
  }

  function handleSetRecipeName(e: ChangeEvent<HTMLInputElement>) {
    const input = e.target.value
    setRecipeName(input)
  }

  const enableSave = useMemo(
    () => Boolean(recipeName.trim().length && groceries.length),
    [recipeName, groceries.length],
  )

  function handleSave() {
    const recipe = {
      name: recipeName.trim().toLowerCase(),
      groceries,
      categoryId: category?.id || '',
    }
    if (!isNil(recipeToEdit)) {
      updateRecipe({ id: recipeToEdit.id, ...recipe })
    } else {
      addRecipe(recipe)
    }
    handleClose()
  }

  function handleDelete(id: string) {
    confirm({
      title: `Delete ${recipeName}?`,
      description: 'This cannot be undone',
      confirmationButtonProps: { color: 'error', variant: 'contained' },
    })
      .then(() => {
        deleteRecipe(id)
        handleClose()
      })
      .catch(noop)
  }

  return (
    <Fieldset className="">
      <div className="">
        <Input
          label="Recipe name"
          name="recipeName"
          fullwidth
          onChange={handleSetRecipeName}
          value={recipeName}
          required
        />

        {/* <TextField */}
        {/*   label="Recipe name" */}
        {/*   variant="outlined" */}
        {/*   fullWidth */}
        {/*   value={recipeName} */}
        {/*   onChange={handleSetRecipeName} */}
        {/*   required */}
        {/*   sx={{ mb: 1 }} */}
        {/* /> */}

        <Autocomplete
          suggestions={Object.values(categories)}
          label="Category"
          selected={category}
          setSelected={setCategory}
          addItem={addCategory}
          //  deleteItem={deleteCategory}
        />
      </div>

      <div className="bg-teal-400 pt-2">
        <p className="mb-2 text-gray-600">Please add ingredients for your recipe below:</p>
        <IngredientInput commitGroceryItem={commitGroceryItem} />
      </div>

      <div className="pt-2">
        <p className="m-0 text-gray-600">Ingredients:</p>
        <GroceryItems items={groceries} deleteGroceryItem={deleteGroceryItem} setItems={setGroceries} />

        <div id="dialog-actions">
          <div className="flex flex-row justify-around">
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave} variant="outlined" disabled={!enableSave}>
              Save
            </Button>
          </div>

          {recipeToEdit && (
            <div className="flex justify-center">
              <DeleteButton type="button" onClick={() => handleDelete(recipeToEdit.id)}>
                Delete Recipe
              </DeleteButton>
            </div>
          )}
        </div>
      </div>
    </Fieldset>
  )
}
