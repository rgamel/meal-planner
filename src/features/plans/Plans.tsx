import { usePlans } from 'app/hooks';
import { AddFab } from 'features/groceries/AddFab';
import { useState } from 'react';
import { Card } from '../../components/Card';
import { PageTitle } from '../../components/PageTitle';
import { CreatePlanDialog } from './CreatePlanDialog';
import { PlanListItem } from './PlanListItem';
import { planNameComparator } from './utils/planNameComparator';

export default function Plans() {
    const { plans } = usePlans();
    const [isPlanDialogOpen, setIsPlanDialogOpen] = useState(false);

    return (
        <div className="pb-24">
            <PageTitle>Meal Plans</PageTitle>
            <Card className="">
                <ul className="divide-y divide-gray-200">
                    {Object.values(plans)
                        .sort(planNameComparator)
                        .map((plan) => (
                            <PlanListItem key={plan.id} id={plan.id} name={plan.name} />
                        ))}
                </ul>
            </Card>
            <AddFab
                onClick={() => {
                    setIsPlanDialogOpen(true);
                }}
            />
            {isPlanDialogOpen ? <CreatePlanDialog setIsPlanDialogOpen={setIsPlanDialogOpen} /> : null}
        </div>
    );
}
