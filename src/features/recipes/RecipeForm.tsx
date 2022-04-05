import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button, DialogContentText, Divider, Grid, TextField, Typography } from '@mui/material';
import { EntityOptionType, GroceryItem, Recipe } from 'types';
import { isNil } from 'lodash';
import IngredientInput from './IngredientInput';
import { GroceryItems } from '../groceries/GroceryList';
import { useRecipes, useCategories } from '../../app/hooks';
import Autocomplete from '../../components/Autocomplete';

type RecipeFormProps = {
    setRecipeDialogOpen: Dispatch<SetStateAction<boolean>>;
    setRecipeToEdit: Dispatch<SetStateAction<null | Recipe>>;
    recipeToEdit: Recipe | null;
};

// TODO: use React-Final-Form for form management and validation plz k thnkx
export default function RecipeForm({ recipeToEdit, setRecipeToEdit, setRecipeDialogOpen }: RecipeFormProps) {
    const { addRecipe, updateRecipe } = useRecipes();
    const { categories, addCategory, deleteCategory } = useCategories();
    const [groceries, setGroceries] = useState<GroceryItem[]>([]);
    const [category, setCategory] = useState<EntityOptionType | null>(null);
    const [recipeName, setRecipeName] = useState('');

    useEffect(() => {
        if (!recipeToEdit) return;
        setRecipeName(recipeToEdit.name);
        setCategory(categories[recipeToEdit.categoryId || '']);
        setGroceries(recipeToEdit.groceries);
    }, [recipeToEdit, categories]);

    const commitGroceryItem = (quantity: number, uomId: string, itemId: string, isAldi: boolean) => {
        const match = groceries.find((g) => g.itemId === itemId);
        if (!match) {
            setGroceries([...groceries, { quantity, uomId, itemId, isAldi }]);
            return;
        }
        if (match.uomId === uomId && match.isAldi === isAldi) {
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

    const enableSave = () => Boolean(recipeName.trim().length && groceries.length);

    const handleSave = () => {
        if (enableSave()) {
            const recipe = { name: recipeName.trim(), groceries, categoryId: category?.id || '' };
            if (!isNil(recipeToEdit)) {
                updateRecipe({ id: recipeToEdit.id, ...recipe });
            } else {
                addRecipe(recipe);
            }
            setRecipeDialogOpen(false);
            setRecipeToEdit(null);
        }
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
                    suggestions={Object.values(categories)}
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
            <Button onClick={handleSave} disabled={!enableSave()} variant="contained">
                {`Save${recipeToEdit ? ' changes' : ''}`}
            </Button>
        </Grid>
    );
}
