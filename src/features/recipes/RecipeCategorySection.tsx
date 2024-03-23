import { useCategories } from 'app/hooks';
import { titleCase } from 'helpers';
import { Recipe } from 'types';
import RecipeListItem from './RecipeListItem';

type RecipeSectionProps = {
    recipes: Recipe[];
    categoryId: string;
    editRecipe: (recipe: Recipe) => void;
};
export function RecipeCategorySection({ recipes, editRecipe, categoryId }: RecipeSectionProps) {
    const { categories } = useCategories();
    const label = titleCase(categories[categoryId]?.name);
    return (
        <div className="py-4">
            <h2 className="flex text-2xl font-medium text-gray-700">{label}</h2>
            <ul>
                {recipes.map((r) => (
                    <RecipeListItem key={r.id} recipe={r} editRecipe={editRecipe} />
                ))}
            </ul>
        </div>
    );
}
