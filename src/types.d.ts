export type Uom = { name: string; id: string };
export type UomList = Record<string, Uom>;

export type Ingredient = { name: string; id: string };
export type IngredientList = Record<string, Ingredient>;

export type GroceryItem = { quantity: number; uom: Uom; item: Ingredient; isAldi: boolean };

export type Category = { name: string; id: string };
export type CategoryList = Record<string, Category>;

export type Recipe = { name: string; groceries: GroceryItem[]; category?: Category; id: string };
export type RecipeList = Record<string, Recipe>;

export type Entity = { name: string; id: string };

export interface EntityOptionType {
    inputValue?: string;
    name: string;
    id?: string;
}
