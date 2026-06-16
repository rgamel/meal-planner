import { titleCase } from 'helpers'
import { Link as RouterLink } from 'react-router-dom'

import { useRecipeNames } from './hooks/useRecipeNames'

interface PlanListItemProps {
  id: string
  name: string
  togglePinned: (id: string) => void
  isPinned?: boolean
}

export function PlanListItem({ id, name, togglePinned, isPinned }: PlanListItemProps) {
  const recipeNames = useRecipeNames(id)

  function handleTogglePinned() {
    togglePinned(id)
  }

  const label = titleCase(name)
  const icon = isPinned ? 'keep_off' : 'keep'

  return (
    <ul className="flex justify-between px-6 py-4">
      <RouterLink to={`${id}`}>
        <li key={id}>
          <div className="w-full">
            <h3 className="text-lg font-semibold">{label}</h3>
            <p className="mt-1 text-sm leading-5 text-gray-500">{recipeNames}</p>
          </div>
        </li>
      </RouterLink>

      <button type="button" onClick={handleTogglePinned}>
        <div className="-mt-6 active:bg-gray-100">
          <span className="material-symbols-outlined opacity-50">{icon}</span>
        </div>
      </button>
    </ul>
  )
}
