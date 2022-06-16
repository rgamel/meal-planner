import { useCategories, useSelectedRecipes } from 'app/hooks';
import { Checkbox, Icon, IconButton, ListItem, ListItemText } from '@mui/material';
import { startCase } from 'lodash';
import { Recipe } from 'types';
import { useCallback, useMemo } from 'react';

type RecipeListItemProps = {
    recipe: Recipe;
    editRecipe: (recipe: Recipe) => void;
};

export default function RecipeListItem({ recipe, editRecipe }: RecipeListItemProps) {
    const { selectedRecipes, handleSelectRecipe } = useSelectedRecipes();
    const { categories } = useCategories();
    const handleChange = useCallback(() => {
        handleSelectRecipe(recipe.id);
    }, [recipe.id, handleSelectRecipe]);

    const checked = useMemo(() => selectedRecipes.map((sr) => sr.id).includes(recipe.id), [selectedRecipes, recipe]);

    const onClickEdit = useCallback(() => {
        editRecipe(recipe);
    }, [editRecipe, recipe]);

    const label = startCase(recipe.name);
    const categoryLabel = categories[recipe?.categoryId || '']
        ? `${startCase(categories[recipe?.categoryId || '']?.name)} `
        : '';

    return (
        <ListItem key={recipe.name}>
            <Checkbox checked={checked} onChange={handleChange} />
            <ListItemText primary={label} secondary={categoryLabel} />
            <IconButton onClick={onClickEdit}>
                <Icon>edit</Icon>
            </IconButton>
        </ListItem>
    );
}
