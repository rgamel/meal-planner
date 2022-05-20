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
    listName: 'ingredients' | 'uoms' | 'recipes' | 'categories' | 'selectedRecipes',
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

export const useShoppedItems = () => {
    const { shoppedItems, setShoppedItems } = useContext(RecipesContext);
    const { addRecord } = useFirebase();

    const handleToggleShopped = (id: string) => {
        if (shoppedItems?.includes(id)) {
            const shoppedWithout = shoppedItems.filter((item) => item !== id);
            setShoppedItems(shoppedWithout);
            void addRecord('shoppedItems', 'shopped', { ids: shoppedWithout });
            return;
        }
        const shoppedWith = [...shoppedItems, id];
        setShoppedItems(shoppedWith);
        void addRecord('shoppedItems', 'shopped', { ids: shoppedWith });
    };

    const clearAllShopped = () => {
        setShoppedItems([]);
        void addRecord('shoppedItems', 'shopped', { ids: [] });
    };

    return {
        shoppedItems,
        handleToggleShopped,
        clearAllShopped,
    };
};

export const useSelectedRecipes = () => {
    const { selectedRecipes, setSelectedRecipes, recipes } = useContext(RecipesContext);
    const { addRecord } = useFirebase();
    const { clearAllShopped } = useShoppedItems();

    const handleSelectRecipe = (id: string) => {
        if (!recipes[id]) return;

        if (selectedRecipes.includes(id)) {
            const selectedWithout = selectedRecipes.filter((r) => r !== id);
            setSelectedRecipes(selectedWithout);
            void addRecord('selectedRecipes', 'selected', { ids: selectedWithout });
            return;
        }

        const selectedWith = [...selectedRecipes, id];
        setSelectedRecipes(selectedWith);
        void addRecord('selectedRecipes', 'selected', { ids: selectedWith });
    };

    const clearAllSelected = () => {
        clearAllShopped();
        setSelectedRecipes([]);
        void addRecord('selectedRecipes', 'selected', { ids: [] });
    };

    return {
        selectedRecipes,
        handleSelectRecipe,
        clearAllSelected,
    };
};
