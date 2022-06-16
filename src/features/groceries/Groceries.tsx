import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { GroceryItem } from 'types';
import Fraction from 'fraction.js';
import GroceryList from './GroceryList';
import { usePlans, useRecipes, useSelectedRecipes } from '../../app/hooks';

function Groceries() {
    const { selectedRecipes } = useSelectedRecipes();
    const { plans, selectedPlan, setSelectedPlan } = usePlans();
    const { recipes } = useRecipes();
    const nav = useNavigate();

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

    const allGroceries = useMemo(
        () =>
            compactGroceries(
                Object.values(selectedRecipes || [])
                    .map((r) =>
                        recipes[r.id].groceries.map((gi) => ({
                            ...gi,
                            quantity: new Fraction(gi.quantity).mul(r.quantity).toString(),
                        })),
                    )
                    .flat(),
            ),
        [selectedRecipes, compactGroceries, recipes],
    );
    return (
        <div>
            {selectedPlan ? (
                <Typography variant="h6">
                    Groceries for plan:{' '}
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
            <GroceryList groceries={allGroceries} />
        </div>
    );
}

export default Groceries;
