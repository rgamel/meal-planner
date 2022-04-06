import { Fab, Icon, List, Paper, Dialog, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';
import RecipeForm from 'features/recipes/RecipeForm';
import { useCallback, useContext, useMemo, useState } from 'react';
import { Recipe } from 'types';
import { RecipesContext } from 'app/recipeContext';
import RecipeListItem from './RecipeListItem';

function NoRecipes() {
    return (
        <div>
            <Typography variant="h4">Nothing here yet.</Typography>
            <Typography variant="body1">Click the + button below to get started</Typography>
        </div>
    );
}

export default function Recipes() {
    const { recipes } = useContext(RecipesContext);
    const [isRecipeDialogOpen, setRecipeDialogOpen] = useState(false);
    const [recipeToEdit, setRecipeToEdit] = useState<null | Recipe>(null);
    const editRecipe = useCallback(
        (recipe: Recipe) => {
            setRecipeToEdit(recipe);
            setRecipeDialogOpen(true);
        },
        [setRecipeDialogOpen, setRecipeToEdit],
    );

    const recipesMemo = useMemo(() => Object.values(recipes), [recipes]);
    return (
        <Paper sx={{ p: 2, mb: 24 }}>
            <List>
                {!recipesMemo.length ? (
                    <NoRecipes />
                ) : (
                    recipesMemo.map((r) => <RecipeListItem key={r.id} recipe={r} editRecipe={editRecipe} />)
                )}
            </List>
            <Dialog
                fullWidth
                open={isRecipeDialogOpen}
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
                            <RecipeForm
                                setRecipeDialogOpen={setRecipeDialogOpen}
                                recipeToEdit={recipeToEdit}
                                setRecipeToEdit={setRecipeToEdit}
                            />
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
