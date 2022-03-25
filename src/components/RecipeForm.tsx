import React, { useState } from 'react';
import IngredientInput from './IngredientInput';
import GroceryList from './GroceryList';
import { useRecipes } from '../hooks/hooks';

export type GroceryItem = { quantity: number; uom: string; item: string; isAldi: boolean };

export type Recipe = { name: string; groceries: GroceryItem[] };

function RecipeForm() {
    const { addRecipe } = useRecipes();
    const [groceries, setGroceries] = useState<GroceryItem[]>([]);
    const [recipeName, setRecipeName] = useState('');

    const commitGroceryItem = (quantity: number, uom: string, item: string, isAldi: boolean) => {
        const match = groceries.find((g) => g.item === item);
        if (!match) {
            setGroceries([...groceries, { quantity, uom, item, isAldi }]);
            return;
        }
        if (match.uom.trim() === uom.trim() && match.isAldi === isAldi) {
            groceries.splice(groceries.indexOf(match), 1);
            setGroceries([...groceries, { ...match, quantity: Number(match.quantity) + Number(quantity) }]);
        }
    };

    const handleSetRecipeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setRecipeName(input);
    };

    const handleSave = () => {
        const recipe = { name: recipeName, groceries };
        if (!recipeName.trim().length) return;
        addRecipe(recipe);
        setRecipeName('');
        setGroceries([]);
    };

    return (
        <div>
            <h1>{recipeName || 'New Recipe'}</h1>
            <input type="text" value={recipeName} onChange={handleSetRecipeName} />
            <IngredientInput commitGroceryItem={commitGroceryItem} />
            <h3>Grocery List:</h3>
            <GroceryList groceries={groceries} />
            <button type="button" onClick={handleSave}>
                SAVE
            </button>
        </div>
    );
}

export default RecipeForm;
