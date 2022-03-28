import { useRecipes, useSelectedRecipes } from 'hooks/hooks';
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
    const { recipes } = useRecipes();
    const handleChange = useCallback(() => {
        handleSelectRecipe(recipe.id);
    }, [recipe.id, handleSelectRecipe]);

    const checked = useMemo(
        () =>
            Object.values(selectedRecipes.get())
                .map((r: string) => recipes.nested(r).get().name)
                .includes(recipe.name),
        [selectedRecipes, recipe],
    );

    const onClickEdit = useCallback(() => {
        editRecipe(recipe);
    }, [editRecipe, recipe]);

    return (
        <ListItem key={recipe.name}>
            <Checkbox checked={checked} onChange={handleChange} />
            <ListItemText
                primary={startCase(recipe.name)}
                secondary={recipe.category ? `${recipe.category.name} ` : ''}
            />
            <IconButton onClick={onClickEdit}>
                <Icon>edit</Icon>
            </IconButton>
        </ListItem>
    );
}
