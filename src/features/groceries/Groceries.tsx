import { Button } from 'components/Button';
import { PageTitle } from 'components/PageTitle';
import Fraction from 'fraction.js';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { usePlans, useRecipes, useSelectedRecipes, useShoppedItems } from '../../app/hooks';
import { AddFab } from './AddFab';
import { AddGroceryItemModal } from './AddGroceryItemModal';
import GroceryList from './GroceryList';
import { compactGroceries } from './compactGroceries';
import { getAllGroceries } from './getAllGroceries';

function Groceries() {
    const [isGroceryDialogOpen, setIsGroceryDialogOpen] = useState(false);
    const { selectedRecipes } = useSelectedRecipes();
    const { plans, selectedPlanId, updatePlan } = usePlans();
    const { recipes } = useRecipes();
    const { clearAllShopped } = useShoppedItems();

    const handleSave = (quantity: Fraction, uomId: string, itemId: string, isAldi: boolean) => {
        const plan = plans[selectedPlanId];
        const newGroceryItem = { quantity: quantity.toString(), uomId, itemId, isAldi };
        updatePlan({
            ...plan,
            groceries: compactGroceries([...(plan.groceries ?? []), newGroceryItem]),
        });
        handleCloseDialog();
    };

    const handleCloseDialog = () => {
        setIsGroceryDialogOpen(false);
    };

    return (
        <>
            {selectedPlanId ? (
                <Button>
                    <PageTitle>
                        <RouterLink to={`/plans/${selectedPlanId}`}>{plans[selectedPlanId].name}</RouterLink>
                    </PageTitle>
                </Button>
            ) : null}
            <div className="mx-1">
                <GroceryList groceries={getAllGroceries(selectedRecipes, recipes, plans, selectedPlanId)} />
            </div>
            <div className="my-2 flex flex-row justify-center">
                <Button onClick={clearAllShopped}>Clear All</Button>
            </div>
            <AddGroceryItemModal
                isGroceryDialogOpen={isGroceryDialogOpen}
                handleCloseDialog={handleCloseDialog}
                handleSave={handleSave}
            />
            <AddFab onClick={() => setIsGroceryDialogOpen(true)} />
        </>
    );
}

export default Groceries;
