import { noop } from 'lodash/fp';
import { createContext, Dispatch, SetStateAction, useEffect, useState, useMemo, useContext } from 'react';
import { CategoryList, IngredientList, RecipeList, UomList } from 'types';
import { useFirebase } from './hooks';
import { UserContext } from './userContext';

type RecipesContextProps = {
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
};

export const RecipesContext = createContext<RecipesContextProps>({
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
});

export type AppState = {
    ingredients: IngredientList;
    recipes: RecipeList;
    selectedRecipes: string[];
    uoms: UomList;
    categories: CategoryList;
    isRecipeDialogOpen: boolean;
};

interface RecipesContextProviderProps {
    children?: JSX.Element[] | JSX.Element;
}

export default function RecipesContextProvider({ children }: RecipesContextProviderProps) {
    const { getCollection } = useFirebase();
    const { user } = useContext(UserContext);
    const [recipes, setRecipes] = useState<RecipeList>({});
    const [ingredients, setIngredients] = useState<IngredientList>({});
    const [uoms, setUoms] = useState<UomList>({});
    const [categories, setCategories] = useState<CategoryList>({});
    const [selectedRecipes, setSelectedRecipes] = useState<string[]>([]);

    const storeMemo = useMemo(
        () => ({
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
        }),
        [
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
        ],
    );

    useEffect(() => {
        async function loadData() {
            if (!user) return;
            try {
                const [ingredientsCollection, uomsCollection, categoriesCollection, recipesCollection] =
                    await Promise.all(['ingredients', 'uoms', 'categories', 'recipes'].map(getCollection));

                setRecipes(recipesCollection);
                setIngredients(ingredientsCollection);
                setUoms(uomsCollection);
                setCategories(categoriesCollection);
                setSelectedRecipes([] as string[]);
            } catch {
                throw new Error('error loading data');
            }
        }
        void loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return <RecipesContext.Provider value={storeMemo}>{children}</RecipesContext.Provider>;
}
