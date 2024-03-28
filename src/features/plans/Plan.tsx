import { usePlans } from 'app/hooks';
import { Button, DeleteButton, IconButton } from 'components/Button';
import { PageTitle } from 'components/PageTitle';
import { ArrowBack } from 'components/icons/ArrowBack';
import { Edit } from 'components/icons/Edit';
import { Save } from 'components/icons/Save';
import { titleCase } from 'helpers';
import { isEmpty, noop } from 'lodash/fp';
import { useConfirm } from 'material-ui-confirm';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EmptyPlanMessage } from './EmptyPlanMessage';
import { PlanItem } from './PlanItem';

export default function Plan(): JSX.Element {
    const planId = useParams().id as string;
    const { plans, setSelectedPlanId, deletePlan, updatePlan } = usePlans();
    const nav = useNavigate();
    const confirm = useConfirm();

    const plan = plans[planId];

    const [editingName, setEditingName] = useState(false);
    const [planName, setPlanName] = useState(titleCase(plan?.name));

    useEffect(() => {
        setSelectedPlanId(planId);
    }, [planId, setSelectedPlanId]);

    const handleDelete = () => {
        confirm({
            title: `Delete ${planName}?`,
            description: 'This cannot be undone',
            confirmationButtonProps: { color: 'error', variant: 'contained' },
        })
            .then(() => {
                deletePlan(planId);
                nav('/plans');
            })
            .catch(noop);
    };

    const onInputChange = (e: { target: { value: string } }) => {
        const inputValue = e.target.value ?? '';
        if (!inputValue.trim().length) return;
        setPlanName(e.target.value);
    };

    const navToRecipes = useCallback(() => {
        setSelectedPlanId(planId);
        nav('/recipes');
    }, [planId]);

    const navToGroceries = useCallback(() => {
        setSelectedPlanId(planId);
        nav('/groceries');
    }, [planId]);

    const hasRecipes = !isEmpty(plan?.recipes ?? []);

    return (
        <>
            <div className="align-center flex flex-row justify-around">
                <IconButton
                    className="m-2 p-2"
                    onClick={() => {
                        nav('/plans');
                    }}
                >
                    <div className="opacity-50">
                        <ArrowBack />
                    </div>
                </IconButton>
                {editingName ? (
                    <>
                        <input
                            className="block w-full rounded-lg py-2 pl-6 pr-20 text-lg ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-700"
                            value={planName}
                            onChange={onInputChange}
                        />
                        <IconButton
                            className="m-2 p-2"
                            onClick={() => {
                                updatePlan({ ...plan, name: planName });
                                setEditingName(false);
                            }}
                        >
                            <div className="opacity-50">
                                <Save />
                            </div>
                        </IconButton>
                    </>
                ) : (
                    <>
                        <PageTitle>
                            <span className="align-middle">{planName}</span>
                        </PageTitle>
                        <IconButton
                            className="m-2 p-2"
                            type="button"
                            onClick={() => {
                                setEditingName(true);
                            }}
                        >
                            <div className="opacity-50">
                                <Edit />
                            </div>
                        </IconButton>
                    </>
                )}
            </div>
            {hasRecipes ? (
                <div className="m-4">
                    <ul className="w-full divide-y divide-gray-200 rounded-xl border-2 border-gray-200 bg-white">
                        {(plan?.recipes || []).map((recipeWithQuantity: { id: string; quantity: string }) => (
                            <PlanItem
                                recipeWithQuantity={recipeWithQuantity}
                                key={recipeWithQuantity.id}
                                planId={planId}
                            />
                        ))}
                    </ul>
                </div>
            ) : (
                <EmptyPlanMessage />
            )}

            <div className="flex flex-col">
                <div className="m-4 inline-flex">
                    <Button
                        type="button"
                        variant={!hasRecipes ? 'contained' : 'outlined'}
                        className="w-full rounded-none rounded-l-md"
                        onClick={navToRecipes}
                    >
                        Recipes
                    </Button>
                    <Button
                        type="button"
                        variant={hasRecipes ? 'contained' : 'outlined'}
                        className="w-full rounded-none rounded-r-md"
                        onClick={navToGroceries}
                    >
                        Groceries
                    </Button>
                </div>
                <div className="flex justify-center">
                    <DeleteButton type="button" onClick={handleDelete}>
                        Delete Plan
                    </DeleteButton>
                </div>
            </div>
        </>
    );
}
