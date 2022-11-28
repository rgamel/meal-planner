import { Dialog, DialogContent, DialogTitle, Fab, Icon, Link, Typography } from '@mui/material';
import IngredientInput from 'features/recipes/IngredientInput';
import Fraction from 'fraction.js';
import { useCallback, useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { GroceryItem } from 'types';
import { usePlans, useRecipes, useSelectedRecipes } from '../../app/hooks';
import GroceryList from './GroceryList';

function Groceries() {
    const [isGroceryDialogOpen, setIsGroceryDialogOpen] = useState(false);
    const { selectedRecipes } = useSelectedRecipes();
    const { plans, selectedPlanId, updatePlan } = usePlans();
    const { recipes } = useRecipes();

    const compactGroceries = useCallback((groceries: GroceryItem[]) => {
        const list = groceries.reduce((acc, val) => {
            const match = acc.find((g) => g.itemId === val.itemId && g.uomId === val.uomId && val.isAldi === g.isAldi);
            if (match) {
                acc.splice(acc.indexOf(match), 1);
                return [
                    ...acc,
                    { ...match, quantity: new Fraction(val.quantity).add(match.quantity).toFraction(true) },
                ];
            }
            return [...acc, val];
        }, [] as GroceryItem[]);
        return list;
    }, []);

    const handleSave = (quantity: Fraction, uomId: string, itemId: string, isAldi: boolean) => {
        const plan = plans[selectedPlanId];
        const newGroceryItem = { quantity: quantity.toString(), uomId, itemId, isAldi };
        updatePlan({
            ...plan,
            groceries: compactGroceries([...(plan.groceries ?? []), newGroceryItem]),
        });
        setIsGroceryDialogOpen(false);
    };

    const allGroceries = useMemo(
        () =>
            compactGroceries(
                Object.values(selectedRecipes ?? [])
                    .map((r) =>
                        recipes[r.id].groceries.map((gi) => ({
                            ...gi,
                            quantity: new Fraction(gi.quantity).mul(r.quantity).toFraction(),
                        })),
                    )
                    .flat()
                    .concat(plans[selectedPlanId]?.groceries ?? []),
            ),
        [selectedRecipes, recipes, plans, compactGroceries, selectedPlanId],
    );

    const handleCloseDialog = useCallback(() => {
        setIsGroceryDialogOpen(false);
    }, [setIsGroceryDialogOpen]);
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
            <GroceryList groceries={allGroceries} />
            <Dialog open={isGroceryDialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Add Grocery Item</DialogTitle>
                <DialogContent>
                    <IngredientInput commitGroceryItem={handleSave} />
                </DialogContent>
            </Dialog>
            <Fab
                color="primary"
                aria-label="add"
                onClick={() => {
                    setIsGroceryDialogOpen(true);
                }}
                sx={{ position: 'fixed', bottom: 24, right: 24 }}
            >
                <Icon>add</Icon>
            </Fab>
        </div>
    );
}

export default Groceries;
