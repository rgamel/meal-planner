import GroceryList from '../components/GroceryList';
import { GroceryItem } from '../components/RecipeForm';
import { useSelectedRecipes } from '../hooks/hooks';

function Groceries() {
    const { selectedRecipes } = useSelectedRecipes();
    const compactGroceries = (groceries: GroceryItem[]) => {
        const list = groceries.reduce((acc, val) => {
            const match = acc.find((g) => g.item === val.item && g.uom === val.uom && val.isAldi === g.isAldi);
            if (match) {
                acc.splice(acc.indexOf(match), 1);
                return [...acc, { ...match, quantity: Number(val.quantity) + Number(match.quantity) }];
            }
            return [...acc, val];
        }, [] as GroceryItem[]);
        return list;
    };

    const allGroceries = compactGroceries(selectedRecipes.map((r) => r.groceries).flat());
    return (
        <>
            <h1>Groceries:</h1>
            <GroceryList groceries={allGroceries} />
        </>
    );
}

export default Groceries;
