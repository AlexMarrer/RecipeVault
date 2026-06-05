import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { FormArray, FormGroup } from '@angular/forms';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { RecipeFormPage } from './recipe-form';
import { RecipeService } from '../../service/recipe.service';
import { CategoryService } from '../../service/category.service';
import { IngredientService } from '../../service/ingredient.service';
import { Recipe } from '../../models/recipe';
import { Ingredient } from '../../models/ingredient';
import { Category } from '../../models/category';

interface Testable {
  ngOnInit(): void;
  form: FormGroup;
  sections: FormArray;
  ingredientLines: FormArray;
  sectionSteps(index: number): FormArray;
  ingredients: () => Ingredient[];
  categories: () => Category[];
  addSection(): void;
  removeSection(index: number): void;
  addStep(sectionIndex: number): void;
  removeStep(sectionIndex: number, stepIndex: number): void;
  addIngredient(): void;
  removeIngredient(index: number): void;
  applyDefaultUnit(index: number): void;
  onIngredientCreated(ingredient: Ingredient): void;
  onCategoryCreated(category: Category): void;
  dropIngredient(event: CdkDragDrop<unknown>): void;
  dropSection(event: CdkDragDrop<unknown>): void;
  dropStep(sectionIndex: number, event: CdkDragDrop<unknown>): void;
  submit(): void;
}

const INGREDIENTS: Ingredient[] = [
  { id: 1, name: 'Mehl', defaultUnit: 'g' },
  { id: 2, name: 'Salz' },
];
const CATEGORIES: Category[] = [{ id: 10, name: 'Hauptgang' }];

function existingRecipe(): Recipe {
  return {
    id: 5,
    title: 'Bestehend',
    prepTimeMinutes: 5,
    cookTimeMinutes: 10,
    servings: 2,
    difficulty: 'MEDIUM',
    authorId: 'a',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
    sections: [
      { id: 1, title: 'Vorbereitung', sortOrder: 0, steps: [{ id: 1, stepNumber: 1, instruction: 'Mischen' }] },
    ],
    ingredients: [{ id: 1, ingredientId: 1, ingredientName: 'Mehl', amount: 100, unit: 'g' }],
    categories: [{ id: 10, name: 'Hauptgang' }],
    ratingCount: 0,
  };
}

const recipeServiceMock = {
  getById: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
};
const categoryServiceMock = { list: vi.fn(() => of(CATEGORIES)) };
const ingredientServiceMock = { list: vi.fn(() => of(INGREDIENTS)) };

function fillValidForm(c: Testable): void {
  c.form.patchValue({
    title: 'Pasta',
    prepTimeMinutes: 5,
    cookTimeMinutes: 10,
    servings: 2,
    difficulty: 'EASY',
  });
  c.sections.at(0).get('title')!.setValue('Vorbereitung');
  c.sectionSteps(0).at(0).get('instruction')!.setValue('Mischen');
  c.ingredientLines.at(0).patchValue({ ingredientId: 1, amount: 100, unit: 'g' });
}

describe('RecipeFormPage', () => {
  let fixture: ComponentFixture<RecipeFormPage>;
  let c: Testable;
  let navSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.clearAllMocks();
    categoryServiceMock.list.mockReturnValue(of(CATEGORIES));
    ingredientServiceMock.list.mockReturnValue(of(INGREDIENTS));

    TestBed.configureTestingModule({
      imports: [RecipeFormPage],
      providers: [
        provideRouter([]),
        provideNoopAnimations(),
        { provide: RecipeService, useValue: recipeServiceMock },
        { provide: CategoryService, useValue: categoryServiceMock },
        { provide: IngredientService, useValue: ingredientServiceMock },
      ],
    });
    fixture = TestBed.createComponent(RecipeFormPage);
    c = fixture.componentInstance as unknown as Testable;
    navSpy = vi.spyOn(TestBed.inject(Router), 'navigateByUrl').mockResolvedValue(true);
  });

  it('ngOnInit (Create) lädt Stammdaten und legt eine Start-Sektion + Zutat an', () => {
    c.ngOnInit();
    expect(c.ingredients()).toEqual(INGREDIENTS);
    expect(c.categories()).toEqual(CATEGORIES);
    expect(c.sections.length).toBe(1);
    expect(c.sectionSteps(0).length).toBe(1);
    expect(c.ingredientLines.length).toBe(1);
  });

  it('Sektion/Schritt/Zutat add + remove', () => {
    c.ngOnInit();
    c.addSection();
    expect(c.sections.length).toBe(2);
    c.removeSection(1);
    expect(c.sections.length).toBe(1);

    c.addStep(0);
    expect(c.sectionSteps(0).length).toBe(2);
    c.removeStep(0, 1);
    expect(c.sectionSteps(0).length).toBe(1);

    c.addIngredient();
    expect(c.ingredientLines.length).toBe(2);
    c.removeIngredient(1);
    expect(c.ingredientLines.length).toBe(1);
  });

  it('Drag&Drop: dropSection ändert die Reihenfolge der Controls', () => {
    c.ngOnInit();
    c.addSection();
    c.sections.at(0).get('title')!.setValue('A');
    c.sections.at(1).get('title')!.setValue('B');
    c.dropSection({ previousIndex: 0, currentIndex: 1 } as CdkDragDrop<unknown>);
    expect(c.sections.at(0).get('title')!.value).toBe('B');
    expect(c.sections.at(1).get('title')!.value).toBe('A');
  });

  it('Drag&Drop: dropStep und dropIngredient ändern die Reihenfolge', () => {
    c.ngOnInit();
    c.addStep(0);
    c.sectionSteps(0).at(0).get('instruction')!.setValue('s1');
    c.sectionSteps(0).at(1).get('instruction')!.setValue('s2');
    c.dropStep(0, { previousIndex: 0, currentIndex: 1 } as CdkDragDrop<unknown>);
    expect(c.sectionSteps(0).at(0).get('instruction')!.value).toBe('s2');

    c.addIngredient();
    c.ingredientLines.at(0).get('unit')!.setValue('g');
    c.ingredientLines.at(1).get('unit')!.setValue('ml');
    c.dropIngredient({ previousIndex: 0, currentIndex: 1 } as CdkDragDrop<unknown>);
    expect(c.ingredientLines.at(0).get('unit')!.value).toBe('ml');
  });

  it('applyDefaultUnit füllt leere Einheit, überschreibt aber nichts', () => {
    c.ngOnInit();
    const line = c.ingredientLines.at(0);
    line.get('ingredientId')!.setValue(1);
    c.applyDefaultUnit(0);
    expect(line.get('unit')!.value).toBe('g');

    line.get('unit')!.setValue('kg');
    line.get('ingredientId')!.setValue(2);
    c.applyDefaultUnit(0);
    expect(line.get('unit')!.value).toBe('kg');
  });

  it('applyDefaultUnit lässt Einheit leer, wenn Zutat keine Default-Einheit hat', () => {
    c.ngOnInit();
    const line = c.ingredientLines.at(0);
    line.get('ingredientId')!.setValue(2);
    c.applyDefaultUnit(0);
    expect(line.get('unit')!.value).toBe('');
  });

  it('onIngredientCreated fügt Zutat hinzu und legt vorausgewählte Zeile an', () => {
    c.ngOnInit();
    const before = c.ingredientLines.length;
    c.onIngredientCreated({ id: 99, name: 'Zucker', defaultUnit: 'TL' });
    expect(c.ingredients().some((i) => i.id === 99)).toBe(true);
    expect(c.ingredientLines.length).toBe(before + 1);
    const last = c.ingredientLines.at(c.ingredientLines.length - 1);
    expect(last.get('ingredientId')!.value).toBe(99);
    expect(last.get('unit')!.value).toBe('TL');
  });

  it('onCategoryCreated fügt Kategorie hinzu und wählt sie aus', () => {
    c.ngOnInit();
    c.onCategoryCreated({ id: 50, name: 'Dessert' });
    expect(c.categories().some((cat) => cat.id === 50)).toBe(true);
    expect((c.form.get('categoryIds')!.value as number[]).includes(50)).toBe(true);
  });

  it('submit (Create) ruft create mit korrektem DTO und navigiert', () => {
    recipeServiceMock.create.mockReturnValue(of(existingRecipe()));
    c.ngOnInit();
    fillValidForm(c);
    c.submit();
    expect(recipeServiceMock.create).toHaveBeenCalledTimes(1);
    const dto = recipeServiceMock.create.mock.calls[0][0];
    expect(dto.title).toBe('Pasta');
    expect(dto.sections[0].sortOrder).toBe(0);
    expect(dto.sections[0].steps[0].stepNumber).toBe(1);
    expect(dto.ingredients[0].ingredientId).toBe(1);
    expect(navSpy).toHaveBeenCalled();
  });

  it('submit bricht bei ungültigem Formular ab (kein create)', () => {
    c.ngOnInit();
    c.submit();
    expect(recipeServiceMock.create).not.toHaveBeenCalled();
  });

  it('Edit-Modus: ngOnInit befüllt Formular, submit ruft update', () => {
    recipeServiceMock.getById.mockReturnValue(of(existingRecipe()));
    recipeServiceMock.update.mockReturnValue(of(existingRecipe()));
    fixture.componentRef.setInput('id', '5');
    c.ngOnInit();
    expect(c.form.get('title')!.value).toBe('Bestehend');
    expect(c.sections.length).toBe(1);
    expect(c.ingredientLines.length).toBe(1);
    c.submit();
    expect(recipeServiceMock.update).toHaveBeenCalledTimes(1);
    expect(recipeServiceMock.update.mock.calls[0][0]).toBe(5);
  });
});
