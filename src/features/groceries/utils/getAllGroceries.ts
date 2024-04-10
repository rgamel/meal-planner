import Fraction from 'fraction.js';
import { PlanList, RecipeList } from 'types';
import { compactGroceries } from './compactGroceries';

export const getAllGroceries = (
    selectedRecipes: {
        id: string;
        quantity: string;
    }[],
    recipes: RecipeList,
    plans: PlanList,
    selectedPlanId: string,
) =>
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
    );
