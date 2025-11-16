import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
    return this.http.get<MovieResponse>(
      `${this.baseUrl}/top/anime?page=${page}`
    );
  }

    getMovieDetails(id: number): Observable<Movie> {
    return this.http.get<Movie>(
      `${this.baseUrl}/anime/${id}`
    );
  }

  // REQUISITO 3: Método GET - Busca filmes por termo
  searchMovies(query: string, page: number = 1): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(
      `${this.baseUrl}/anime/q=${query}&page=${page}`
    );
  }
}