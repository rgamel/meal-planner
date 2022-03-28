import { createState, none, State, useState } from '@hookstate/core';
import { nanoid } from 'nanoid';
import { Uom, UomList, Ingredient, IngredientList, RecipeList, Recipe, Category, CategoryList } from 'types';

const baseUoms: UomList = {
    '0': { id: '0', name: 'ml' },
    '1': { id: '1', name: 'oz' },
    '2': { id: '2', name: 'can' },
    '3': { id: '3', name: 'bag' },
    '4': { id: '4', name: 'lb' },
    '5': { id: '5', name: 'gram' },
    '6': { id: '6', name: 'tsp' },
    '7': { id: '7', name: 'large' },
    '8': { id: '8', name: 'gallon' },
};
const baseIngredients: IngredientList = {
    '0': { id: '0', name: 'beef' },
    '1': { id: '1', name: 'apples' },
    '2': { id: '2', name: 'tomatoes' },
    '3': { id: '3', name: 'salt' },
    '4': { id: '4', name: 'pepper' },
    '5': { id: '5', name: 'cumin' },
    '6': { id: '6', name: 'tarragon' },
    '7': { id: '7', name: 'chicken' },
    '8': { id: '8', name: 'corn' },
    '9': { id: '9', name: 'beans' },
    '10': { id: '10', name: 'tortillas' },
    '11': { id: '11', name: 'blanket' },
    '12': { id: '12', name: 'whole milk' },
};
const baseRecipes: RecipeList = {
    '1234': {
        name: 'chicken',
        groceries: [
            {
                quantity: 1,
                uom: { name: 'can', id: '2' },
                item: { name: 'chicken', id: '7' },
                isAldi: true,
            },
        ],
        category: { id: '1', name: 'American' },
        id: '1234',
    },
    PYOWpahEyfVLDdSUhE48F: {
        name: 'taco sauce',
        groceries: [
            {
                quantity: 1,
                uom: { name: 'lb', id: '4' },
                item: { name: 'tomatoes', id: '2' },
                isAldi: true,
            },
            {
                quantity: 3,
                uom: { name: 'tsp', id: '6' },
                item: { name: 'cumin', id: '5' },
                isAldi: true,
            },
            {
                quantity: 1,
                uom: { name: 'gram', id: '5' },
                item: { name: 'beans', id: '9' },
                isAldi: true,
            },
        ],
        category: { id: '1', name: 'American' },
        id: 'PYOWpahEyfVLDdSUhE48F',
    },
    WmXxnjwzNaaIwgmx81nCp: {
        name: 'cat trap',
        groceries: [
            {
                quantity: 1,
                uom: { name: 'large', id: '7' },
                item: { name: 'blanket', id: '11' },
                isAldi: false,
            },
        ],
        category: { id: '1', name: 'American' },
        id: 'WmXxnjwzNaaIwgmx81nCp',
    },
    'f7_-XGtxmKqgRVb2p6q4l': {
        name: 'milk',
        groceries: [
            {
                quantity: 1,
                uom: { name: 'gallon', id: '8' },
                item: { name: 'whole milk', id: '12' },
                isAldi: true,
            },
        ],
        category: { id: '1', name: 'American' },
        id: 'f7_-XGtxmKqgRVb2p6q4l',
    },
};

const baseCategories: CategoryList = {
    '0': { id: '0', name: 'Southwestern' },
    '1': { id: '1', name: 'American' },
    '2': { id: '2', name: 'Asian' },
    '3': { id: '3', name: 'Chinese' },
    '4': { id: '4', name: 'Japanese' },
    '5': { id: '5', name: 'Korean' },
    '6': { id: '6', name: 'Thai' },
    '7': { id: '7', name: 'Comfort Food' },
    '8': { id: '8', name: 'Mexican' },
    '9': { id: '9', name: 'Italian' },
    '10': { id: '10', name: 'French' },
    '11': { id: '11', name: 'Vegan' },
    '12': { id: '12', name: 'Vegetarian' },
    '13': { id: '13', name: 'Slow Cooker' },
    '14': { id: '14', name: 'One Skillet' },
    '15': { id: '15', name: 'Jamaican' },
    '16': { id: '16', name: 'Lebanese' },
    '17': { id: '17', name: 'Dessert' },
    '18': { id: '18', name: 'Southern' },
    '19': { id: '19', name: 'Soup' },
    '20': { id: '20', name: 'Stew' },
};

const globalState = createState({
    ingredients: baseIngredients,
    recipes: baseRecipes,
    selectedRecipes: [] as string[],
    uoms: baseUoms,
    categories: baseCategories,
    isRecipeDialogOpen: false,
});

const useGenericFns = <T extends { id: string }>(collection: State<Record<string, T>>) => {
    const addFn = (item: Omit<T, 'id'>) => {
        const id = nanoid();
        collection.merge({ [id]: { ...item, id } as T });
    };

    const deleteFn = (id: string) => {
        collection[id].set(none);
    };

    const updateFn = (item: T) => {
        collection[item.id].set(item);
    };

    return {
        addFn,
        deleteFn,
        updateFn,
    };
};

// // TODO
// const hooksTuples = Object.keys(pick(['isRecipeDialogOpen', 'seletedRecipes'], globalState)).map(
//     (key: 'ingredients' | 'recipes' | 'uoms' | 'categories') => {
//         const collection = useState(globalState)[key];
//         const { addFn, deleteFn, updateFn } = useGenericFns(collection);
//         const startCased = startCase(key);
//         return [
//             `use${startCased}`,
//             {
//                 [`add${startCased}`]: addFn,
//                 [`delete${startCased}`]: deleteFn,
//                 [`update${startCased}`]: updateFn,
//             },
//         ];
//     },
// );

export const useIngredients = () => {
    const { ingredients } = useState(globalState);
    const { addFn, deleteFn } = useGenericFns(ingredients);

    return {
        ingredients,
        addIngredient: addFn,
        deleteIngredient: deleteFn,
    };
};

export const useUoms = () => {
    const { uoms } = useState(globalState);
    const { addFn, deleteFn } = useGenericFns(uoms);

    return {
        uoms,
        addUom: addFn,
        deleteUom: deleteFn,
    };
};

export const useRecipes = () => {
    const { recipes } = useState(globalState);
    const { addFn, deleteFn, updateFn } = useGenericFns(recipes);

    return {
        recipes,
        addRecipe: addFn,
        deleteRecipe: deleteFn,
        updateRecipe: updateFn,
    };
};

export const useCategories = () => {
    const { categories } = useState(globalState);
    const { addFn, deleteFn } = useGenericFns(categories);

    return {
        categories,
        addCategory: addFn,
        deleteCategory: deleteFn,
    };
};

export const useSelectedRecipes = () => {
    const { recipes, selectedRecipes } = useState(globalState);

    const handleSelectRecipe = (id: string) => {
        if (!recipes.nested(id).value) return;

        const match = selectedRecipes.find((sr) => sr.get() === id);
        if (match) {
            const i = selectedRecipes.indexOf(match);
            selectedRecipes[i].set(none);
            return;
        }

        selectedRecipes.merge([id]);
    };

    return {
        selectedRecipes,
        handleSelectRecipe,
    };
};

export const useIsRecipeDialogOpen = () => {
    const { isRecipeDialogOpen } = useState(globalState);

    const setRecipeDialogOpen = (value: boolean) => isRecipeDialogOpen.set(value);

    return { isRecipeDialogOpen, setRecipeDialogOpen };
};
