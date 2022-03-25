import React from 'react';
import RecipeListItem from '../components/RecipeListItem';
import { useRecipes, useSelectedRecipes } from '../hooks/hooks';

function Recipes() {
    const { recipes } = useRecipes();
    const { handleSelectRecipe } = useSelectedRecipes();
    return (
        <>
            <h1>Recipes:</h1>
            <ul>
                {recipes.map((r) => (
                    <RecipeListItem name={r.name} handleSelectRecipe={handleSelectRecipe} />
                ))}
            </ul>
        </>
    );
}

export default Recipes;
