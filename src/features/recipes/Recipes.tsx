import {
    Fab,
    Icon,
    List,
    Paper,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    Typography,
    Box,
    Button,
} from '@mui/material';
import { groupBy, startCase } from 'lodash/fp';
import { useNavigate } from 'react-router-dom';
import RecipeForm from 'features/recipes/RecipeForm';
import { useCallback, useContext, useMemo, useState } from 'react';
import { Recipe } from 'types';
import { RecipesContext } from 'app/recipeContext';
import { useCategories, usePlans, useSelectedRecipes } from 'app/hooks';
import RecipeListItem from './RecipeListItem';

function NoRecipes() {
    return (
        <>
            <Typography variant="h4">Nothing here yet.</Typography>
            <Typography variant="body1">Click the + button below to get started</Typography>
        </>
    );
}

type RecipeSectionProps = {
    recipes: Recipe[];
    categoryId: string;
    editRecipe: (recipe: Recipe) => void;
};

function RecipeCategorySection({ recipes, editRecipe, categoryId }: RecipeSectionProps) {
    const { categories } = useCategories();
    const label = startCase(categories[categoryId]?.name);
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
    const { plans, selectedPlan, setSelectedPlan } = usePlans();
    const [isRecipeDialogOpen, setRecipeDialogOpen] = useState(false);
    const [recipeToEdit, setRecipeToEdit] = useState<null | Recipe>(null);
    const nav = useNavigate();
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
            {selectedPlan ? (
                <Typography variant="h6">
                    Recipes for plan:{' '}
                    <Button
                        onClick={() => {
                            nav(`/plans/${selectedPlan}`);
                            setSelectedPlan('');
                        }}
                    >
                        {plans[selectedPlan].name}
                    </Button>
                </Typography>
            ) : null}
            <Paper sx={{ p: 2, mb: 24 }}>
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
                <Fab
                    color="primary"
                    aria-label="add"
                    onClick={() => setRecipeDialogOpen(true)}
                    sx={{ position: 'fixed', bottom: 24, right: 24 }}
                >
                    <Icon>add</Icon>
                </Fab>
            </Paper>
            <Button variant="contained" onClick={clearAllSelected} sx={{ mb: 2 }}>
                Clear All
            </Button>
        </>
    );
}
