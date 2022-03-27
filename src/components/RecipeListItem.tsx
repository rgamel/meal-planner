import { useSelectedRecipes } from 'hooks/hooks';
import { Checkbox, Icon, IconButton, ListItem, ListItemText } from '@mui/material';
import { startCase } from 'lodash';
import { Recipe } from 'types';

type RecipeListItemProps = {
    recipe: Recipe;
    editRecipe: (recipe: Recipe) => void;
};

export default function RecipeListItem({ recipe, editRecipe }: RecipeListItemProps) {
    const { selectedRecipes, handleSelectRecipe } = useSelectedRecipes();

    const handleChange = () => {
        handleSelectRecipe(recipe.id);
    };

    return (
        <ListItem key={recipe.name}>
            <Checkbox
                checked={Object.values(selectedRecipes.get())
                    .map((r: Recipe) => r.name)
                    .includes(recipe.name)}
                onChange={handleChange}
            />
            <ListItemText
                primary={startCase(recipe.name)}
                secondary={recipe.category ? `${recipe.category.name} ` : ''}
            />
            <IconButton onClick={() => editRecipe(recipe)}>
                <Icon>edit</Icon>
            </IconButton>
        </ListItem>
    );
}
