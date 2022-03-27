export type Uom = string;
export type UomList = Uom[];

export type Ingredient = string;
export type IngredientList = Ingredient[];

export type GroceryItem = { quantity: number; uom: string; item: string; isAldi: boolean; id: string };

export type Category = string;
export type CategoryList = Category[];

export type Recipe = { name: string; groceries: GroceryItem[]; category?: Category; recipeId: string };
export type RecipeList = Record<string, Recipe>;
