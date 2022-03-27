import { createState, none, useState } from '@hookstate/core';
import { Uom, UomList, Ingredient, IngredientList, RecipeList, Recipe, Category, CategoryList } from 'types';

const baseUoms: UomList = ['oz', 'can', 'bag', 'lb', 'gram', 'tsp', 'ml'];
const baseIngredients: IngredientList = [
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
const baseRecipes: RecipeList = {
    '1234': {
        name: 'chicken',
        groceries: [
            {
                quantity: 1,
                uom: 'can',
                item: 'chicken',
                isAldi: true,
                id: 'fakeId1',
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
                id: 'fakeId2',
            },
            {
                quantity: 3,
                uom: 'tsp',
                item: 'cumin',
                isAldi: true,
                id: 'fakeId3',
            },
            {
                quantity: 1,
                uom: 'gram',
                item: 'black beans',
                isAldi: true,
                id: 'fakeId4',
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
                id: 'fakeId5',
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
                id: 'fakeId6',
            },
        ],
        recipeId: 'f7_-XGtxmKqgRVb2p6q4l',
    },
};

const baseCategories: CategoryList = [
    'American',
    'Asian',
    'Chinese',
    'Japanese',
    'Korean',
    'Thai',
    'Comfort Food',
    'Mexican',
    'Italian',
    'French',
    'Vegan',
    'Vegetarian',
    'Slow Cooker',
    'One Skillet',
    'Jamaican',
    'Lebanese',
    'Dessert',
    'Southern',
    'Soup',
    'Stew',
    'Southwestern',
];

const globalState = createState({
    ingredients: baseIngredients,
    recipes: baseRecipes,
    uoms: baseUoms,
    categories: baseCategories,
    selectedRecipes: {} as RecipeList,
});

export const useIngredients = () => {
    const { ingredients } = useState(globalState);

    const addIngredient = (item: Ingredient) => {
        ingredients.set((prev) => [...prev, item]);
    };

    const deleteIngredient = (item: Ingredient) => {
        ingredients.set((prev) => prev.filter((i) => i !== item));
    };

    return {
        ingredients,
        addIngredient,
        deleteIngredient,
    };
};

export const useUoms = () => {
    const { uoms } = useState(globalState);

    const addUom = (uom: Uom) => {
        uoms.set((prev) => [...prev, uom]);
    };

    const deleteUom = (item: Uom) => {
        uoms.set((prev) => prev.filter((u) => u !== item));
    };

    return {
        uoms,
        addUom,
        deleteUom,
    };
};

export const useRecipes = () => {
    const { recipes } = useState(globalState);
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

export const useCategories = () => {
    const { categories } = useState(globalState);

    const addCategory = (category: Category) => {
        categories.set((prev) => [...prev, category]);
    };

    const deleteCategory = (item: Category) => {
        categories.set((prev) => prev.filter((i) => i !== item));
    };

    return {
        categories,
        addCategory,
        deleteCategory,
    };
};
