import React, { useState } from 'react';
import { useIngredients, useUoms } from '../hooks/hooks';
import Autocomplete from './Autocomplete';

function IngredientInput({
    commitGroceryItem,
}: {
    commitGroceryItem: (quantity: number, selectedUom: string, selectedIngredient: string, isAldi: boolean) => void;
}) {
    const { ingredients, addIngredient } = useIngredients();
    const { uoms, addUom } = useUoms();
    const [quantity, setQuantity] = useState(0);
    const [selectedIngredient, setSelectedIngredient] = useState('');
    const [selectedUom, setSelectedUom] = useState('');
    const [isAldi, setIsAldi] = useState(false);

    const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number(e.target.value));
    };

    const handleCommitGroceryItem = () => {
        if (!quantity || !selectedUom || !selectedIngredient) return;
        commitGroceryItem(quantity, selectedUom, selectedIngredient, isAldi);
        setQuantity(0);
        setSelectedUom('');
        setSelectedIngredient('');
        setIsAldi(false);
    };

    const handleSetIsAldi = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsAldi(e.target.checked);
    };

    return (
        <div>
            <div>
                <label htmlFor="quantity">
                    Quantity
                    <input type="number" name="quantity" value={quantity} onChange={handleChangeQuantity} />
                </label>
            </div>
            <div>
                <span>
                    UOM
                    <Autocomplete
                        suggestions={uoms.get()}
                        addItem={addUom}
                        selected={selectedUom}
                        setSelected={setSelectedUom}
                    />
                </span>
            </div>
            <div>
                <span>
                    Ingredient
                    <Autocomplete
                        suggestions={ingredients.get()}
                        addItem={addIngredient}
                        selected={selectedIngredient}
                        setSelected={setSelectedIngredient}
                    />
                </span>
            </div>
            <div>
                <label htmlFor="aldi">
                    Aldi
                    <input type="checkbox" name="Aldi" id="aldi" checked={isAldi} onChange={handleSetIsAldi} />
                </label>
            </div>
            <div>
                <button type="button" onClick={handleCommitGroceryItem}>
                    Commit
                </button>
            </div>
        </div>
    );
}

export default IngredientInput;
