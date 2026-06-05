import { ChangeDetectionStrategy, Component, OnInit, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Category } from '../../models/category';
import { CategoryService } from '../../service/category.service';
import { Difficulty, DIFFICULTIES, DIFFICULTY_LABEL } from '../../models/difficulty';
import { RecipeFilter } from '../../service/recipe.service';

@Component({
  selector: 'app-recipe-filter',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './recipe-filter.html',
  styleUrl: './recipe-filter.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeFilterBar implements OnInit {
  private readonly categoryService = inject(CategoryService);

  readonly filterChange = output<RecipeFilter>();

  protected readonly categories = signal<Category[]>([]);
  protected readonly difficulties = DIFFICULTIES;
  protected readonly difficultyLabel = DIFFICULTY_LABEL;

  protected title = '';
  protected categoryId: number | null = null;
  protected difficulty: Difficulty | '' = '';

  ngOnInit(): void {
    this.categoryService.list().subscribe({
      next: (categories) => this.categories.set(categories),
    });
  }

  protected apply(): void {
    const filter: RecipeFilter = {};
    if (this.title.trim()) {
      filter.title = this.title.trim();
    }
    if (this.categoryId != null) {
      filter.categoryId = this.categoryId;
    }
    if (this.difficulty) {
      filter.difficulty = this.difficulty;
    }
    this.filterChange.emit(filter);
  }

  protected reset(): void {
    this.title = '';
    this.categoryId = null;
    this.difficulty = '';
    this.filterChange.emit({});
  }
}
