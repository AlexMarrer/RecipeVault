import { ChangeDetectionStrategy, Component, OnInit, computed, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { IngredientQuickAddDialog } from '../../components/ingredient-quick-add/ingredient-quick-add';
import { CategoryQuickAddDialog } from '../../components/category-quick-add/category-quick-add';
import { RecipeService } from '../../service/recipe.service';
import { CategoryService } from '../../service/category.service';
import { IngredientService } from '../../service/ingredient.service';
import { Category } from '../../models/category';
import { Ingredient } from '../../models/ingredient';
import { Recipe, RecipeRequest } from '../../models/recipe';
import { Difficulty, DIFFICULTIES, DIFFICULTY_LABEL } from '../../models/difficulty';
import { RouteUrl } from '../../core/routes';

@Component({
  selector: 'app-recipe-form',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    DragDropModule,
    IngredientQuickAddDialog,
    CategoryQuickAddDialog,
  ],
  templateUrl: './recipe-form.html',
  styleUrl: './recipe-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeFormPage implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly recipeService = inject(RecipeService);
  private readonly categoryService = inject(CategoryService);
  private readonly ingredientService = inject(IngredientService);
  private readonly router = inject(Router);

  readonly id = input<string>();

  protected readonly categories = signal<Category[]>([]);
  protected readonly ingredients = signal<Ingredient[]>([]);
  protected readonly difficulties = DIFFICULTIES;
  protected readonly difficultyLabel = DIFFICULTY_LABEL;
  protected readonly saving = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly showIngredientDialog = signal(false);
  protected readonly showCategoryDialog = signal(false);

  protected readonly isEdit = computed(() => this.id() != null);
  protected readonly cancelUrl = computed(() =>
    this.id() ? RouteUrl.recipeDetail(this.id() as string) : RouteUrl.recipes,
  );

  protected readonly form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(120)]],
    description: [''],
    prepTimeMinutes: [0, [Validators.required, Validators.min(0)]],
    cookTimeMinutes: [0, [Validators.required, Validators.min(0)]],
    servings: [1, [Validators.required, Validators.min(1)]],
    difficulty: ['EASY' as Difficulty, Validators.required],
    imageUrl: [''],
    categoryIds: [[] as number[]],
    sections: this.fb.array<FormGroup>([]),
    ingredients: this.fb.array<FormGroup>([]),
  });

  get sections(): FormArray {
    return this.form.get('sections') as FormArray;
  }

  get ingredientLines(): FormArray {
    return this.form.get('ingredients') as FormArray;
  }

  sectionSteps(index: number): FormArray {
    return this.sections.at(index).get('steps') as FormArray;
  }

  ngOnInit(): void {
    this.categoryService.list().subscribe({ next: (list) => this.categories.set(list) });
    this.ingredientService.list().subscribe({ next: (list) => this.ingredients.set(list) });

    const currentId = this.id();
    if (currentId) {
      this.recipeService.getById(Number(currentId)).subscribe({
        next: (recipe) => this.patchForm(recipe),
        error: () => this.error.set('Rezept konnte nicht geladen werden.'),
      });
    } else {
      this.addSection();
      this.addIngredient();
    }
  }

  protected addSection(): void {
    const group = this.newSectionGroup();
    (group.get('steps') as FormArray).push(this.newStepGroup());
    this.sections.push(group);
  }

  protected removeSection(index: number): void {
    this.sections.removeAt(index);
  }

  protected addStep(sectionIndex: number): void {
    this.sectionSteps(sectionIndex).push(this.newStepGroup());
  }

  protected removeStep(sectionIndex: number, stepIndex: number): void {
    this.sectionSteps(sectionIndex).removeAt(stepIndex);
  }

  protected addIngredient(): void {
    this.ingredientLines.push(this.newIngredientGroup());
  }

  protected applyDefaultUnit(lineIndex: number): void {
    const line = this.ingredientLines.at(lineIndex);
    const ingredientId = line.get('ingredientId')!.value as number | null;
    const unitControl = line.get('unit')!;
    const currentUnit = ((unitControl.value as string) ?? '').trim();
    if (ingredientId == null || currentUnit.length > 0) {
      return;
    }
    const ingredient = this.ingredients().find((item) => item.id === ingredientId);
    if (ingredient?.defaultUnit) {
      unitControl.setValue(ingredient.defaultUnit);
    }
  }

  protected removeIngredient(index: number): void {
    this.ingredientLines.removeAt(index);
  }

  protected dropIngredient(event: CdkDragDrop<unknown>): void {
    this.reorder(this.ingredientLines, event.previousIndex, event.currentIndex);
  }

  protected dropSection(event: CdkDragDrop<unknown>): void {
    this.reorder(this.sections, event.previousIndex, event.currentIndex);
  }

  protected dropStep(sectionIndex: number, event: CdkDragDrop<unknown>): void {
    this.reorder(this.sectionSteps(sectionIndex), event.previousIndex, event.currentIndex);
  }

  protected onIngredientCreated(ingredient: Ingredient): void {
    this.ingredients.update((list) =>
      [...list, ingredient].sort((a, b) => a.name.localeCompare(b.name)),
    );
    this.showIngredientDialog.set(false);
    const group = this.newIngredientGroup();
    group.patchValue({ ingredientId: ingredient.id, unit: ingredient.defaultUnit ?? '' });
    this.ingredientLines.push(group);
  }

  protected onCategoryCreated(category: Category): void {
    this.categories.update((list) =>
      [...list, category].sort((a, b) => a.name.localeCompare(b.name)),
    );
    this.showCategoryDialog.set(false);
    const control = this.form.get('categoryIds')!;
    const current = (control.value as number[]) ?? [];
    control.setValue([...current, category.id]);
  }

  private reorder(array: FormArray, previousIndex: number, currentIndex: number): void {
    if (previousIndex === currentIndex) {
      return;
    }
    moveItemInArray(array.controls, previousIndex, currentIndex);
    array.updateValueAndValidity();
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    this.error.set(null);

    const dto = this.toRequest();
    const currentId = this.id();
    const request = currentId
      ? this.recipeService.update(Number(currentId), dto)
      : this.recipeService.create(dto);

    request.subscribe({
      next: (saved) => this.router.navigateByUrl(RouteUrl.recipeDetail(saved.id)),
      error: () => {
        this.error.set('Speichern fehlgeschlagen.');
        this.saving.set(false);
      },
    });
  }

  private toRequest(): RecipeRequest {
    return {
      title: this.value<string>('title'),
      description: this.value<string>('description') || undefined,
      prepTimeMinutes: this.value<number>('prepTimeMinutes'),
      cookTimeMinutes: this.value<number>('cookTimeMinutes'),
      servings: this.value<number>('servings'),
      difficulty: this.value<Difficulty>('difficulty'),
      imageUrl: this.value<string>('imageUrl') || undefined,
      categoryIds: this.value<number[]>('categoryIds') ?? [],
      sections: this.sections.controls.map((section, sectionIndex) => ({
        title: section.get('title')!.value as string,
        sortOrder: sectionIndex,
        steps: (section.get('steps') as FormArray).controls.map((step, stepIndex) => ({
          stepNumber: stepIndex + 1,
          instruction: step.get('instruction')!.value as string,
        })),
      })),
      ingredients: this.ingredientLines.controls.map((line) => ({
        ingredientId: line.get('ingredientId')!.value as number,
        amount: line.get('amount')!.value as number,
        unit: line.get('unit')!.value as string,
      })),
    };
  }

  private value<T>(controlName: string): T {
    return this.form.get(controlName)!.value as T;
  }

  private patchForm(recipe: Recipe): void {
    this.form.patchValue({
      title: recipe.title,
      description: recipe.description ?? '',
      prepTimeMinutes: recipe.prepTimeMinutes,
      cookTimeMinutes: recipe.cookTimeMinutes,
      servings: recipe.servings,
      difficulty: recipe.difficulty,
      imageUrl: recipe.imageUrl ?? '',
      categoryIds: recipe.categories.map((category) => category.id),
    });

    this.sections.clear();
    [...recipe.sections]
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .forEach((section) => {
        const group = this.newSectionGroup(section.title);
        const steps = group.get('steps') as FormArray;
        [...section.steps]
          .sort((a, b) => a.stepNumber - b.stepNumber)
          .forEach((step) => steps.push(this.newStepGroup(step.instruction)));
        this.sections.push(group);
      });

    this.ingredientLines.clear();
    recipe.ingredients.forEach((line) => {
      const group = this.newIngredientGroup();
      group.patchValue({ ingredientId: line.ingredientId, amount: line.amount, unit: line.unit });
      this.ingredientLines.push(group);
    });
  }

  private newSectionGroup(title = ''): FormGroup {
    return this.fb.group({
      title: [title, Validators.required],
      steps: this.fb.array<FormGroup>([]),
    });
  }

  private newStepGroup(instruction = ''): FormGroup {
    return this.fb.group({ instruction: [instruction, Validators.required] });
  }

  private newIngredientGroup(): FormGroup {
    return this.fb.group({
      ingredientId: [null as number | null, Validators.required],
      amount: [1, [Validators.required, Validators.min(0.01)]],
      unit: ['', Validators.required],
    });
  }
}
