import React, { useState } from 'react';
import { useIngredients, useUoms } from '../hooks/hooks';
import Autocomplete from "./Autocomplete";

const IngredientInput = ({ commitGroceryItem }: { commitGroceryItem: (quantity: number, selectedUom: string, selectedIngredient: string, isAldi: boolean) => void }) => {
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
                <label htmlFor="">Quantity</label>
                <input type="number" name="quantity" value={quantity} onChange={handleChangeQuantity} />
            </div>
            <div>
                <label htmlFor="">UOM</label>
                <Autocomplete suggestions={uoms} addItem={addUom} selected={selectedUom} setSelected={setSelectedUom} />
            </div>
            <label htmlFor="">Ingredient</label>
            <div>
                <Autocomplete
                    suggestions={ingredients}
                    addItem={addIngredient}
                    selected={selectedIngredient}
                    setSelected={setSelectedIngredient} />
            </div>
            <div>
                <label htmlFor="">Aldi</label>
                <input type="checkbox" name="Aldi" id="aldi" checked={isAldi} onChange={handleSetIsAldi} /></div>
            <div>
                <button type="button" onClick={handleCommitGroceryItem}>Commit</button>
            </div>
        </div>
    );
};

export default IngredientInput;
