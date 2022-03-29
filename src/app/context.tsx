import { noop } from 'lodash/fp';
import { createContext, Dispatch, SetStateAction, useEffect, useState, useMemo } from 'react';
import { baseCategories, baseIngredients, baseRecipes, baseUoms } from 'testData/testData';
import { CategoryList, IngredientList, RecipeList, UomList } from 'types';

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

const initialState: AppState = {
    ingredients: baseIngredients,
    recipes: baseRecipes,
    selectedRecipes: [] as string[],
    uoms: baseUoms,
    categories: baseCategories,
    isRecipeDialogOpen: false,
};

interface RecipesContextProviderProps {
    children?: JSX.Element[] | JSX.Element;
}

export default function RecipesContextProvider({ children }: RecipesContextProviderProps) {
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
            const data = await Promise.resolve(initialState);

            setRecipes(data.recipes);
            setIngredients(data.ingredients);
            setUoms(data.uoms);
            setCategories(data.categories);
            setSelectedRecipes(data.selectedRecipes);
        }
        void loadData();
    }, []);

    return <RecipesContext.Provider value={storeMemo}>{children}</RecipesContext.Provider>;
}
