import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { Anime, AnimeResponse } from '../models/anime';

// REQUISITO 5: Service para alocar HttpClient
@Injectable({
  providedIn: 'root'
})
export class AnimeService {
  private baseUrl = 'https://api.jikan.moe/v4';

  constructor(private http: HttpClient) {}

  getPopularAnimes(page: number = 1): Observable<AnimeResponse> {
    return this.http.get<any>(
      `${this.baseUrl}/top/anime?page=${page}&sfw`
    ).pipe(
      map((apiRes) => ({ results: apiRes.data || [], pagination: apiRes.pagination } as AnimeResponse)),
      tap((res) => console.log('[AnimeService] getPopularAnimes response(mapped)', { count: res.results?.length, page })),
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  getAnimeDetails(id: number): Observable<Anime> {
    return this.http.get<any>(
      `${this.baseUrl}/anime/${id}`
    ).pipe(
      map((apiRes) => apiRes.data as Anime),
      tap((res) => console.log('[AnimeService] getAnimeDetails response(mapped)', { id, hasData: !!res })),
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  searchAnimes(query: string, page: number = 1): Observable<AnimeResponse> {
    return this.http.get<any>(
      `${this.baseUrl}/anime?q=${encodeURIComponent(query)}&page=${page}`
    ).pipe(
      map((apiRes) => ({ results: apiRes.data || [], pagination: apiRes.pagination } as AnimeResponse)),
      tap((res) => console.log('[AnimeService] searchAnimes response(mapped)', { query, count: res.results?.length, page })),
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }
}