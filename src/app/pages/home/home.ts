import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MovieService } from '../../services/movie';
import { Movie } from '../../models/movie';
import { PosterUrlPipe } from '../../pipes/poster-url-pipe';
import { HighlightRatingDirective } from '../../directives/highlight-rating';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    PosterUrlPipe, // REQUISITO 4: Pipe personalizado
    HighlightRatingDirective // REQUISITO 6: Diretiva personalizada
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPopularMovies();
  }

  // Carrega filmes populares na inicialização
  loadPopularMovies() {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.movieService.getPopularMovies().subscribe({
      next: (response) => {
        this.movies = response.results;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erro ao carregar filmes. Tente novamente.';
        this.isLoading = false;
        console.error('Erro:', error);
      }
    });
  }

  // Busca filmes por termo
  searchMovies() {
    if (this.searchTerm.trim() === '') {
      this.loadPopularMovies();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.movieService.searchMovies(this.searchTerm).subscribe({
      next: (response) => {
        this.movies = response.results;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erro na busca. Tente novamente.';
        this.isLoading = false;
        console.error('Erro:', error);
      }
    });
  }

  // REQUISITO 7: Navega passando ID por parâmetro
  viewDetails(movieId: number) {
    this.router.navigate(['/movie', movieId]);
  }
}