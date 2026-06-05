export const RoutePath = {
  recipes: 'recipes',
  recipeDetail: 'recipes/:id',
  recipeNew: 'recipes/new',
  recipeEdit: 'recipes/:id/edit',
  forbidden: '403',
} as const;

export const RouteUrl = {
  recipes: `/${RoutePath.recipes}`,
  recipeDetail: (id: number | string) => `/${RoutePath.recipes}/${id}`,
  recipeNew: `/${RoutePath.recipeNew}`,
  recipeEdit: (id: number | string) => `/${RoutePath.recipes}/${id}/edit`,
  forbidden: `/${RoutePath.forbidden}`,
} as const;
