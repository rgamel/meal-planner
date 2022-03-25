import RecipeListItem from '../components/RecipeListItem';
import { useRecipes } from '../hooks/hooks';

function Recipes() {
    const { recipes } = useRecipes();
    return (
        <>
            <h1>Recipes:</h1>
            <ul>
                {recipes.map((r) => (
                    <RecipeListItem recipe={r} />
                ))}
            </ul>
        </>
    );
}

export default Recipes;
