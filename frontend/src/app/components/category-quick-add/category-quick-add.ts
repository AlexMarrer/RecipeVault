import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Category, CategoryRequest } from '../../models/category';
import { CategoryService } from '../../service/category.service';

const CONFLICT_STATUS = 409;
const NAME_MAX = 80;

@Component({
  selector: 'app-category-quick-add',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './category-quick-add.html',
  styleUrl: './category-quick-add.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryQuickAddDialog {
  private readonly fb = inject(FormBuilder);
  private readonly categoryService = inject(CategoryService);

  readonly created = output<Category>();
  readonly cancelled = output<void>();

  protected readonly saving = signal(false);
  protected readonly error = signal<string | null>(null);

  protected readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(NAME_MAX)]],
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    this.error.set(null);

    const dto: CategoryRequest = { name: (this.form.get('name')!.value as string).trim() };

    this.categoryService.create(dto).subscribe({
      next: (category) => this.created.emit(category),
      error: (err: HttpErrorResponse) => {
        this.error.set(
          err.status === CONFLICT_STATUS ? 'Name ist bereits vergeben.' : 'Anlegen fehlgeschlagen.',
        );
        this.saving.set(false);
      },
    });
  }
}
