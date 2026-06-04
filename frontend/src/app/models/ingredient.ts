export interface Ingredient {
  id: number;
  name: string;
  defaultUnit?: string;
}

export interface IngredientRequest {
  name: string;
  defaultUnit?: string;
}
