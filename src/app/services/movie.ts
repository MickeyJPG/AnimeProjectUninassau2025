import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { Movie, MovieResponse } from '../models/movie';

// REQUISITO 5: Service para alocar HttpClient
@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private baseUrl = 'https://api.jikan.moe/v4';

  // REQUISITO 2: Uso do HttpClient
  constructor(private http: HttpClient) {}

  // REQUISITO 3: Método GET - Busca filmes populares
  getPopularMovies(page: number = 1): Observable<MovieResponse> {
    console.log('[MovieService] getPopularMovies called', { page });
    return this.http.get<any>(
      `${this.baseUrl}/top/anime?page=${page}&sfw`
    ).pipe(
      map((apiRes) => ({ results: apiRes.data || [], pagination: apiRes.pagination } as MovieResponse)),
      tap((res) => console.log('[MovieService] getPopularMovies response(mapped)', { count: res.results?.length, page })),
      catchError((err) => {
        console.error('[MovieService] getPopularMovies error', err);
        return throwError(() => err);
      })
    );
  }

  getMovieDetails(id: number): Observable<Movie> {
    console.log('[MovieService] getMovieDetails called', { id });
    return this.http.get<any>(
      `${this.baseUrl}/anime/${id}`
    ).pipe(
      map((apiRes) => apiRes.data as Movie),
      tap((res) => console.log('[MovieService] getMovieDetails response(mapped)', { id, hasData: !!res })),
      catchError((err) => {
        console.error('[MovieService] getMovieDetails error', { id, err });
        return throwError(() => err);
      })
    );
  }

  // REQUISITO 3: Método GET - Busca filmes por termo
  searchMovies(query: string, page: number = 1): Observable<MovieResponse> {
    console.log('[MovieService] searchMovies called', { query, page });
    return this.http.get<any>(
      `${this.baseUrl}/anime?q=${encodeURIComponent(query)}&page=${page}`
    ).pipe(
      map((apiRes) => ({ results: apiRes.data || [], pagination: apiRes.pagination } as MovieResponse)),
      tap((res) => console.log('[MovieService] searchMovies response(mapped)', { query, count: res.results?.length, page })),
      catchError((err) => {
        console.error('[MovieService] searchMovies error', { query, err });
        return throwError(() => err);
      })
    );
  }
}