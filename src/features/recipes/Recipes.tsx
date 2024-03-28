import { Dialog } from '@mui/material';
import { usePlans, useSelectedRecipes } from 'app/hooks';
import { RecipesContext } from 'app/recipeContext';
import { Button } from 'components/Button';
import { PageTitle } from 'components/PageTitle';
import { AddFab } from 'features/groceries/AddFab';
import RecipeForm from 'features/recipes/RecipeForm';
import groupBy from 'lodash/fp/groupBy';
import { useCallback, useContext, useMemo, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Recipe } from 'types';
import { RecipeCategorySection } from './RecipeCategorySection';
import { DialogTitle } from 'components/DialogTitle';
import { EmptyPlanMessage } from 'features/plans/EmptyPlanMessage';
import { Card } from 'components/Card';

export default function Recipes() {
    const { recipes } = useContext(RecipesContext);
    const { clearAllSelected } = useSelectedRecipes();
    const { plans, selectedPlanId } = usePlans();
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
            {selectedPlanId ? (
                <PageTitle>
                    <RouterLink to={`/plans/${selectedPlanId}`}>{plans[selectedPlanId].name}</RouterLink>
                </PageTitle>
            ) : null}
            <div>
                <Card>
                    {!recipesMemo.length ? (
                        <EmptyPlanMessage />
                    ) : (
                        <ul className="font-regular divide-y-2 divide-gray-200">
                            {Object.keys(recipesByCategory).map((categoryId) => (
                                <RecipeCategorySection
                                    key={categoryId}
                                    recipes={recipesByCategory[categoryId]}
                                    editRecipe={editRecipe}
                                    categoryId={categoryId}
                                />
                            ))}
                        </ul>
                    )}
                    <Dialog fullWidth open={isRecipeDialogOpen}>
                        <div className="mx-6 my-4 space-y-4">
                            <DialogTitle>{`${recipeToEdit ? 'Edit' : 'Create'} Recipe`}</DialogTitle>
                            <RecipeForm
                                setRecipeDialogOpen={setRecipeDialogOpen}
                                recipeToEdit={recipeToEdit}
                                setRecipeToEdit={setRecipeToEdit}
                            />
                        </div>
                    </Dialog>
                    <AddFab onClick={() => setRecipeDialogOpen(true)} />
                </Card>
                <div className="m-2 flex">
                    <Button onClick={clearAllSelected}>Clear Selected</Button>
                    <Button onClick={() => nav('/groceries')}>Groceries</Button>
                </div>
            </div>
        </>
    );
}
