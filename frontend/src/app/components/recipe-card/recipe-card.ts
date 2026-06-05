import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Recipe } from '../../models/recipe';
import { DIFFICULTY_LABEL } from '../../models/difficulty';
import { RouteUrl } from '../../core/routes';
import { StarRating } from '../star-rating/star-rating';

@Component({
  selector: 'app-recipe-card',
  imports: [RouterLink, StarRating],
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeCard {
  readonly recipe = input.required<Recipe>();

  protected readonly detailUrl = computed(() => RouteUrl.recipeDetail(this.recipe().id));
  protected readonly difficultyLabel = computed(() => DIFFICULTY_LABEL[this.recipe().difficulty]);
}
