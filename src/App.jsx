import React from "react";
import { useState } from "react";
import Recipe from './components/Recipe';
import GroceryList from "./components/GroceryList";
import "./styles.css";
import RecipeListItem from "./components/RecipeListItem";

const baseIngredients = ['apples', 'tomatoes', 'salt', 'pepper', 'cumin', 'tarragon', 'chicken', 'corn', 'black beans', 'tortillas', 'beef'];
const baseUoms = ['oz', 'can', 'bag', 'lb', 'gram', 'tsp', 'ml'];

const App = () => {
    const [ingredients, setIngredients] = useState(baseIngredients);
    const [uoms, setUoms] = useState(baseUoms);
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipes, setSelectedRecipes] = useState([]);


    const addIngredient = (item) => {
        setIngredients([...ingredients, item]);
    };

    const addUom = (uom) => {
        setUoms([...uoms, uom]);
    };

    const addRecipe = (recipe) => {
        setRecipes([...recipes, recipe])
    }

    const compactGroceries = (groceries) => {
        const list = groceries.reduce((acc, val) => {
            const match = acc.find((g) => g.item === val.item && g.uom === val.uom && val.isAldi === g.isAldi)
            if (match) {
                acc.splice(acc.indexOf(match), 1)
                return [...acc, { ...match, quantity: Number(val.quantity) + Number(match.quantity) }];
            }
            return [...acc, val];
        }, [])
        console.log(list);
        return list;
    }

    const handleSelectRecipe = (name) => {
        if (selectedRecipes.find(sr => sr.name === name)) {
            //selectedRecipes.splice(selectedRecipes.indexOf(name), 1);
            setSelectedRecipes(selectedRecipes.filter(sr => sr.name !== name));
            return;
        }

        setSelectedRecipes([...selectedRecipes, recipes.find(r => r.name === name)])
    }

    const allGroceries = compactGroceries(selectedRecipes.map(r => r.groceries).flat());
    return (
        <div>
            <Recipe
                ingredients={ingredients}
                addIngredient={addIngredient}
                uoms={uoms}
                addUom={addUom}
                addRecipe={addRecipe}
            />
            <h1>Recipes:</h1>
            <ul>
            {recipes.map(r => (
                <RecipeListItem name={r.name} handleSelectRecipe={handleSelectRecipe} selectedRecipes={selectedRecipes} />
            ))}
            </ul>
            <h1>Groceries:</h1>
            <GroceryList groceries={allGroceries}/>
        </div>
    );
};

export default App;
