import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { RecipeService } from './recipe.service';
import { environment } from '../../environments/environment';
import { Recipe, RecipeRequest } from '../models/recipe';

const BASE_URL = `${environment.apiBaseUrl}/recipes`;

function makeRecipe(id = 1): Recipe {
  return {
    id,
    title: 'Test',
    prepTimeMinutes: 5,
    cookTimeMinutes: 10,
    servings: 2,
    difficulty: 'EASY',
    authorId: 'author-1',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
    sections: [],
    ingredients: [],
    categories: [],
    ratingCount: 0,
  };
}

function makeRequest(): RecipeRequest {
  return {
    title: 'Neu',
    prepTimeMinutes: 5,
    cookTimeMinutes: 10,
    servings: 2,
    difficulty: 'MEDIUM',
    sections: [],
    ingredients: [],
    categoryIds: [],
  };
}

describe('RecipeService', () => {
  let service: RecipeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecipeService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(RecipeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('list() without filter → GET ohne Query-Params', () => {
    service.list().subscribe();
    const req = httpMock.expectOne((r) => r.url === BASE_URL);
    expect(req.request.method).toBe('GET');
    expect(req.request.params.keys().length).toBe(0);
    req.flush([]);
  });

  it('list({ title }) → setzt title-Param', () => {
    service.list({ title: 'Pasta' }).subscribe();
    const req = httpMock.expectOne((r) => r.url === BASE_URL);
    expect(req.request.params.get('title')).toBe('Pasta');
    req.flush([]);
  });

  it('list({ categoryId }) → setzt categoryId-Param', () => {
    service.list({ categoryId: 7 }).subscribe();
    const req = httpMock.expectOne((r) => r.url === BASE_URL);
    expect(req.request.params.get('categoryId')).toBe('7');
    req.flush([]);
  });

  it('list({ difficulty }) → setzt difficulty-Param', () => {
    service.list({ difficulty: 'HARD' }).subscribe();
    const req = httpMock.expectOne((r) => r.url === BASE_URL);
    expect(req.request.params.get('difficulty')).toBe('HARD');
    req.flush([]);
  });

  it('getById(id) → GET /recipes/:id', () => {
    service.getById(42).subscribe();
    const req = httpMock.expectOne(`${BASE_URL}/42`);
    expect(req.request.method).toBe('GET');
    req.flush(makeRecipe(42));
  });

  it('myRecipes() → GET /recipes/me', () => {
    service.myRecipes().subscribe();
    const req = httpMock.expectOne(`${BASE_URL}/me`);
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('create(dto) → POST /recipes mit Body', () => {
    const dto = makeRequest();
    service.create(dto).subscribe();
    const req = httpMock.expectOne(BASE_URL);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dto);
    req.flush(makeRecipe());
  });

  it('update(id, dto) → PUT /recipes/:id mit Body', () => {
    const dto = makeRequest();
    service.update(9, dto).subscribe();
    const req = httpMock.expectOne(`${BASE_URL}/9`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(dto);
    req.flush(makeRecipe(9));
  });

  it('delete(id) → DELETE /recipes/:id', () => {
    service.delete(3).subscribe();
    const req = httpMock.expectOne(`${BASE_URL}/3`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
