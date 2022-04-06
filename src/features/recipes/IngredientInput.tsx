import { Button, Checkbox, FormControlLabel, Grid, TextField } from '@mui/material';
import Fraction from 'fraction.js';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { EntityOptionType } from 'types';
import { useIngredients, useUoms } from '../../app/hooks';
import Autocomplete from '../../components/Autocomplete';

function IngredientInput({
    commitGroceryItem,
}: {
    commitGroceryItem: (
        quantity: Fraction,
        selectedUomId: string,
        selectedIngredientId: string,
        isAldi: boolean,
    ) => void;
}) {
    const { ingredients, addIngredient, deleteIngredient } = useIngredients();
    const { uoms, addUom, deleteUom } = useUoms();
    const [quantity, setQuantity] = useState('');
    const [selectedIngredient, setSelectedIngredient] = useState<EntityOptionType | null>(null);
    const [selectedUom, setSelectedUom] = useState<EntityOptionType | null>(null);
    const [isAldi, setIsAldi] = useState(false);

    const handleChangeQuantity = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setQuantity(e.target.value);
    }, []);

    const validQuantity = quantity.trim().match(/^(?:\d+ )?\d+\/\d+$|^\d+$/);

    const handleCommitGroceryItem = useCallback(() => {
        if (validQuantity && selectedUom?.id && selectedIngredient?.id) {
            const fractionalQuantity = new Fraction(quantity);
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
        <Grid container spacing={1} direction="column">
            <Grid item xs={1}>
                <TextField
                    error={quantity.length > 0 && !validQuantity}
                    value={quantity}
                    onChange={handleChangeQuantity}
                    fullWidth
                    label="Quantity"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    required
                />
            </Grid>
            <Grid item xs={1}>
                <Autocomplete
                    suggestions={uomsMemo}
                    addItem={addUom}
                    deleteItem={deleteUom}
                    selected={selectedUom}
                    setSelected={setSelectedUom}
                    label="UOM"
                />
            </Grid>
            <Grid item xs={1}>
                <Autocomplete
                    suggestions={ingredientsMemo}
                    addItem={addIngredient}
                    deleteItem={deleteIngredient}
                    selected={selectedIngredient}
                    setSelected={setSelectedIngredient}
                    label="Ingredient"
                />
            </Grid>
            <Grid item xs={1}>
                <Grid
                    container
                    columns={{ xs: 4, sm: 8, md: 12 }}
                    spacing={{ xs: 2, md: 3 }}
                    sx={{ justifyContent: 'end', alignItems: 'end' }}
                >
                    <Grid item xs={3} sm={5} md={8}>
                        <FormControlLabel
                            control={<Checkbox checked={isAldi} onChange={handleSetIsAldi} />}
                            label="Available at Aldi"
                        />
                    </Grid>
                    <Grid item xs={1} sm={3} md={4}>
                        <Button onClick={handleCommitGroceryItem} variant="outlined" fullWidth disabled={false}>
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default IngredientInput;
