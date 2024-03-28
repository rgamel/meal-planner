import { TextField } from '@mui/material';
import { Button } from 'components/Button';
import Fraction from 'fraction.js';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { EntityOptionType } from 'types';
import { useIngredients, useUoms } from '../../app/hooks';
import Autocomplete from '../../components/Autocomplete';

interface IngredientInputProps {
    commitGroceryItem: (
        quantity: Fraction,
        selectedUomId: string,
        selectedIngredientId: string,
        isAldi: boolean,
    ) => void;
}

function IngredientInput({ commitGroceryItem }: IngredientInputProps) {
    const { ingredients, addIngredient, deleteIngredient } = useIngredients();
    const { uoms, addUom, deleteUom } = useUoms();
    const [quantity, setQuantity] = useState('');
    const [selectedIngredient, setSelectedIngredient] = useState<EntityOptionType | null>(null);
    const [selectedUom, setSelectedUom] = useState<EntityOptionType | null>(null);
    const [isAldi, setIsAldi] = useState(false);

    const handleChangeQuantity = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setQuantity(e.target.value);
    }, []);

    const validQuantity = quantity.trim().match(/^(?:\d+)?\d+\/\d+$|^\d+$/);
    const enableSave = Boolean(validQuantity && selectedUom?.id && selectedIngredient?.id);

    const handleCommitGroceryItem = useCallback(() => {
        if (validQuantity && selectedUom?.id && selectedIngredient?.id) {
            const fractionalQuantity = new Fraction(quantity.trim());
            commitGroceryItem(fractionalQuantity, selectedUom.id, selectedIngredient.id, isAldi);
            setQuantity('');
            setSelectedUom(null);
            setSelectedIngredient(null);
            setIsAldi(false);
        }
    }, [commitGroceryItem, isAldi, quantity, validQuantity, selectedIngredient, selectedUom]);

    const handleSetIsAldi = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setIsAldi(e.target.checked);
    }, []);

    const uomsMemo = useMemo(() => Object.values(uoms), [uoms]);
    const ingredientsMemo = useMemo(() => Object.values(ingredients), [ingredients]);

    return (
        <div className="space-y-2">
            <TextField
                error={quantity.length > 0 && !validQuantity}
                value={quantity}
                onChange={handleChangeQuantity}
                fullWidth
                label="Quantity"
                required
            />
            <Autocomplete
                suggestions={uomsMemo}
                addItem={addUom}
                deleteItem={deleteUom}
                selected={selectedUom}
                setSelected={setSelectedUom}
                label="UOM"
            />
            <Autocomplete
                suggestions={ingredientsMemo}
                addItem={addIngredient}
                deleteItem={deleteIngredient}
                selected={selectedIngredient}
                setSelected={setSelectedIngredient}
                label="Ingredient"
            />
            <div className="ml-2 mt-2">
                <div className="flex flex-row items-center justify-between">
                    <span className="mb-2">
                        <input
                            type="checkbox"
                            name="is-aldi"
                            id="is-aldi"
                            checked={isAldi}
                            onChange={handleSetIsAldi}
                        />
                        <label className="ml-2" htmlFor="is-aldi">
                            Available at Aldi
                        </label>
                    </span>
                    <Button onClick={handleCommitGroceryItem} variant="text" disabled={!enableSave}>
                        Add
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default IngredientInput;
