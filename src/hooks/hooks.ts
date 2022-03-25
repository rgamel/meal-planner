import { useState } from 'react';
import { Recipe } from '../components/RecipeForm';

const baseIngredients = ['apples', 'tomatoes', 'salt', 'pepper', 'cumin', 'tarragon', 'chicken', 'corn', 'black beans', 'tortillas', 'beef'];
const baseUoms = ['oz', 'can', 'bag', 'lb', 'gram', 'tsp', 'ml'];


const baseRecipes = [{
    "name": "chicken",
    "groceries": [
        {
            "quantity": 1,
            "uom": "can",
            "item": "chicken",
            "isAldi": true
        }
    ]
}]

export const useIngredients = () => {
    const [ingredients, setIngredients] = useState(baseIngredients);

    const addIngredient = (item: string) => {
        setIngredients([...ingredients, item]);
    };

    return { ingredients, setIngredients, addIngredient };
};

export const useUoms = () => {
    const [uoms, setUoms] = useState(baseUoms);

    const addUom = (uom: string) => {
        setUoms([...uoms, uom]);
    };

    return { uoms, setUoms, addUom };
};

export const useRecipes = () => {
    const [recipes, setRecipes] = useState(baseRecipes);

    const addRecipe = (recipe: Recipe) => {
        console.log({ recipe });
        setRecipes([...recipes, recipe]);
        console.log({ recipes });
    };

    return { recipes, setRecipes, addRecipe };
};

export const useSelectedRecipes = () => {
    console.log('init useSelectedRecipes');
    const { recipes } = useRecipes();
    const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([]);

    const handleSelectRecipe = (name: string) => {
        if (selectedRecipes.find(sr => sr.name === name)) {
            //selectedRecipes.splice(selectedRecipes.indexOf(name), 1);
            setSelectedRecipes(prevSelectedRecipes => prevSelectedRecipes.filter(sr => sr.name !== name));
            return;
        }
        const recipeToSelect = recipes.find(r => r.name === name)
        if (!recipeToSelect) return;

        setSelectedRecipes([...selectedRecipes, recipeToSelect]);
    };

    return { selectedRecipes, setSelectedRecipes, handleSelectRecipe };
};