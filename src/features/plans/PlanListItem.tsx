import { titleCase } from 'helpers';
import { Link as RouterLink } from 'react-router-dom';
import { useRecipeNames } from './hooks/useRecipeNames';

interface PlanListItemProps {
    id: string;
    name: string;
}

export function PlanListItem({ id, name }: PlanListItemProps) {
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
        </div>
    );
}
