import { titleCase } from 'helpers';
import { getAllGroceries } from 'features/groceries/utils/getAllGroceries';
import { useIngredients, usePlans, useRecipes } from 'app/hooks';
import { QuantitySelect } from './QuantitySelect';

type PlanItemProps = {
    recipeWithQuantity: { id: string; quantity: string };
    planId: string;
};

export function PlanItem({ recipeWithQuantity, planId }: PlanItemProps): JSX.Element {
    const { plans } = usePlans();
    const { recipes } = useRecipes();
    const { ingredients } = useIngredients();

    const readablePlanIngredients = getAllGroceries([recipeWithQuantity], recipes, plans, planId).map(
        (item) => ingredients[item.itemId].name,
    );

    return (
        <li className="align-center flex flex-row justify-between px-6 py-2">
            <div>
                <p className="text-md leading-6 text-gray-900">
                    {titleCase(recipes[recipeWithQuantity.id]?.name) || recipeWithQuantity.id}
                </p>
                <ul className="ml-6 pb-6 text-xs leading-5 text-gray-500">
                    {readablePlanIngredients.map((i) => (
                        <li key={i}>{titleCase(i)}</li>
                    ))}
                </ul>
            </div>
            <div>
                x
                <QuantitySelect recipeWithQuantity={recipeWithQuantity} />
            </div>
        </li>
    );
}
