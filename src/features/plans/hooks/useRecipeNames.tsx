import { usePlans, useRecipes } from 'app/hooks';
import { titleCase } from 'helpers';

export const useRecipeNames = (planId: string) => {
    const { plans } = usePlans();
    const { recipes } = useRecipes();
    const recipeNames =
        plans[planId].recipes
            ?.map(({ id }) => titleCase(recipes[id]?.name))
            .filter(Boolean)
            .join(', ') || '[no recipes found]';

    return recipeNames;
};
