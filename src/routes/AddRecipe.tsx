import { Dialog, DialogContent, DialogTitle, Grid } from '@mui/material';
import RecipeForm from 'components/RecipeForm';
import { Dispatch, SetStateAction } from 'react';

type AddRecipeProps = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function AddRecipe({ isOpen, setIsOpen }: AddRecipeProps) {
    return (
        <Dialog fullWidth open={isOpen} onClose={() => setIsOpen(false)}>
            <Grid container direction="column">
                <Grid item xs={1}>
                    <DialogTitle sx={{ pb: 0 }}>New Recipe</DialogTitle>
                </Grid>
                <Grid item xs={11}>
                    <DialogContent>
                        <RecipeForm />
                    </DialogContent>
                </Grid>
            </Grid>
        </Dialog>
    );
}
