import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { RecipeListPage } from './pages/recipe-list/recipe-list';
import { RecipeDetailPage } from './pages/recipe-detail/recipe-detail';
import { RecipeFormPage } from './pages/recipe-form/recipe-form';
import { MyRecipesPage } from './pages/my-recipes/my-recipes';
import { CategoryAdminPage } from './pages/category-admin/category-admin';
import { IngredientAdminPage } from './pages/ingredient-admin/ingredient-admin';
import { ForbiddenPage } from './pages/forbidden/forbidden';
import { RoutePath } from './core/routes';
import { MANAGE_ROLES } from './core/roles';

export const routes: Routes = [
  { path: '', redirectTo: RoutePath.recipes, pathMatch: 'full' },
  { path: RoutePath.recipes, component: RecipeListPage, canActivate: [authGuard] },
  {
    path: RoutePath.recipeNew,
    component: RecipeFormPage,
    canActivate: [roleGuard],
    data: { roles: MANAGE_ROLES },
  },
  {
    path: RoutePath.recipeEdit,
    component: RecipeFormPage,
    canActivate: [roleGuard],
    data: { roles: MANAGE_ROLES },
  },
  { path: RoutePath.recipeDetail, component: RecipeDetailPage, canActivate: [authGuard] },
  {
    path: RoutePath.myRecipes,
    component: MyRecipesPage,
    canActivate: [roleGuard],
    data: { roles: MANAGE_ROLES },
  },
  {
    path: RoutePath.adminCategories,
    component: CategoryAdminPage,
    canActivate: [roleGuard],
    data: { roles: MANAGE_ROLES },
  },
  {
    path: RoutePath.adminIngredients,
    component: IngredientAdminPage,
    canActivate: [roleGuard],
    data: { roles: MANAGE_ROLES },
  },
  { path: RoutePath.forbidden, component: ForbiddenPage },
  { path: '**', redirectTo: RoutePath.recipes },
];
