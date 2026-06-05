import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Ingredient, IngredientRequest } from '../../models/ingredient';
import { IngredientService } from '../../service/ingredient.service';
import { HasRoleDirective } from '../../directives/has-role.directive';
import { ConfirmDialog } from '../../components/confirm-dialog/confirm-dialog';
import { Role } from '../../core/roles';

const CONFLICT_STATUS = 409;

@Component({
  selector: 'app-ingredient-admin',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    HasRoleDirective,
    ConfirmDialog,
  ],
  templateUrl: './ingredient-admin.html',
  styleUrl: './ingredient-admin.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientAdminPage implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly ingredientService = inject(IngredientService);

  readonly ingredients = signal<Ingredient[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly editingId = signal<number | null>(null);
  readonly deleteTarget = signal<Ingredient | null>(null);

  protected readonly adminRole = Role.admin;

  protected readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(80)]],
    defaultUnit: [''],
  });

  ngOnInit(): void {
    this.load();
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const dto: IngredientRequest = {
      name: this.form.get('name')!.value as string,
      defaultUnit: (this.form.get('defaultUnit')!.value as string) || undefined,
    };
    const id = this.editingId();
    const request = id
      ? this.ingredientService.update(id, dto)
      : this.ingredientService.create(dto);
    request.subscribe({
      next: () => {
        this.resetForm();
        this.load();
      },
      error: (err: HttpErrorResponse) => this.handleError(err),
    });
  }

  protected startEdit(ingredient: Ingredient): void {
    this.editingId.set(ingredient.id);
    this.form.setValue({ name: ingredient.name, defaultUnit: ingredient.defaultUnit ?? '' });
    this.error.set(null);
  }

  protected cancelEdit(): void {
    this.resetForm();
  }

  protected confirmDelete(): void {
    const target = this.deleteTarget();
    if (!target) {
      return;
    }
    this.ingredientService.delete(target.id).subscribe({
      next: () => {
        this.deleteTarget.set(null);
        if (this.editingId() === target.id) {
          this.resetForm();
        }
        this.load();
      },
      error: (err: HttpErrorResponse) => {
        this.deleteTarget.set(null);
        this.handleError(err);
      },
    });
  }

  private handleError(err: HttpErrorResponse): void {
    this.error.set(
      err.status === CONFLICT_STATUS ? 'Name ist bereits vergeben.' : 'Aktion fehlgeschlagen.',
    );
  }

  private resetForm(): void {
    this.editingId.set(null);
    this.form.reset({ name: '', defaultUnit: '' });
    this.error.set(null);
  }

  private load(): void {
    this.loading.set(true);
    this.ingredientService.list().subscribe({
      next: (list) => {
        this.ingredients.set(list);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Zutaten konnten nicht geladen werden.');
        this.loading.set(false);
      },
    });
  }
}
