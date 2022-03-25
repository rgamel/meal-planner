import { State } from '@hookstate/core';

import { useSelectedRecipes } from 'hooks/hooks';
import React from 'react';
import { Recipe } from './RecipeForm';

type RecipeListItemProps = {
    recipe: State<Recipe>;
};

function RecipeListItem({ recipe }: RecipeListItemProps) {
    const { selectedRecipes, handleSelectRecipe } = useSelectedRecipes();
    const currentlySelectedRecipes = selectedRecipes.get();
    const currentRecipe = recipe.get();

    const handleChange = () => {
        handleSelectRecipe(currentRecipe.name);
    };
    return (
        <li key={currentRecipe.name}>
            <input
                type="checkbox"
                checked={currentlySelectedRecipes.map((r: Recipe) => r.name).includes(currentRecipe.name)}
                onChange={handleChange}
            />
            {currentRecipe.name}
        </li>
    );
}

export default React.memo(RecipeListItem);
