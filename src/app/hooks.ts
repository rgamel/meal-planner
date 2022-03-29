import { set, unset } from 'lodash/fp';
import { nanoid } from 'nanoid';
import { Dispatch, SetStateAction, useContext } from 'react';
import { RecipesContext } from './context';

const useGenericFns = <T extends { id: string }>(
    collection: Record<string, T>,
    setCollection: Dispatch<SetStateAction<Record<string, T>>>,
) => {
    const addFn = (item: Omit<T, 'id'>) => {
        const id = nanoid();
        setCollection((prev) => ({ ...prev, ...{ [id]: { ...item, id } as T } }));
    };

    const deleteFn = (id: string) => {
        setCollection((prev) => unset(id, prev));
    };

    const updateFn = (item: T) => {
        setCollection(set(item.id, item, collection));
    };

    return {
        addFn,
        deleteFn,
        updateFn,
    };
};

export const useIngredients = () => {
    const { ingredients, setIngredients } = useContext(RecipesContext);

    const { addFn, deleteFn } = useGenericFns(ingredients, setIngredients);

    return {
        ingredients,
        addIngredient: addFn,
        deleteIngredient: deleteFn,
    };
};

export const useUoms = () => {
    const { uoms, setUoms } = useContext(RecipesContext);

    const { addFn, deleteFn } = useGenericFns(uoms, setUoms);

    return {
        uoms,
        addUom: addFn,
        deleteUom: deleteFn,
    };
};

export const useRecipes = () => {
    const { recipes, setRecipes } = useContext(RecipesContext);

    const { addFn, deleteFn, updateFn } = useGenericFns(recipes, setRecipes);

    return {
        recipes,
        addRecipe: addFn,
        deleteRecipe: deleteFn,
        updateRecipe: updateFn,
    };
};

export const useCategories = () => {
    const { categories, setCategories } = useContext(RecipesContext);
    const { addFn, deleteFn } = useGenericFns(categories, setCategories);

    return {
        categories,
        addCategory: addFn,
        deleteCategory: deleteFn,
    };
};

export const useSelectedRecipes = () => {
    const { selectedRecipes, setSelectedRecipes, recipes } = useContext(RecipesContext);

    const handleSelectRecipe = (id: string) => {
        if (!recipes[id]) return;

        if (selectedRecipes.includes(id)) {
            setSelectedRecipes((prev) => prev.filter((prevId) => prevId !== id));
            return;
        }

        setSelectedRecipes((prev) => [...prev, id]);
    };

    return {
        selectedRecipes,
        handleSelectRecipe,
    };
};
