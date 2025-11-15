import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie, MovieResponse } from '../models/movie';

// REQUISITO 5: Service para alocar HttpClient
@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = '29629caff5ba774b3164f55aaa7bffe7';
  private baseUrl = 'https://api.themoviedb.org/3';

  // REQUISITO 2: Uso do HttpClient
  constructor(private http: HttpClient) {}

  // REQUISITO 3: Método GET - Busca filmes populares
  getPopularMovies(page: number = 1): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(
      `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=pt-BR&page=${page}`
    );
  }

  // REQUISITO 3: Método GET - Busca detalhes do filme
  getMovieDetails(id: number): Observable<Movie> {
    return this.http.get<Movie>(
      `${this.baseUrl}/movie/${id}?api_key=${this.apiKey}&language=pt-BR`
    );
  }

  // REQUISITO 3: Método GET - Busca filmes por termo
  searchMovies(query: string, page: number = 1): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(
      `${this.baseUrl}/search/movie?api_key=${this.apiKey}&language=pt-BR&query=${query}&page=${page}`
    );
  }
}