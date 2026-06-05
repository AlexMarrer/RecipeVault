import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

const STAR_MAX = 5;

interface Star {
  position: number;
  filled: boolean;
}

@Component({
  selector: 'app-star-rating',
  imports: [],
  templateUrl: './star-rating.html',
  styleUrl: './star-rating.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarRating {
  readonly value = input(0);
  readonly max = input(STAR_MAX);
  readonly interactive = input(false);
  readonly valueChange = output<number>();

  protected readonly stars = computed<Star[]>(() => {
    const rounded = Math.round(this.value());
    return Array.from({ length: this.max() }, (_, index) => ({
      position: index + 1,
      filled: index + 1 <= rounded,
    }));
  });

  protected select(position: number): void {
    if (this.interactive()) {
      this.valueChange.emit(position);
    }
  }
}
