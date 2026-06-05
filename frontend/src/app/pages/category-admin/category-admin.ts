import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Category, CategoryRequest } from '../../models/category';
import { CategoryService } from '../../service/category.service';
import { HasRoleDirective } from '../../directives/has-role.directive';
import { ConfirmDialog } from '../../components/confirm-dialog/confirm-dialog';
import { Role } from '../../core/roles';

const CONFLICT_STATUS = 409;

@Component({
  selector: 'app-category-admin',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    HasRoleDirective,
    ConfirmDialog,
  ],
  templateUrl: './category-admin.html',
  styleUrl: './category-admin.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryAdminPage implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly categoryService = inject(CategoryService);

  readonly categories = signal<Category[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly editingId = signal<number | null>(null);
  readonly deleteTarget = signal<Category | null>(null);

  protected readonly adminRole = Role.admin;

  protected readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(80)]],
  });

  ngOnInit(): void {
    this.load();
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const dto: CategoryRequest = { name: this.form.get('name')!.value as string };
    const id = this.editingId();
    const request = id ? this.categoryService.update(id, dto) : this.categoryService.create(dto);
    request.subscribe({
      next: () => {
        this.resetForm();
        this.load();
      },
      error: (err: HttpErrorResponse) => this.handleError(err),
    });
  }

  protected startEdit(category: Category): void {
    this.editingId.set(category.id);
    this.form.setValue({ name: category.name });
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
    this.categoryService.delete(target.id).subscribe({
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
    this.form.reset({ name: '' });
    this.error.set(null);
  }

  private load(): void {
    this.loading.set(true);
    this.categoryService.list().subscribe({
      next: (list) => {
        this.categories.set(list);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Kategorien konnten nicht geladen werden.');
        this.loading.set(false);
      },
    });
  }
}
