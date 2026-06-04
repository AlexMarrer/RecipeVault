import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Difficulty } from '../models/difficulty';
import { Recipe, RecipeRequest } from '../models/recipe';

export interface RecipeFilter {
  title?: string;
  categoryId?: number;
  difficulty?: Difficulty;
}

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/recipes`;

  list(filter: RecipeFilter = {}): Observable<Recipe[]> {
    let params = new HttpParams();
    if (filter.title) {
      params = params.set('title', filter.title);
    }
    if (filter.categoryId != null) {
      params = params.set('categoryId', filter.categoryId);
    }
    if (filter.difficulty) {
      params = params.set('difficulty', filter.difficulty);
    }
    return this.http.get<Recipe[]>(this.baseUrl, { params });
  }

  getById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.baseUrl}/${id}`);
  }

  myRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.baseUrl}/me`);
  }

  create(dto: RecipeRequest): Observable<Recipe> {
    return this.http.post<Recipe>(this.baseUrl, dto);
  }

  update(id: number, dto: RecipeRequest): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.baseUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
