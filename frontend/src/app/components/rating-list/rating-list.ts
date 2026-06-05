import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Rating } from '../../models/rating';
import { RatingService } from '../../service/rating.service';
import { AuthService } from '../../service/auth.service';
import { StarRating } from '../star-rating/star-rating';

@Component({
  selector: 'app-rating-list',
  imports: [DatePipe, StarRating],
  templateUrl: './rating-list.html',
  styleUrl: './rating-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingList {
  private readonly ratingService = inject(RatingService);
  private readonly auth = inject(AuthService);

  readonly recipeId = input.required<number>();
  readonly refreshToken = input(0);

  protected readonly ratings = signal<Rating[]>([]);
  protected readonly loading = signal(true);

  constructor() {
    effect(() => {
      const id = this.recipeId();
      this.refreshToken();
      this.load(id);
    });
  }

  protected isOwn(rating: Rating): boolean {
    return rating.userId === this.auth.getUserId();
  }

  private load(recipeId: number): void {
    this.loading.set(true);
    this.ratingService.listForRecipe(recipeId).subscribe({
      next: (list) => {
        this.ratings.set(list);
        this.loading.set(false);
      },
      error: () => {
        this.ratings.set([]);
        this.loading.set(false);
      },
    });
  }
}
