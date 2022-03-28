import { Downgraded } from '@hookstate/core';
import { Fab, Icon, List, Paper, Dialog, DialogContent, DialogTitle, Grid } from '@mui/material';
import RecipeForm from 'components/RecipeForm';
import { useCallback, useMemo, useState } from 'react';
import { Recipe } from 'types';
import RecipeListItem from '../components/RecipeListItem';
import { useIsRecipeDialogOpen, useRecipes } from '../hooks/hooks';

function Recipes() {
    const { recipes } = useRecipes();
    const { isRecipeDialogOpen, setRecipeDialogOpen } = useIsRecipeDialogOpen();
    const [recipeToEdit, setRecipeToEdit] = useState<null | Recipe>(null);
    const editRecipe = useCallback(
        (recipe: Recipe) => {
            setRecipeToEdit(recipe);
            setRecipeDialogOpen(true);
        },
        [recipes, setRecipeDialogOpen, setRecipeToEdit],
    );

    const recipesMemo = useMemo(() => Object.values(recipes.attach(Downgraded).get()), [recipes]);

    return (
        <Paper sx={{ p: 2, mb: 24 }}>
            <List>
                {recipesMemo.map((r) => (
                    <RecipeListItem key={r.id} recipe={r} editRecipe={editRecipe} />
                ))}
            </List>
            <Dialog
                fullWidth
                open={isRecipeDialogOpen.get()}
                onClose={() => {
                    setRecipeDialogOpen(false);
                    setRecipeToEdit(null);
                }}
            >
                <Grid container direction="column">
                    <Grid item xs={1}>
                        <DialogTitle sx={{ pb: 0 }}>New Recipe</DialogTitle>
                    </Grid>
                    <Grid item xs={11}>
                        <DialogContent>
                            {recipeToEdit ? (
                                <RecipeForm recipeToEdit={recipeToEdit} setRecipeToEdit={setRecipeToEdit} />
                            ) : (
                                <RecipeForm />
                            )}
                        </DialogContent>
                    </Grid>
                </Grid>
            </Dialog>
            <Fab
                color="primary"
                aria-label="add"
                onClick={() => setRecipeDialogOpen(true)}
                sx={{ position: 'fixed', bottom: 24, right: 24 }}
            >
                <Icon>add</Icon>
            </Fab>
        </Paper>
    );
}

export default Recipes;
