import { Button } from 'components/Button';
import { PageTitle } from 'components/PageTitle';
import Fraction from 'fraction.js';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Card } from 'components/Card';
import { usePlans, useRecipes, useSelectedRecipes, useShoppedItems } from '../../app/hooks';
import { AddFab } from './AddFab';
import { AddGroceryItemModal } from './AddGroceryItemModal';
import GroceryList from './GroceryList';
import { getAllGroceries } from './utils/getAllGroceries';
import { addNewGroceryItemToPlan } from './utils/addNewGroceryItemToPlan';

function Groceries() {
    const [isGroceryDialogOpen, setIsGroceryDialogOpen] = useState(false);
    const { selectedRecipes } = useSelectedRecipes();
    const { plans, selectedPlanId, updatePlan } = usePlans();
    const { recipes } = useRecipes();
    const { clearAllShopped } = useShoppedItems();

    const handleCloseDialog = () => {
        setIsGroceryDialogOpen(false);
    };

    const handleSave = (quantity: Fraction, uomId: string, itemId: string, isAldi: boolean) => {
        const selectedPlanWithNewItem = addNewGroceryItemToPlan(
            { quantity: quantity.toString(), uomId, itemId, isAldi },
            plans[selectedPlanId],
        );
        updatePlan(selectedPlanWithNewItem);
        handleCloseDialog();
    };

    return selectedPlanId ? (
        <div>
            <div className="flex justify-center">
                <PageTitle>
                    <RouterLink to={`/plans/${selectedPlanId}`}>{plans[selectedPlanId].name}</RouterLink>
                </PageTitle>
            </div>
            <Card>
                <div>
                    <GroceryList groceries={getAllGroceries(selectedRecipes, recipes, plans, selectedPlanId)} />
                </div>
            </Card>
            <div className="my-2 flex flex-row justify-center">
                <Button onClick={clearAllShopped}>Clear All</Button>
            </div>
            <AddGroceryItemModal
                isGroceryDialogOpen={isGroceryDialogOpen}
                handleCloseDialog={handleCloseDialog}
                handleSave={handleSave}
            />
            <AddFab onClick={() => setIsGroceryDialogOpen(true)} />
        </div>
    ) : (
        <div className="my-6 flex justify-center">
            <p className="text-lg">No plan selected. Select a plan to see groceries.</p>
        </div>
    );
}

export default Groceries;
