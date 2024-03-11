import { Button, DialogActions, Icon, IconButton, TextField, Typography } from '@mui/material';
import { usePlans } from 'app/hooks';
import { PageTitle } from 'components/PageTitle';
import { titleCase } from 'helpers';
import { isEmpty, noop } from 'lodash/fp';
import { useConfirm } from 'material-ui-confirm';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PlanItem } from './PlanItem';

const DEFAULT_BUTTON_STYLES =
    'mb-2 w-full bg-blue-700 px-5 py-4 text-md font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300';

const ALTERNATIVE_BUTTON_STYLES =
    'py-4 px-5 mb-2 text-md font-medium text-gray-900 focus:outline-none bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100';

export default function Plan(): JSX.Element {
    const planId = useParams().id as string;
    const { plans, setSelectedPlanId, deletePlan, updatePlan } = usePlans();
    const nav = useNavigate();
    const confirm = useConfirm();

    const plan = plans[planId];

    const [editingName, setEditingName] = useState(false);
    const [planName, setPlanName] = useState(titleCase(plan?.name));

    const currentRecipes = plan?.recipes || [];

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

    const navToRecipes = useCallback(() => {
        setSelectedPlanId(planId);
        nav('/recipes');
    }, [planId]);

    const navToGroceries = useCallback(() => {
        setSelectedPlanId(planId);
        nav('/groceries');
    }, [planId]);

    return (
        <div>
            <div className="align-center flex flex-row justify-center">
                <IconButton
                    sx={{ position: 'absolute', left: 0, top: 68 }} // ew, David TODO: don't do this
                    onClick={() => {
                        nav('/plans');
                    }}
                >
                    <Icon>arrow_back</Icon>
                </IconButton>
                {editingName ? (
                    <>
                        <TextField
                            onChange={(e: { target: { value: string } }) => setPlanName(e.target.value)}
                            value={planName}
                        />
                        <Button
                            onClick={() => {
                                updatePlan({ ...plan, name: planName });
                                setEditingName(false);
                            }}
                        >
                            Save
                        </Button>
                    </>
                ) : (
                    <>
                        <PageTitle label={planName} />
                        <IconButton
                            sx={{ pb: 0, mb: -1 }}
                            onClick={() => {
                                setEditingName(true);
                            }}
                        >
                            <Icon>edit</Icon>
                        </IconButton>
                    </>
                )}
            </div>
            {!isEmpty(currentRecipes) ? (
                <div className="m-4">
                    <ul className="w-full divide-y divide-gray-200 rounded-xl border-2 border-gray-200 bg-white">
                        {currentRecipes.map((recipeWithQuantity: { id: string; quantity: string }) => (
                            <PlanItem
                                recipeWithQuantity={recipeWithQuantity}
                                key={recipeWithQuantity.id}
                                planId={planId}
                            />
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="my-20 flex justify-center text-lg">
                    <p>No recipes found for this plan. Add some?</p>
                </div>
            )}
            <div className="m-4 flex">
                <button
                    type="button"
                    className={`${isEmpty(currentRecipes) ? DEFAULT_BUTTON_STYLES : ALTERNATIVE_BUTTON_STYLES} rounded-l-lg`}
                    onClick={navToRecipes}
                >
                    Recipes
                </button>
                <button
                    type="button"
                    className={`${!isEmpty(currentRecipes) ? DEFAULT_BUTTON_STYLES : ALTERNATIVE_BUTTON_STYLES} rounded-r-lg`}
                    onClick={navToGroceries}
                >
                    Groceries
                </button>
            </div>
            <div className="flex justify-center">
                <button
                    type="button"
                    className="mb-8 rounded-lg text-center text-sm font-medium text-red-700 underline"
                    onClick={handleDelete}
                >
                    Delete Plan
                </button>
            </div>
        </div>
    );
}
