export const RoutePath = {
  recipes: 'recipes',
  forbidden: '403',
} as const;

export const RouteUrl = {
  recipes: `/${RoutePath.recipes}`,
  forbidden: `/${RoutePath.forbidden}`,
} as const;
