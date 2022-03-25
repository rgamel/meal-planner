import { useSelectedRecipes } from 'hooks/hooks';
import React from 'react';
import { Recipe } from './RecipeForm';

type RecipeListItemProps = {
    recipe: Recipe;
    editRecipe: (recipe: Recipe) => void;
};

function RecipeListItem({ recipe, editRecipe }: RecipeListItemProps) {
    const { selectedRecipes, handleSelectRecipe } = useSelectedRecipes();

    const handleChange = () => {
        console.log(recipe.recipeId);
        handleSelectRecipe(recipe.recipeId);
    };
    return (
        <li key={recipe.name}>
            <input
                type="checkbox"
                checked={Object.values(selectedRecipes.get())
                    .map((r: Recipe) => r.name)
                    .includes(recipe.name)}
                onChange={handleChange}
            />
            {recipe.name}
            <button type="button" onClick={() => editRecipe(recipe)}>
                edit
            </button>
        </li>
    );
}

export default React.memo(RecipeListItem);
