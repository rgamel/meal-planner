import { Recipe } from 'components/RecipeForm';
import RecipeListItem from '../components/RecipeListItem';
import { useRecipes } from '../hooks/hooks';

function Recipes() {
    const { recipes } = useRecipes();
    const editRecipe = (recipe: Recipe) => {
        console.log('editing:\t', JSON.stringify(recipe));
    };
    return (
        <>
            <h1>Recipes:</h1>
            <ul>
                {Object.values(recipes.get()).map((r) => (
                    <RecipeListItem key={r.recipeId} recipe={r} editRecipe={editRecipe} />
                ))}
            </ul>
        </>
    );
}

export default Recipes;
