import { GroceryItem, Plan } from 'types';
import { compactGroceries } from './compactGroceries';

export const addNewGroceryItemToPlan = (newGroceryItem: GroceryItem, plan: Plan) => ({
    ...plan,
    groceries: compactGroceries([...(plan.groceries ?? []), newGroceryItem]),
});
