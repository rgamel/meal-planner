import { useCallback, useMemo } from 'react';
import { GroceryItem } from 'types';
import GroceryList from './GroceryList';
import { useRecipes, useSelectedRecipes } from '../../app/hooks';

function Groceries() {
    const { selectedRecipes } = useSelectedRecipes();
    const { recipes } = useRecipes();

    const compactGroceries = useCallback((groceries: GroceryItem[]) => {
        const list = groceries.reduce((acc, val) => {
            const match = acc.find((g) => g.itemId === val.itemId && g.uomId === val.uomId && val.isAldi === g.isAldi);
            if (match) {
                acc.splice(acc.indexOf(match), 1);
                return [...acc, { ...match, quantity: Number(val.quantity) + Number(match.quantity) }];
            }
            return [...acc, val];
        }, [] as GroceryItem[]);
        return list;
    }, []);

    const allGroceries = useMemo(
        () =>
            compactGroceries(
                Object.values(selectedRecipes || [])
                    .map((id) => recipes[id].groceries)
                    .flat(),
            ),
        [selectedRecipes, compactGroceries, recipes],
    );
    return <GroceryList groceries={allGroceries} />;
}

export default Groceries;
