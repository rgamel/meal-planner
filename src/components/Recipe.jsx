import React, { useState } from 'react';
import IngredientInput from './IngredientInput';
import GroceryList from './GroceryList';

const Recipe = ({ ingredients, addIngredient, uoms, addUom, addRecipe }) => {
    const [groceries, setGroceries] = useState([]);
    const [recipeName, setRecipeName] = useState('');


    const commitGroceryItem = (quantity, uom, item, isAldi) => {
        const match = groceries.find(g => g.item === item);
        if (!match) {
            setGroceries([...groceries, { quantity, uom, item, isAldi }]);
            return;
        }
        if ((match.uom.trim() === uom.trim()) && (match.isAldi === uom.isAldi)) {
            groceries.splice(groceries.indexOf(match), 1);
            setGroceries([...groceries, { ...match, quantity: Number(match.quantity) + Number(quantity) }]);
            return;
        }
    };

    const handleSetRecipeName = (e) => {
        const input = e.target.value;
        setRecipeName(input);
    };

    const handleSave = () => {
        const recipe = { name: recipeName, groceries };
        addRecipe(recipe);
        setRecipeName('');
        setGroceries([]);
    };

    return (
        <div>
            <h1>{recipeName || "New Recipe"}</h1>
            <input type="text" value={recipeName} onChange={handleSetRecipeName} />
            <IngredientInput
                ingredients={ingredients}
                addIngredient={addIngredient}
                uoms={uoms}
                addUom={addUom}
                commitGroceryItem={commitGroceryItem}
            />
            <h3>Grocery List:</h3>
            <GroceryList groceries={groceries} />
            <button type="button" onClick={handleSave}>SAVE</button>
        </div>
    );
};

export default Recipe;
