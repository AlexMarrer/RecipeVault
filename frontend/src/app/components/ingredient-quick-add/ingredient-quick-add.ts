import { ChangeDetectionStrategy, Component, inject, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Ingredient, IngredientRequest } from '../../models/ingredient';
import { IngredientService } from '../../service/ingredient.service';

const CONFLICT_STATUS = 409;
const NAME_MAX = 80;
const UNIT_MAX = 20;

@Component({
  selector: 'app-ingredient-quick-add',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './ingredient-quick-add.html',
  styleUrl: './ingredient-quick-add.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientQuickAddDialog {
  private readonly fb = inject(FormBuilder);
  private readonly ingredientService = inject(IngredientService);

  readonly created = output<Ingredient>();
  readonly cancelled = output<void>();

  protected readonly saving = signal(false);
  protected readonly error = signal<string | null>(null);

  protected readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(NAME_MAX)]],
    defaultUnit: ['', [Validators.maxLength(UNIT_MAX)]],
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    this.error.set(null);

    const unit = ((this.form.get('defaultUnit')!.value as string) ?? '').trim();
    const dto: IngredientRequest = {
      name: (this.form.get('name')!.value as string).trim(),
      defaultUnit: unit.length > 0 ? unit : undefined,
    };

    this.ingredientService.create(dto).subscribe({
      next: (ingredient) => this.created.emit(ingredient),
      error: (err: HttpErrorResponse) => {
        this.error.set(
          err.status === CONFLICT_STATUS ? 'Name ist bereits vergeben.' : 'Anlegen fehlgeschlagen.',
        );
        this.saving.set(false);
      },
    });
  }
}
