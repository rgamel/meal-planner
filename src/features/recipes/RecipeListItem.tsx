import { useCategories, useSelectedRecipes } from 'app/hooks';
import { IconButton } from 'components/Button';
import { Edit } from 'components/icons/Edit';
import { useCallback, useMemo } from 'react';
import { Recipe } from 'types';
import { titleCase } from '../../helpers';

type RecipeListItemProps = {
    recipe: Recipe;
    editRecipe: (recipe: Recipe) => void;
};

export default function RecipeListItem({ recipe, editRecipe }: RecipeListItemProps) {
    const { selectedRecipes, handleSelectRecipe } = useSelectedRecipes();
    const handleChange = useCallback(() => {
        handleSelectRecipe(recipe.id);
    }, [recipe.id, handleSelectRecipe]);

    const checked = useMemo(() => selectedRecipes.map((sr) => sr.id).includes(recipe.id), [selectedRecipes, recipe]);

    const onClickEdit = useCallback(() => {
        editRecipe(recipe);
    }, [editRecipe, recipe]);

    const label = titleCase(recipe.name);

    return (
        <li className="m-6 flex flex-row justify-between">
            <div className="flex items-center">
                <input type="checkbox" className="mr-3 h-5 w-5" checked={checked} onChange={handleChange} />
                <div className="text-md">{label}</div>
            </div>
            <IconButton className="absolute right-0 pr-0" onClick={onClickEdit}>
                <div className="opacity-50">
                    <Edit />
                </div>
            </IconButton>
        </li>
    );
}
