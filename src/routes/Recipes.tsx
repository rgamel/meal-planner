import { Fab, Icon, List, Paper } from '@mui/material';
import { useState } from 'react';
import { Recipe } from 'types';
import RecipeListItem from '../components/RecipeListItem';
import AddRecipe from './AddRecipe';
import { useRecipes } from '../hooks/hooks';

function Recipes() {
    const { recipes } = useRecipes();
    const [dialogOpen, setDialogOpen] = useState(false);
    const editRecipe = (recipe: Recipe) => {
        console.log('editing:\t', recipe); // TODO
    };
    return (
        <Paper sx={{ p: 2, mb: 24 }}>
            <List>
                {Object.values(recipes.get()).map((r) => (
                    <RecipeListItem key={r.recipeId} recipe={r} editRecipe={editRecipe} />
                ))}
            </List>
            <AddRecipe isOpen={dialogOpen} setIsOpen={setDialogOpen} />
            <Fab
                color="primary"
                aria-label="add"
                onClick={() => setDialogOpen(true)}
                sx={{ position: 'fixed', bottom: 24, right: 24 }}
            >
                <Icon>add</Icon>
            </Fab>
        </Paper>
    );
}

export default Recipes;
