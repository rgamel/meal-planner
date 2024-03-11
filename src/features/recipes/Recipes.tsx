import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, Link, List, Paper, Typography } from '@mui/material';
import { useCategories, usePlans, useSelectedRecipes } from 'app/hooks';
import { RecipesContext } from 'app/recipeContext';
import { AddFab } from 'features/groceries/AddFab';
import RecipeForm from 'features/recipes/RecipeForm';
import { titleCase } from 'helpers';
import groupBy from 'lodash/fp/groupBy';
import { useCallback, useContext, useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Recipe } from 'types';
import { NoRecipes } from './NoRecipes';
import RecipeListItem from './RecipeListItem';

type RecipeSectionProps = {
    recipes: Recipe[];
    categoryId: string;
    editRecipe: (recipe: Recipe) => void;
};

function RecipeCategorySection({ recipes, editRecipe, categoryId }: RecipeSectionProps) {
    const { categories } = useCategories();
    const label = titleCase(categories[categoryId]?.name);
    return (
        <Box sx={{ mb: 4 }}>
            <Typography variant="h4">{label}</Typography>
            {recipes.map((r) => (
                <RecipeListItem key={r.id} recipe={r} editRecipe={editRecipe} />
            ))}
        </Box>
    );
}

export default function Recipes() {
    const { recipes } = useContext(RecipesContext);
    const { clearAllSelected } = useSelectedRecipes();
    const { plans, selectedPlanId } = usePlans();
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
    const recipesByCategory = groupBy('categoryId', recipesMemo);

    return (
        <>
            {selectedPlanId ? (
                <Typography variant="h6">
                    {`Recipes for plan: `}
                    <Link component={RouterLink} to={`/plans/${selectedPlanId}`}>
                        {plans[selectedPlanId].name}
                    </Link>
                </Typography>
            ) : null}
            <Box sx={{ pb: 12 }}>
                <Paper sx={{ p: 2, mb: 2 }}>
                    <List>
                        {!recipesMemo.length ? (
                            <NoRecipes />
                        ) : (
                            Object.keys(recipesByCategory).map((categoryId) => (
                                <RecipeCategorySection
                                    key={categoryId}
                                    recipes={recipesByCategory[categoryId]}
                                    editRecipe={editRecipe}
                                    categoryId={categoryId}
                                />
                            ))
                        )}
                    </List>
                    <Dialog fullWidth open={isRecipeDialogOpen}>
                        <Grid container direction="column">
                            <Grid item xs={1}>
                                <DialogTitle sx={{ pb: 0 }}>{`${recipeToEdit ? 'Edit' : 'Create'} Recipe`}</DialogTitle>
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
                    <AddFab onClick={() => setRecipeDialogOpen(true)} />
                </Paper>
                <Box sx={{ display: 'flex' }}>
                    <Button variant="outlined" onClick={clearAllSelected} sx={{ mr: 2 }}>
                        Clear All
                    </Button>
                    <Button variant="contained" sx={{ flexGrow: 1 }}>
                        <Link component={RouterLink} to="/groceries" sx={{ textDecoration: 'none', color: '#FFF' }}>
                            Groceries
                        </Link>
                    </Button>
                </Box>
            </Box>
        </>
    );
}
