export type Plan = {
    name: string;
    id: string;
    recipes: string[];
    shoppedItems: string[];
};
export type PlanList = Record<string, Plan>;

export type Uom = { name: string; id: string };
export type UomList = Record<string, Uom>;

export type Ingredient = { name: string; id: string };
export type IngredientList = Record<string, Ingredient>;

export type GroceryItem = { quantity: string; uomId: keyof UomList; itemId: keyof IngredientList; isAldi: boolean };

export type Category = { name: string; id: string };
export type CategoryList = Record<string, Category>;

export type Recipe = { name: string; groceries: GroceryItem[]; categoryId?: keyof CategoryList; id: string };
export type RecipeList = Record<string, Recipe>;

export type Entity = { name: string; id: string };

export interface EntityOptionType {
    inputValue?: string;
    name: string;
    id?: string;
}
