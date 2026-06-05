import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { Recipe } from '../../models/recipe';
import { RecipeService, RecipeFilter } from '../../service/recipe.service';
import { RecipeCard } from '../../components/recipe-card/recipe-card';
import { RecipeFilterBar } from '../../components/recipe-filter/recipe-filter';
import { HasRoleDirective } from '../../directives/has-role.directive';
import { MANAGE_ROLES } from '../../core/roles';
import { RouteUrl } from '../../core/routes';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-recipe-list',
  imports: [RecipeCard, RecipeFilterBar, HasRoleDirective, RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeListPage implements OnInit {
  private readonly recipeService = inject(RecipeService);

  readonly recipes = signal<Recipe[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  protected readonly manageRoles = MANAGE_ROLES;
  protected readonly newRecipeUrl = RouteUrl.recipeNew;

  ngOnInit(): void {
    this.load();
  }

  protected applyFilter(filter: RecipeFilter): void {
    this.load(filter);
  }

  private load(filter: RecipeFilter = {}): void {
    this.loading.set(true);
    this.error.set(null);
    this.recipeService.list(filter).subscribe({
      next: (recipes) => {
        this.recipes.set(recipes);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Rezepte konnten nicht geladen werden.');
        this.loading.set(false);
      },
    });
  }
}
