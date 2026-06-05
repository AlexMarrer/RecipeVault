import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Recipe } from '../../models/recipe';
import { RecipeService } from '../../service/recipe.service';
import { StarRating } from '../../components/star-rating/star-rating';
import { ConfirmDialog } from '../../components/confirm-dialog/confirm-dialog';
import { RouteUrl } from '../../core/routes';

@Component({
  selector: 'app-my-recipes',
  imports: [RouterLink, MatButtonModule, MatIconModule, StarRating, ConfirmDialog],
  templateUrl: './my-recipes.html',
  styleUrl: './my-recipes.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyRecipesPage implements OnInit {
  private readonly recipeService = inject(RecipeService);

  readonly recipes = signal<Recipe[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly deleteTarget = signal<Recipe | null>(null);

  protected readonly newRecipeUrl = RouteUrl.recipeNew;

  ngOnInit(): void {
    this.load();
  }

  protected detailUrl(id: number): string {
    return RouteUrl.recipeDetail(id);
  }

  protected editUrl(id: number): string {
    return RouteUrl.recipeEdit(id);
  }

  protected confirmDelete(): void {
    const target = this.deleteTarget();
    if (!target) {
      return;
    }
    this.recipeService.delete(target.id).subscribe({
      next: () => {
        this.deleteTarget.set(null);
        this.load();
      },
      error: () => {
        this.error.set('Löschen fehlgeschlagen.');
        this.deleteTarget.set(null);
      },
    });
  }

  private load(): void {
    this.loading.set(true);
    this.error.set(null);
    this.recipeService.myRecipes().subscribe({
      next: (recipes) => {
        this.recipes.set(recipes);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Deine Rezepte konnten nicht geladen werden.');
        this.loading.set(false);
      },
    });
  }
}
