import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie';
import { Movie } from '../../models/movie';
import { PosterUrlPipe } from '../../pipes/poster-url-pipe';
import { HighlightRatingDirective } from '../../directives/highlight-rating';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [
    CommonModule, 
    PosterUrlPipe,
    HighlightRatingDirective
  ],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.css'
})
export class MovieDetailComponent implements OnInit {
  movie: Movie | null = null;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    // REQUISITO 7: Recebe ID por parâmetro da rota
    const movieId = this.route.snapshot.paramMap.get('id');
    
    if (movieId) {
      this.loadMovieDetails(+movieId);
    }
  }

  loadMovieDetails(id: number) {
    this.isLoading = true;
    this.errorMessage = '';

    this.movieService.getMovieDetails(id).subscribe({
      next: (movie) => {
        this.movie = movie;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erro ao carregar detalhes do filme.';
        this.isLoading = false;
        console.error('Erro:', error);
      }
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}