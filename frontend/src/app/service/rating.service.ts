import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Rating, RatingRequest } from '../models/rating';

@Injectable({ providedIn: 'root' })
export class RatingService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/ratings`;

  list(): Observable<Rating[]> {
    return this.http.get<Rating[]>(this.baseUrl);
  }

  listForRecipe(recipeId: number): Observable<Rating[]> {
    const params = new HttpParams().set('recipeId', recipeId);
    return this.http.get<Rating[]>(this.baseUrl, { params });
  }

  myRatings(): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${this.baseUrl}/me`);
  }

  getById(id: number): Observable<Rating> {
    return this.http.get<Rating>(`${this.baseUrl}/${id}`);
  }

  create(dto: RatingRequest): Observable<Rating> {
    return this.http.post<Rating>(this.baseUrl, dto);
  }

  update(id: number, dto: RatingRequest): Observable<Rating> {
    return this.http.put<Rating>(`${this.baseUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
