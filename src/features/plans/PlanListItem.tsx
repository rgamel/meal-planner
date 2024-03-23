import { usePlans, useRecipes } from 'app/hooks';
import { titleCase } from 'helpers';
import { Link as RouterLink } from 'react-router-dom';
import { PlanList, RecipeList } from 'types';

// TODO: Move this logic to a hook
const getRecipeNames = (plans: PlanList, id: string, recipes: RecipeList) =>
    plans[id].recipes
        ?.map(({ id }) => titleCase(recipes[id]?.name))
        .filter(Boolean)
        .join(', ') || '[no recipes found]';

export function PlanListItem({ id, name }: { id: string; name: string }) {
    const { plans } = usePlans();
    const { recipes } = useRecipes();

    return (
        <div className="flex justify-between px-6 py-4">
            <RouterLink to={`${id}`}>
                <li key={id}>
                    <div className="w-full">
                        <h3 className="text-xl font-semibold leading-6 text-gray-900">{titleCase(name)}</h3>
                        <p className="mt-1 text-sm leading-5 text-gray-500">{getRecipeNames(plans, id, recipes)}</p>
                    </div>
                </li>
            </RouterLink>
        </div>
    );
}
