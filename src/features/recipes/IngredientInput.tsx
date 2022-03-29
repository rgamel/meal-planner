import { Button, Checkbox, FormControlLabel, Grid, TextField } from '@mui/material';
import { ChangeEvent, useMemo, useState } from 'react';
import { EntityOptionType, Ingredient, Uom } from 'types';
import { useIngredients, useUoms } from '../../app/hooks';
import Autocomplete from '../../components/Autocomplete';

function IngredientInput({
    commitGroceryItem,
}: {
    commitGroceryItem: (quantity: number, selectedUom: Uom, selectedIngredient: Ingredient, isAldi: boolean) => void;
}) {
    const { ingredients, addIngredient, deleteIngredient } = useIngredients();
    const { uoms, addUom, deleteUom } = useUoms();
    const [quantity, setQuantity] = useState('');
    const [selectedIngredient, setSelectedIngredient] = useState<EntityOptionType | null>(null);
    const [selectedUom, setSelectedUom] = useState<EntityOptionType | null>(null);
    const [isAldi, setIsAldi] = useState(false);

    const handleChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
        setQuantity(e.target.value);
    };

    const handleCommitGroceryItem = () => {
        if (quantity && selectedUom?.id && selectedIngredient?.id) {
            commitGroceryItem(Number(quantity), selectedUom as Uom, selectedIngredient as Ingredient, isAldi);
            setQuantity('');
            setSelectedUom(null);
            setSelectedIngredient(null);
            setIsAldi(false);
        }
    };

    const handleSetIsAldi = (e: ChangeEvent<HTMLInputElement>) => {
        setIsAldi(e.target.checked);
    };

    const uomsMemo = useMemo(() => Object.values(uoms), [uoms]);
    const ingredientsMemo = useMemo(() => Object.values(ingredients), [ingredients]);

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