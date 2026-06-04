import { Difficulty } from './difficulty';

export interface RecipeStep {
  id: number;
  stepNumber: number;
  instruction: string;
}

export interface RecipeSection {
  id: number;
  title: string;
  sortOrder: number;
  steps: RecipeStep[];
}

export interface IngredientLine {
  id: number;
  ingredientId: number;
  ingredientName: string;
  amount: number;
  unit: string;
}

export interface CategoryRef {
  id: number;
  name: string;
}

export interface Recipe {
  id: number;
  title: string;
  description?: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: Difficulty;
  imageUrl?: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  sections: RecipeSection[];
  ingredients: IngredientLine[];
  categories: CategoryRef[];
  averageRating?: number;
  ratingCount: number;
}

export interface StepRequest {
  stepNumber: number;
  instruction: string;
}

export interface SectionRequest {
  title: string;
  sortOrder: number;
  steps: StepRequest[];
}

export interface IngredientLineRequest {
  ingredientId: number;
  amount: number;
  unit: string;
}

export interface RecipeRequest {
  title: string;
  description?: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: Difficulty;
  imageUrl?: string;
  sections: SectionRequest[];
  ingredients: IngredientLineRequest[];
  categoryIds?: number[];
}
