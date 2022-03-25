import { createState, useState } from '@hookstate/core';
import { Recipe } from '../components/RecipeForm';

const baseUoms: string[] = ['oz', 'can', 'bag', 'lb', 'gram', 'tsp', 'ml'];
const baseIngredients: string[] = [
    'apples',
    'tomatoes',
    'salt',
    'pepper',
    'cumin',
    'tarragon',
    'chicken',
    'corn',
    'black beans',
    'tortillas',
    'beef',
];

const baseRecipes: Recipe[] = [
    {
        name: 'chicken',
        groceries: [
            {
                quantity: 1,
                uom: 'can',
                item: 'chicken',
                isAldi: true,
            },
        ],
    },
];

const globalState = createState({
    ingredients: baseIngredients,
    recipes: baseRecipes,
    uoms: baseUoms,
    selectedRecipes: [] as Recipe[],
});

export const useIngredients = () => {
    const { ingredients } = useState(globalState);

    const addIngredient = (item: string) => {
        ingredients.set((prev) => [...prev, item]);
    };

    return {
        ingredients,
        addIngredient,
    };
};

export const useUoms = () => {
    const { uoms } = useState(globalState);

    const addUom = (uom: string) => {
        uoms.set((prev) => [...prev, uom]);
    };

    return {
        uoms,
        addUom,
    };
};

export const useRecipes = () => {
    const { recipes } = useState(globalState);

    const addRecipe = (recipe: Recipe) => {
        recipes.set((prev) => [...prev, recipe]);
    };

    return {
        recipes,
        addRecipe,
    };
};

export const useSelectedRecipes = () => {
    const { recipes } = useState(globalState);
    const { selectedRecipes } = useState(globalState);

    const handleSelectRecipe = (name: string) => {
        if (selectedRecipes.find((sr) => sr.get().name === name)) {
            selectedRecipes.set((prev) => [...prev.filter((sr) => sr.name !== name)]);
            return;
        }
        const recipeToSelect = recipes.find((r) => r.get().name === name)?.get();
        if (!recipeToSelect) return;

        selectedRecipes.set((prev) => [...prev, recipeToSelect]);
    };

    return {
        selectedRecipes,
        handleSelectRecipe,
    };
};
