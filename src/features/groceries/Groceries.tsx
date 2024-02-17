import { Dialog, DialogContent, DialogTitle, Link, Typography } from '@mui/material';
import IngredientInput from 'features/recipes/IngredientInput';
import Fraction from 'fraction.js';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { usePlans, useRecipes, useSelectedRecipes } from '../../app/hooks';
import { AddFab } from './AddFab';
import GroceryList from './GroceryList';
import { compactGroceries } from './compactGroceries';
import { getAllGroceries } from './getAllGroceries';

function Groceries() {
    const [isGroceryDialogOpen, setIsGroceryDialogOpen] = useState(false);
    const { selectedRecipes } = useSelectedRecipes();
    const { plans, selectedPlanId, updatePlan } = usePlans();
    const { recipes } = useRecipes();

    const handleSave = (quantity: Fraction, uomId: string, itemId: string, isAldi: boolean) => {
        const plan = plans[selectedPlanId];
        const newGroceryItem = { quantity: quantity.toString(), uomId, itemId, isAldi };
        updatePlan({
            ...plan,
            groceries: compactGroceries([...(plan.groceries ?? []), newGroceryItem]),
        });
        setIsGroceryDialogOpen(false);
    };

    const handleCloseDialog = () => {
        setIsGroceryDialogOpen(false);
    };

    return (
        <div>
            {selectedPlanId ? (
                <Typography variant="h6">
                    {`Groceries for plan: `}
                    <Link component={RouterLink} to={`/plans/${selectedPlanId}`}>
                        {plans[selectedPlanId].name}
                    </Link>
                </Typography>
            ) : null}
            <GroceryList groceries={getAllGroceries(selectedRecipes, recipes, plans, selectedPlanId)} />
            <Dialog open={isGroceryDialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Add Grocery Item</DialogTitle>
                <DialogContent>
                    <IngredientInput commitGroceryItem={handleSave} />
                </DialogContent>
            </Dialog>
            <AddFab onClick={() => setIsGroceryDialogOpen(true)} />
        </div>
    );
}

export default Groceries;
