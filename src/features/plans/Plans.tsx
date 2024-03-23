import { usePlans } from 'app/hooks';
import { AddFab } from 'features/groceries/AddFab';
import { useState } from 'react';
import { PageTitle } from '../../components/PageTitle';
import { PlanListItem } from './PlanListItem';
import { CreatePlanDialog } from './CreatePlanDialog';
import { planNameComparator } from './planNameComparator';

export default function Plans() {
    const { plans } = usePlans();
    const [isPlanDialogOpen, setIsPlanDialogOpen] = useState(false);

    return (
        <div className="pb-24">
            <PageTitle>Meal Plans</PageTitle>
            <div className="flex flex-col gap-3">
                <ul className="m-6 border-spacing-0 divide-y divide-gray-200 rounded-xl border-2 border-gray-200 bg-white text-xl shadow-sm">
                    {Object.values(plans)
                        .sort(planNameComparator)
                        .map((plan) => (
                            <PlanListItem key={plan.id} id={plan.id} name={plan.name} />
                        ))}
                </ul>
            </div>
            <AddFab
                onClick={() => {
                    setIsPlanDialogOpen(true);
                }}
            />
            {isPlanDialogOpen ? <CreatePlanDialog setIsPlanDialogOpen={setIsPlanDialogOpen} /> : null}
        </div>
    );
}
