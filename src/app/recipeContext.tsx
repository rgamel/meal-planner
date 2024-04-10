import { noop } from 'lodash/fp';
import { createContext, Dispatch, SetStateAction, useEffect, useState, useMemo, useContext } from 'react';
import { PlanList, CategoryList, IngredientList, RecipeList, UomList } from 'types';
import { useFirebase } from './hooks';
import { useUserStore } from './useUserStore';

// TODO: remove selectedRecipes and shoppedItems entirely in current form, replace as properties of plans

type RecipesContextProps = {
    plans: PlanList;
    setPlans: Dispatch<SetStateAction<PlanList>>;
    selectedPlanId: string;
    setSelectedPlanId: Dispatch<SetStateAction<string>>;
    recipes: RecipeList;
    setRecipes: Dispatch<SetStateAction<RecipeList>>;
    ingredients: IngredientList;
    setIngredients: Dispatch<SetStateAction<IngredientList>>;
    uoms: UomList;
    setUoms: Dispatch<SetStateAction<UomList>>;
    categories: CategoryList;
    setCategories: Dispatch<SetStateAction<CategoryList>>;
    selectedRecipes: string[];
    setSelectedRecipes: Dispatch<SetStateAction<string[]>>;
    shoppedItems: string[];
    setShoppedItems: Dispatch<SetStateAction<string[]>>;
};

export const RecipesContext = createContext<RecipesContextProps>({
    plans: {} as PlanList,
    setPlans: noop,
    selectedPlanId: '',
    setSelectedPlanId: noop,
    recipes: {} as RecipeList,
    setRecipes: noop,
    ingredients: {} as IngredientList,
    setIngredients: noop,
    uoms: {} as UomList,
    setUoms: noop,
    categories: {} as CategoryList,
    setCategories: noop,
    selectedRecipes: [] as string[],
    setSelectedRecipes: noop,
    shoppedItems: [] as string[],
    setShoppedItems: noop,
});

export type AppState = {
    plans: PlanList;
    selectedPlanId: string;
    ingredients: IngredientList;
    recipes: RecipeList;
    selectedRecipes: string[];
    uoms: UomList;
    categories: CategoryList;
    isRecipeDialogOpen: boolean;
    shoppedItems: string[];
};

interface RecipesContextProviderProps {
    children?: JSX.Element[] | JSX.Element;
}

export default function RecipesContextProvider({ children }: RecipesContextProviderProps) {
    const { getCollection } = useFirebase();
    const user = useUserStore((state) => state.user);
    const [plans, setPlans] = useState<PlanList>({});
    const [selectedPlanId, setSelectedPlanId] = useState<string>('');
    const [recipes, setRecipes] = useState<RecipeList>({});
    const [ingredients, setIngredients] = useState<IngredientList>({});
    const [uoms, setUoms] = useState<UomList>({});
    const [categories, setCategories] = useState<CategoryList>({});
    const [selectedRecipes, setSelectedRecipes] = useState<string[]>([]);
    const [shoppedItems, setShoppedItems] = useState<string[]>([]);

    const storeMemo = useMemo(
        () => ({
            plans,
            setPlans,
            selectedPlanId,
            setSelectedPlanId,
            recipes,
            setRecipes,
            ingredients,
            setIngredients,
            uoms,
            setUoms,
            categories,
            setCategories,
            selectedRecipes,
            setSelectedRecipes,
            shoppedItems,
            setShoppedItems,
        }),
        [
            plans,
            setPlans,
            selectedPlanId,
            setSelectedPlanId,
            recipes,
            setRecipes,
            ingredients,
            setIngredients,
            uoms,
            setUoms,
            categories,
            setCategories,
            selectedRecipes,
            setSelectedRecipes,
            shoppedItems,
            setShoppedItems,
        ],
    );

    useEffect(() => {
        async function loadData() {
            if (!user) return;
            try {
                const [
                    plansCollection,
                    ingredientsCollection,
                    uomsCollection,
                    categoriesCollection,
                    recipesCollection,
                    selectedRecipesCollection,
                    shoppedItemsCollection,
                ] = await Promise.all(
                    ['plans', 'ingredients', 'uoms', 'categories', 'recipes', 'selectedRecipes', 'shoppedItems'].map(
                        getCollection,
                    ),
                );
                setPlans(plansCollection);
                setRecipes(recipesCollection);
                setIngredients(ingredientsCollection);
                setUoms(uomsCollection);
                setCategories(categoriesCollection);
                setSelectedRecipes(selectedRecipesCollection.selected.ids);
                setShoppedItems(shoppedItemsCollection.shopped.ids);
            } catch {
                throw new Error('error loading data');
            }
        }
        void loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return <RecipesContext.Provider value={storeMemo}>{children}</RecipesContext.Provider>;
}
