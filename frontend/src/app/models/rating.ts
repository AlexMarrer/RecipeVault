export interface Rating {
  id: number;
  stars: number;
  comment?: string;
  userId: string;
  recipeId: number;
  createdAt: string;
}

export interface RatingRequest {
  recipeId: number;
  stars: number;
  comment?: string;
}
