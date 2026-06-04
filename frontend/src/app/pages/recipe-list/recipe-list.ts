import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { Recipe } from '../../models/recipe';
import { RecipeService } from '../../service/recipe.service';

@Component({
  selector: 'app-recipe-list',
  imports: [],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeListPage implements OnInit {
  private readonly recipeService = inject(RecipeService);

  readonly recipes = signal<Recipe[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.recipeService.list().subscribe({
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
