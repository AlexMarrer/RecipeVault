import { ChangeDetectionStrategy, Component, OnInit, computed, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Recipe, RecipeSection } from '../../models/recipe';
import { RecipeService } from '../../service/recipe.service';
import { AuthService } from '../../service/auth.service';
import { DIFFICULTY_LABEL } from '../../models/difficulty';
import { Role } from '../../core/roles';
import { RouteUrl } from '../../core/routes';
import { StarRating } from '../../components/star-rating/star-rating';
import { ConfirmDialog } from '../../components/confirm-dialog/confirm-dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-recipe-detail',
  imports: [RouterLink, StarRating, ConfirmDialog, MatButtonModule, MatIconModule],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeDetailPage implements OnInit {
  private readonly recipeService = inject(RecipeService);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly id = input.required<string>();

  protected readonly recipe = signal<Recipe | null>(null);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);
  protected readonly showDeleteDialog = signal(false);

  protected readonly sortedSections = computed<RecipeSection[]>(() =>
    [...(this.recipe()?.sections ?? [])]
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((section) => ({
        ...section,
        steps: [...section.steps].sort((a, b) => a.stepNumber - b.stepNumber),
      })),
  );

  protected readonly difficultyLabel = computed(() => {
    const current = this.recipe();
    return current ? DIFFICULTY_LABEL[current.difficulty] : '';
  });

  protected readonly canManage = computed(() => {
    const current = this.recipe();
    if (!current) {
      return false;
    }
    if (this.auth.hasRole(Role.admin)) {
      return true;
    }
    return this.auth.hasRole(Role.chef) && current.authorId === this.auth.getUserId();
  });

  protected readonly editUrl = computed(() => RouteUrl.recipeEdit(this.id()));

  ngOnInit(): void {
    const numericId = Number(this.id());
    if (!Number.isInteger(numericId) || numericId <= 0) {
      this.error.set('Rezept nicht gefunden.');
      this.loading.set(false);
      return;
    }
    this.recipeService.getById(numericId).subscribe({
      next: (recipe) => {
        this.recipe.set(recipe);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Rezept konnte nicht geladen werden.');
        this.loading.set(false);
      },
    });
  }

  protected confirmDelete(): void {
    const current = this.recipe();
    if (!current) {
      return;
    }
    this.recipeService.delete(current.id).subscribe({
      next: () => {
        this.router.navigateByUrl(RouteUrl.recipes);
      },
      error: () => {
        this.error.set('Rezept konnte nicht gelöscht werden.');
        this.showDeleteDialog.set(false);
      },
    });
  }
}
