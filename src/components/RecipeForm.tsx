import { ChangeEvent, useState } from 'react';
import { Button, DialogContentText, Divider, Grid, TextField, Typography } from '@mui/material';
import { Category, EntityOptionType, GroceryItem, Ingredient, Uom } from 'types';
import IngredientInput from './IngredientInput';
import { GroceryItems } from './GroceryList';
import { useRecipes, useCategories, useIsRecipeDialogOpen } from '../hooks/hooks';
import Autocomplete from './Autocomplete';

export default function RecipeForm() {
    const { addRecipe } = useRecipes();
    const { categories, addCategory, deleteCategory } = useCategories();
    const { toggleRecipeDialog } = useIsRecipeDialogOpen();
    const [groceries, setGroceries] = useState<GroceryItem[]>([]);
    const [category, setCategory] = useState<EntityOptionType | null>(null);
    const [recipeName, setRecipeName] = useState('');

    const commitGroceryItem = (quantity: number, uom: Uom, item: Ingredient, isAldi: boolean) => {
        const match = groceries.find((g) => g.item.name === item.name);
        if (!match) {
            setGroceries([...groceries, { quantity, uom, item, isAldi }]);
            return;
        }
        if (match.uom.name.trim() === uom.name.trim() && match.isAldi === isAldi) {
            groceries.splice(groceries.indexOf(match), 1);
            setGroceries([...groceries, { ...match, quantity: Number(match.quantity) + Number(quantity) }]);
        }
    };

    const deleteGroceryItem = (item: GroceryItem) => {
        setGroceries((prev) => prev.filter((g: GroceryItem) => g !== item));
    };

    const handleSetRecipeName = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setRecipeName(input);
    };

    const handleSave = () => {
        if (recipeName.trim().length && category?.id && groceries.length) {
            const recipe = { name: recipeName, groceries, category: category as Category };
            addRecipe(recipe);
            setRecipeName('');
            setGroceries([]);
            toggleRecipeDialog();
        }
    };
    const suggestions = Object.values(categories.get());

    return (
        <Grid container direction="column" spacing={1}>
            <Grid item xs={1}>
                <TextField
                    label="Recipe name"
                    variant="outlined"
                    fullWidth
                    value={recipeName}
                    onChange={handleSetRecipeName}
                    required
                />
            </Grid>
            <Grid item>
                <Autocomplete
                    suggestions={suggestions}
                    label="Category"
                    selected={category}
                    setSelected={setCategory}
                    addItem={addCategory}
                    deleteItem={deleteCategory}
                />
            </Grid>
            <Divider sx={{ mt: 2 }} />
            <Grid item xs={1}>
                <DialogContentText>Please add ingredients for your recipe below:</DialogContentText>
            </Grid>
            <Grid item xs={1}>
                <IngredientInput commitGroceryItem={commitGroceryItem} />
            </Grid>
            <Divider sx={{ mt: 2 }} />
            <Grid item xs={1}>
                <Typography>Ingredients:</Typography>
            </Grid>
            <GroceryItems items={groceries} deleteGroceryItem={deleteGroceryItem} />
            <Button onClick={handleSave} variant="contained">
                SAVE
            </Button>
        </Grid>
    );
}
