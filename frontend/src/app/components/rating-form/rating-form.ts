import { ChangeDetectionStrategy, Component, effect, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Rating, RatingRequest } from '../../models/rating';
import { RatingService } from '../../service/rating.service';
import { AuthService } from '../../service/auth.service';
import { StarRating } from '../star-rating/star-rating';

const CONFLICT_STATUS = 409;

@Component({
  selector: 'app-rating-form',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, StarRating],
  templateUrl: './rating-form.html',
  styleUrl: './rating-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingForm {
  private readonly ratingService = inject(RatingService);
  private readonly auth = inject(AuthService);

  readonly recipeId = input.required<number>();
  readonly changed = output<void>();

  protected readonly stars = signal(0);
  protected comment = '';
  protected readonly existing = signal<Rating | null>(null);
  protected readonly message = signal<string | null>(null);

  constructor() {
    effect(() => {
      const id = this.recipeId();
      this.loadOwn(id);
    });
  }

  protected setStars(value: number): void {
    this.stars.set(value);
    this.message.set(null);
  }

  protected submit(): void {
    if (this.stars() < 1) {
      this.message.set('Bitte zuerst Sterne vergeben.');
      return;
    }
    const dto: RatingRequest = {
      recipeId: this.recipeId(),
      stars: this.stars(),
      comment: this.comment.trim() || undefined,
    };
    const own = this.existing();
    const request = own
      ? this.ratingService.update(own.id, dto)
      : this.ratingService.create(dto);

    request.subscribe({
      next: () => {
        this.message.set(null);
        this.changed.emit();
        this.loadOwn(this.recipeId());
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === CONFLICT_STATUS) {
          this.message.set('Du hast dieses Rezept bereits bewertet – Bewertung wird geladen.');
          this.loadOwn(this.recipeId());
        } else {
          this.message.set('Speichern fehlgeschlagen.');
        }
      },
    });
  }

  protected deleteOwn(): void {
    const own = this.existing();
    if (!own) {
      return;
    }
    this.ratingService.delete(own.id).subscribe({
      next: () => {
        this.existing.set(null);
        this.stars.set(0);
        this.comment = '';
        this.changed.emit();
      },
      error: () => this.message.set('Löschen fehlgeschlagen.'),
    });
  }

  private loadOwn(recipeId: number): void {
    const userId = this.auth.getUserId();
    this.ratingService.listForRecipe(recipeId).subscribe({
      next: (list) => {
        const own = list.find((rating) => rating.userId === userId) ?? null;
        this.existing.set(own);
        this.stars.set(own?.stars ?? 0);
        this.comment = own?.comment ?? '';
      },
    });
  }
}
