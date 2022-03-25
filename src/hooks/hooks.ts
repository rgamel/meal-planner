import { createState, none, useState } from '@hookstate/core';
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
const baseRecipes: Record<string, Recipe> = {
    '1234': {
        name: 'chicken',
        groceries: [
            {
                quantity: 1,
                uom: 'can',
                item: 'chicken',
                isAldi: true,
            },
        ],
        recipeId: '1234',
    },
    PYOWpahEyfVLDdSUhE48F: {
        name: 'taco sauce',
        groceries: [
            {
                quantity: 1,
                uom: 'lb',
                item: 'tomatoes',
                isAldi: true,
            },
            {
                quantity: 3,
                uom: 'tsp',
                item: 'cumin',
                isAldi: true,
            },
            {
                quantity: 1,
                uom: 'gram',
                item: 'black beans',
                isAldi: true,
            },
        ],
        recipeId: 'PYOWpahEyfVLDdSUhE48F',
    },
    WmXxnjwzNaaIwgmx81nCp: {
        name: 'cat trap',
        groceries: [
            {
                quantity: 1,
                uom: 'large',
                item: 'blanket',
                isAldi: false,
            },
        ],
        recipeId: 'WmXxnjwzNaaIwgmx81nCp',
    },
    'f7_-XGtxmKqgRVb2p6q4l': {
        name: 'milk',
        groceries: [
            {
                quantity: 1,
                uom: 'gallon',
                item: 'whole milk',
                isAldi: true,
            },
        ],
        recipeId: 'f7_-XGtxmKqgRVb2p6q4l',
    },
};

const globalState = createState({
    ingredients: baseIngredients,
    recipes: baseRecipes,
    uoms: baseUoms,
    selectedRecipes: {} as Record<string, Recipe>,
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
    console.log('recipes:', recipes.get());
    const addRecipe = (recipe: Recipe) => {
        recipes.merge({ [recipe.recipeId]: recipe });
    };

    return {
        recipes,
        addRecipe,
    };
};

export const useSelectedRecipes = () => {
    const { recipes } = useState(globalState);
    const { selectedRecipes } = useState(globalState);

    const handleSelectRecipe = (recipeId: string) => {
        if (!recipes[recipeId]) return;

        if (selectedRecipes.nested(recipeId).value) {
            selectedRecipes[recipeId].set(none);
            return;
        }

        selectedRecipes.merge({ [recipeId]: recipes[recipeId].get() });
    };

    return {
        selectedRecipes,
        handleSelectRecipe,
    };
};
