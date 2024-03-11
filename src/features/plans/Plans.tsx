import { usePlans } from 'app/hooks';
import { AddFab } from 'features/groceries/AddFab';
import { useState } from 'react';
import { PageTitle } from '../../components/PageTitle';
import { PlanListItem } from './PlanListItem';
import { CreatePlanDialog } from './CreatePlanDialog';

export default function Plans() {
    const { plans } = usePlans();
    const [isPlanDialogOpen, setIsPlanDialogOpen] = useState(false);

    return (
        <div>
            <PageTitle label="Meal Plans" />
            <div className="flex flex-col gap-3">
                <ul
                    role="list"
                    className="m-6 border-spacing-0 divide-y divide-gray-200 rounded-xl border-2 border-gray-200 bg-white text-xl shadow-sm"
                >
                    {Object.values(plans)
                        .sort((a, b) => {
                            const nameA = a.name.toUpperCase();
                            const nameB = b.name.toUpperCase();

                            if (nameA > nameB) {
                                return 1;
                            } else if (nameA < nameB) {
                                return -1;
                            }
                            return 0;
                        })
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
