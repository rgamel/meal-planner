import { Dialog } from '@mui/material';
import { DialogTitle } from 'components/DialogTitle';
import IngredientInput from 'features/recipes/IngredientInput';
import Fraction from 'fraction.js';

type AddGroceryItemModalProps = {
    isGroceryDialogOpen: boolean;
    handleCloseDialog: () => void;
    handleSave: (quantity: Fraction, uomId: string, itemId: string, isAldi: boolean) => void;
};

export function AddGroceryItemModal({ isGroceryDialogOpen, handleSave, handleCloseDialog }: AddGroceryItemModalProps) {
    return (
        <Dialog open={isGroceryDialogOpen} onClose={handleCloseDialog}>
            <div className="mx-6 my-4 space-y-4">
                <DialogTitle>Add Grocery Item</DialogTitle>
                <IngredientInput commitGroceryItem={handleSave} />
            </div>
        </Dialog>
    );
}
