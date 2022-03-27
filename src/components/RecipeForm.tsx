import { ChangeEvent, useState } from 'react';
import { nanoid } from 'nanoid';
import { Button, DialogContentText, Divider, Grid, TextField, Typography } from '@mui/material';
import { GroceryItem } from 'types';
import IngredientInput from './IngredientInput';
import { StoreList } from './GroceryList';
import { useRecipes } from '../hooks/hooks';
import Autocomplete from './Autocomplete';

export default function RecipeForm() {
    const { addRecipe } = useRecipes();
    const [groceries, setGroceries] = useState<GroceryItem[]>([]);
    const [category, setCategory] = useState('');
    const [recipeName, setRecipeName] = useState('');

    const commitGroceryItem = (quantity: number, uom: string, item: string, isAldi: boolean) => {
        const match = groceries.find((g) => g.item === item);
        if (!match) {
            setGroceries([...groceries, { quantity, uom, item, isAldi, id: nanoid() }]);
            return;
        }
        if (match.uom.trim() === uom.trim() && match.isAldi === isAldi) {
            groceries.splice(groceries.indexOf(match), 1);
            setGroceries([...groceries, { ...match, quantity: Number(match.quantity) + Number(quantity) }]);
        }
    };

    const deleteGroceryItem = (id: string) => {
        setGroceries((prev) => prev.filter((g: GroceryItem) => g.id !== id));
    };

    const handleSetRecipeName = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setRecipeName(input);
    };

    const handleSave = () => {
        const recipe = { name: recipeName, groceries, category, recipeId: nanoid() };
        if (!recipeName.trim().length) return;
        addRecipe(recipe);
        setRecipeName('');
        setGroceries([]);
    };

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
                    suggestions={[
                        'American',
                        'Asian',
                        'Chinese',
                        'Japanese',
                        'Korean',
                        'Thai',
                        'Comfort Food',
                        'Mexican',
                        'Italian',
                        'French',
                        'Vegan',
                        'Vegetarian',
                        'Slow Cooker',
                        'One Skillet',
                        'Jamaican',
                        'Lebanese',
                        'Dessert',
                        'Southern',
                        'Soup',
                        'Stew',
                        'Southwestern',
                    ].sort()}
                    label="Category"
                    selected={category}
                    setSelected={setCategory}
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
            <StoreList items={groceries} deleteGroceryItem={deleteGroceryItem} />
            <Button onClick={handleSave} variant="contained">
                SAVE
            </Button>
        </Grid>
    );
}
