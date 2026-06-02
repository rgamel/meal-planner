import { useCategories } from 'app/hooks'
import clsx from 'clsx'
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

type AccordionProps = {
  heading: React.ReactNode
  content: React.ReactNode
}
function Accordion({ heading, content }: AccordionProps) {
  const [open, setOpen] = useState(true)
  function toggleOpen() {
    setOpen((prev) => !prev)
  }
  const icon = open ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
  return (
    <div>
      <button className="flew-row flex w-full items-center justify-between active:bg-slate-200" onClick={toggleOpen}>
        {heading}
        <span className="material-symbols-outlined">{icon}</span>
      </button>
      <div className={clsx('overflow-hidden', open ? 'max-h-none' : 'max-h-0 ')}>{content}</div>
    </div>
  )
}
