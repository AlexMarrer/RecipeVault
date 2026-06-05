export const RoutePath = {
  recipes: 'recipes',
  recipeNew: 'recipes/new',
  recipeDetail: 'recipes/:id',
  recipeEdit: 'recipes/:id/edit',
  myRecipes: 'my-recipes',
  adminCategories: 'admin/categories',
  adminIngredients: 'admin/ingredients',
  forbidden: '403',
} as const;

export const RouteUrl = {
  recipes: `/${RoutePath.recipes}`,
  recipeNew: `/${RoutePath.recipeNew}`,
  recipeDetail: (id: number | string) => `/${RoutePath.recipes}/${id}`,
  recipeEdit: (id: number | string) => `/${RoutePath.recipes}/${id}/edit`,
  myRecipes: `/${RoutePath.myRecipes}`,
  adminCategories: `/${RoutePath.adminCategories}`,
  adminIngredients: `/${RoutePath.adminIngredients}`,
  forbidden: `/${RoutePath.forbidden}`,
} as const;
