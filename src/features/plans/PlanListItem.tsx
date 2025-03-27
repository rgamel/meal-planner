import { titleCase } from 'helpers';
import { Link as RouterLink } from 'react-router-dom';
import { useRecipeNames } from './hooks/useRecipeNames';

interface PlanListItemProps {
    id: string;
    name: string;
    togglePinned: (id: string) => void;
}

export function PlanListItem({ id, name, togglePinned }: PlanListItemProps) {
    const recipeNames = useRecipeNames(id);

    return (
        <div className="flex justify-between px-6 py-4">
            <RouterLink to={`${id}`}>
                <li key={id}>
                    <div className="w-full">
                        <h3 className="text-xl font-semibold leading-6 text-gray-900">{titleCase(name)}</h3>
                        <p className="mt-1 text-sm leading-5 text-gray-500">{recipeNames}</p>
                    </div>
                </li>
            </RouterLink>

            <button type="button" onClick={() => togglePinned(id)}>
                <div className="-mt-6 active:bg-gray-100">
                    <span className="material-symbols-outlined opacity-50">keep</span>
                </div>
            </button>
        </div>
    );
}
