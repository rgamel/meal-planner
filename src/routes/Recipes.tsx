import { Fab, Icon, List, Paper, Dialog, DialogContent, DialogTitle, Grid } from '@mui/material';
import RecipeForm from 'components/RecipeForm';
import { useState } from 'react';
import { Recipe } from 'types';
import RecipeListItem from '../components/RecipeListItem';
import { useIsRecipeDialogOpen, useRecipes } from '../hooks/hooks';

function Recipes() {
    const { recipes } = useRecipes();
    const { isRecipeDialogOpen, toggleRecipeDialog } = useIsRecipeDialogOpen();
    // const [recipeToEdit, setRecipeToEdit] = useState<null | Recipe>(null);
    const editRecipe = (recipe: Recipe) => {
        console.log('editing:\t', recipe); // TODO
        // setRecipeToEdit(recipe);
    };

    return (
        <Paper sx={{ p: 2, mb: 24 }}>
            <List>
                {Object.values(recipes.get()).map((r) => (
                    <RecipeListItem key={r.id} recipe={r} editRecipe={editRecipe} />
                ))}
            </List>
            <Dialog fullWidth open={isRecipeDialogOpen.get()} onClose={toggleRecipeDialog}>
                <Grid container direction="column">
                    <Grid item xs={1}>
                        <DialogTitle sx={{ pb: 0 }}>New Recipe</DialogTitle>
                    </Grid>
                    <Grid item xs={11}>
                        <DialogContent>
                            <RecipeForm />
                        </DialogContent>
                    </Grid>
                </Grid>
            </Dialog>
            <Fab
                color="primary"
                aria-label="add"
                onClick={toggleRecipeDialog}
                sx={{ position: 'fixed', bottom: 24, right: 24 }}
            >
                <Icon>add</Icon>
            </Fab>
        </Paper>
    );
}

export default Recipes;
