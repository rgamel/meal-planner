import { Button, Checkbox, FormControlLabel, Grid, TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useIngredients, useUoms } from '../hooks/hooks';
import Autocomplete from './Autocomplete';

function IngredientInput({
    commitGroceryItem,
}: {
    commitGroceryItem: (quantity: number, selectedUom: string, selectedIngredient: string, isAldi: boolean) => void;
}) {
    const { ingredients, addIngredient } = useIngredients(); // TODO
    const { uoms, addUom } = useUoms(); // TODO
    const [quantity, setQuantity] = useState('');
    const [selectedIngredient, setSelectedIngredient] = useState('');
    const [selectedUom, setSelectedUom] = useState('');
    const [isAldi, setIsAldi] = useState(false);

    const handleChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
        setQuantity(e.target.value);
    };

    const handleCommitGroceryItem = () => {
        if (!quantity || !selectedUom || !selectedIngredient) return;
        commitGroceryItem(Number(quantity), selectedUom, selectedIngredient, isAldi);
        setQuantity('');
        setSelectedUom('');
        setSelectedIngredient('');
        setIsAldi(false);
    };

    const handleSetIsAldi = (e: ChangeEvent<HTMLInputElement>) => {
        setIsAldi(e.target.checked);
    };

    return (
        <Grid container spacing={1} direction="column">
            <Grid item xs={1}>
                <TextField
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
                    suggestions={uoms.get()}
                    // addItem={addUom}
                    selected={selectedUom}
                    setSelected={setSelectedUom}
                    label="UOM"
                />
            </Grid>
            <Grid item xs={1}>
                <Autocomplete
                    suggestions={ingredients.get()}
                    // addItem={addIngredient}
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
