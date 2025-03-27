import { usePlans } from 'app/hooks';
import { AddFab } from 'features/groceries/AddFab';
import { isEmpty } from 'lodash/fp';
import { useState } from 'react';
import { Card } from '../../components/Card';
import { PageTitle } from '../../components/PageTitle';
import { CreatePlanDialog } from './CreatePlanDialog';
import { PlanListItem } from './PlanListItem';
import { planNameComparator } from './utils/planNameComparator';

export default function Plans() {
    const [isPlanDialogOpen, setIsPlanDialogOpen] = useState(false);
    const { pinnedPlans, unpinnedPlans, togglePinned } = usePlans();

    return (
        <div className="pb-24">
            <PageTitle>Meal Plans</PageTitle>
            {!isEmpty(pinnedPlans) && (
                <Card>
                    <ul className="divide-y divide-gray-100">
                        {[...pinnedPlans].sort(planNameComparator).map((plan) => (
                            <PlanListItem key={plan.id} id={plan.id} name={plan.name} togglePinned={togglePinned} />
                        ))}
                    </ul>
                </Card>
            )}

            <Card>
                <ul className="divide-y divide-gray-100">
                    {[...unpinnedPlans].sort(planNameComparator).map((plan) => (
                        <PlanListItem key={plan.id} id={plan.id} name={plan.name} togglePinned={togglePinned} />
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
