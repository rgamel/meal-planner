import { collection, deleteDoc, doc, DocumentData, getDocs, QuerySnapshot, setDoc } from 'firebase/firestore/lite';
// import Fraction from 'fraction.js';
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
    const { plans, setPlans } = useContext(RecipesContext);
    const { addFn, deleteFn, updateFn } = useGenericFns(plans, setPlans, 'plans');

    return {
        plans,
        addPlan: addFn,
        deletePlan: deleteFn,
        updatePlan: updateFn,
    };
};

export const useSelectedPlan = () => {
    const { selectedPlan, setSelectedPlan } = useContext(RecipesContext);

    return {
        selectedPlan,
        setSelectedPlan,
    };
};

export const useShoppedItems = () => {
    const { plans, updatePlan } = usePlans();
    const { selectedPlan } = useSelectedPlan();
    const { addRecord } = useFirebase();

    const document = selectedPlan || 'shopped';

    const shoppedItemsForCurrentPlan = plans[selectedPlan]?.shoppedItems || [];

    const handleToggleShopped = (id: string) => {
        // if (!selectedPlan || !plans[selectedPlan]) return;

        if (shoppedItemsForCurrentPlan.includes(id)) {
            const shoppedWithout = shoppedItemsForCurrentPlan.filter((item) => item !== id);
            updatePlan({ ...plans[selectedPlan], shoppedItems: shoppedWithout });
            void addRecord('shoppedItems', document, { ids: shoppedWithout });
            return;
        }
        const shoppedWith = [...shoppedItemsForCurrentPlan, id];
        updatePlan({ ...plans[selectedPlan], shoppedItems: shoppedWith });
        void addRecord('shoppedItems', document, { ids: shoppedWith });
    };

    const clearAllShopped = () => {
        updatePlan({ ...plans[selectedPlan], shoppedItems: [] });
        void addRecord('shoppedItems', document, { ids: [] });
    };

    return {
        shoppedItems: shoppedItemsForCurrentPlan || [],
        handleToggleShopped,
        clearAllShopped,
    };
};

export const useSelectedRecipes = () => {
    const { recipes } = useContext(RecipesContext);
    const { addRecord } = useFirebase();
    const { plans, updatePlan } = usePlans();
    const { selectedPlan } = useSelectedPlan();

    const document = selectedPlan || 'selected';
    const recipesForCurrentPlan = plans[selectedPlan]?.recipes || [];

    const handleSelectRecipe = (id: string) => {
        if (!recipes[id]) return;

        if (!plans[selectedPlan]) return;

        if (recipesForCurrentPlan.includes(id)) {
            const selectedWithout = recipesForCurrentPlan.filter((r) => r !== id);
            updatePlan({ ...plans[selectedPlan], recipes: selectedWithout });
            void addRecord('selectedRecipes', document, { ids: selectedWithout });
            return;
        }

        const selectedWith = [...recipesForCurrentPlan, id];
        updatePlan({ ...plans[selectedPlan], recipes: selectedWith });
        void addRecord('selectedRecipes', document, { ids: selectedWith });
    };

    const clearAllSelected = () => {
        updatePlan({ ...plans[selectedPlan], recipes: [], shoppedItems: [] });
        void addRecord('selectedRecipes', document, { ids: [] });
    };

    return {
        selectedRecipes: recipesForCurrentPlan,
        handleSelectRecipe,
        clearAllSelected,
    };
};
