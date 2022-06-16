import { collection, deleteDoc, doc, DocumentData, getDocs, QuerySnapshot, setDoc } from 'firebase/firestore/lite';
import { omit, set, unset } from 'lodash/fp';
import { nanoid } from 'nanoid';
import { Dispatch, SetStateAction, useContext } from 'react';
import { db } from './firebase';
import { RecipesContext } from './recipeContext';

export const useFirebase = () => {
    const formatCollectionAsList = (snapshot: QuerySnapshot<DocumentData>) => {
        const result = {} as any; // TODO: figure out this type
        snapshot.forEach((document) => {
            result[document.id] = { ...document.data(), id: document.id };
        });
        return result;
    };

    const getCollection = async (collectionName: string) => {
        const c = await getDocs(collection(db, collectionName));
        return formatCollectionAsList(c);
    };

    const addRecord = async <T>(listName: string, id: string, item: Record<string, T>) => {
        await setDoc(doc(db, listName, id), item);
    };

    const deleteRecord = async (listName: string, id: string) => {
        await deleteDoc(doc(db, listName, id));
    };

    return { getCollection, addRecord, deleteRecord };
};

const useGenericFns = <T extends { id: string }>(
    list: Record<string, T>,
    setList: Dispatch<SetStateAction<Record<string, T>>>,
    listName: 'plans' | 'ingredients' | 'uoms' | 'recipes' | 'categories' | 'selectedRecipes',
) => {
    const { addRecord: upsertRecord, deleteRecord } = useFirebase();
    const addFn = (item: Omit<T, 'id'>) => {
        const id = nanoid();
        const itemWithId = { ...item, id } as T;
        setList((prev) => ({ ...prev, ...{ [id]: itemWithId } }));
        void upsertRecord(listName, id, item);
        return itemWithId;
    };

    const deleteFn = (id: string) => {
        setList((prev) => unset(id, prev));
        void deleteRecord(listName, id);
    };

    const updateFn = (item: T) => {
        setList(set(item.id, item, list));
        void upsertRecord(listName, item.id, omit('id', item));
    };

    return {
        addFn,
        deleteFn,
        updateFn,
    };
};

export const useIngredients = () => {
    const { ingredients, setIngredients } = useContext(RecipesContext);

    const { addFn, deleteFn } = useGenericFns(ingredients, setIngredients, 'ingredients');

    return {
        ingredients,
        addIngredient: addFn,
        deleteIngredient: deleteFn,
    };
};

export const useUoms = () => {
    const { uoms, setUoms } = useContext(RecipesContext);

    const { addFn, deleteFn } = useGenericFns(uoms, setUoms, 'uoms');

    return {
        uoms,
        addUom: addFn,
        deleteUom: deleteFn,
    };
};

export const useRecipes = () => {
    const { recipes, setRecipes } = useContext(RecipesContext);

    const { addFn, deleteFn, updateFn } = useGenericFns(recipes, setRecipes, 'recipes');

    return {
        recipes,
        addRecipe: addFn,
        deleteRecipe: deleteFn,
        updateRecipe: updateFn,
    };
};

export const useCategories = () => {
    const { categories, setCategories } = useContext(RecipesContext);
    const { addFn, deleteFn } = useGenericFns(categories, setCategories, 'categories');

    return {
        categories,
        addCategory: addFn,
        deleteCategory: deleteFn,
    };
};

export const usePlans = () => {
    const { plans, setPlans, selectedPlan, setSelectedPlan } = useContext(RecipesContext);
    const { addFn, deleteFn, updateFn } = useGenericFns(plans, setPlans, 'plans');

    return {
        plans,
        selectedPlan,
        setSelectedPlan,
        addPlan: addFn,
        deletePlan: deleteFn,
        updatePlan: updateFn,
    };
};

export const usePlannedQuantity = () => {
    const { plans, updatePlan, selectedPlan } = usePlans();

    const currentPlan = plans[selectedPlan];

    const updatePlannedQuantity = (id: string, quantity: string) => {
        const _recipes = currentPlan?.recipes || [];

        const indexToUpdate = _recipes?.findIndex((r) => r.id === id);

        if (indexToUpdate === -1) return;

        const updatedRecipes = [..._recipes];
        updatedRecipes.splice(indexToUpdate, 1, { id, quantity });

        updatePlan({ ...currentPlan, recipes: updatedRecipes });
    };

    return updatePlannedQuantity;
};

export const useShoppedItems = () => {
    const { plans, updatePlan, selectedPlan } = usePlans();

    const currentPlan = plans[selectedPlan];
    const shoppedItems = currentPlan?.shoppedItems || [];

    const removeShopped = (id: string) => {
        const shoppedWithout = shoppedItems.filter((item) => item !== id);
        updatePlan({ ...currentPlan, shoppedItems: shoppedWithout });
    };

    const addShopped = (id: string) => {
        const shoppedWith = [...shoppedItems, id];
        updatePlan({ ...currentPlan, shoppedItems: shoppedWith });
    };

    const handleToggleShopped = (id: string) => {
        if (shoppedItems.includes(id)) {
            removeShopped(id);
            return;
        }

        addShopped(id);
    };

    const clearAllShopped = () => {
        updatePlan({ ...currentPlan, shoppedItems: [] });
    };

    return {
        shoppedItems: shoppedItems || [],
        handleToggleShopped,
        clearAllShopped,
    };
};

export const useSelectedRecipes = () => {
    const { recipes } = useContext(RecipesContext);
    const { plans, updatePlan, selectedPlan } = usePlans();

    const recipesForCurrentPlan = plans[selectedPlan]?.recipes || [];

    const removeRecipe = (id: string) => {
        const selectedWithout = recipesForCurrentPlan.filter((r) => r.id !== id);
        updatePlan({ ...plans[selectedPlan], recipes: selectedWithout });
    };

    const addRecipe = (id: string) => {
        const selectedWith = [...recipesForCurrentPlan, { id, quantity: '1' }];
        updatePlan({ ...plans[selectedPlan], recipes: selectedWith });
    };

    const handleSelectRecipe = (id: string) => {
        if (!recipes[id]) return;

        if (!plans[selectedPlan]) return;

        if (recipesForCurrentPlan.map((r) => r.id).includes(id)) {
            removeRecipe(id);
            return;
        }

        addRecipe(id);
    };

    const clearAllSelected = () => {
        updatePlan({ ...plans[selectedPlan], recipes: [], shoppedItems: [] });
    };

    return {
        selectedRecipes: recipesForCurrentPlan,
        handleSelectRecipe,
        clearAllSelected,
    };
};
