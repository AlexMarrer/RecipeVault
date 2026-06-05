import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { RecipeListPage } from './pages/recipe-list/recipe-list';
import { RecipeDetailPage } from './pages/recipe-detail/recipe-detail';
import { ForbiddenPage } from './pages/forbidden/forbidden';
import { RoutePath } from './core/routes';

export const routes: Routes = [
  { path: '', redirectTo: RoutePath.recipes, pathMatch: 'full' },
  { path: RoutePath.recipes, component: RecipeListPage, canActivate: [authGuard] },
  { path: RoutePath.recipeDetail, component: RecipeDetailPage, canActivate: [authGuard] },
  { path: RoutePath.forbidden, component: ForbiddenPage },
  { path: '**', redirectTo: RoutePath.recipes },
];
