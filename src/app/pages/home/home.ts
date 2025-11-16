import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimeService } from '../../services/anime';
import { Anime } from '../../models/anime';
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
  animes: Anime[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private animeService: AnimeService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('[HomeComponent] ngOnInit');
    this.loadPopularAnimes();
  }

  // Carrega animes populares na inicialização
  loadPopularAnimes() {
    this.isLoading = true;
    this.errorMessage = '';
    console.log('[HomeComponent] loadPopularAnimes -> calling service');

    this.animeService.getPopularAnimes().subscribe({
      next: (response) => {
        console.log('[HomeComponent] loadPopularAnimes response', { results: response.results?.length });
        this.animes = response.results;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erro ao carregar animes. Tente novamente.';
        this.isLoading = false;
        console.error('[HomeComponent] loadPopularAnimes error', error);
      }
    });
  }

  // Busca animes por termo
  searchAnimes() {
    if (this.searchTerm.trim() === '') {
      console.log('[HomeComponent] searchAnimes empty term - loading popular');
      this.loadPopularAnimes();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    console.log('[HomeComponent] searchAnimes -> calling service', { term: this.searchTerm });

    this.animeService.searchAnimes(this.searchTerm).subscribe({
      next: (response) => {
        console.log('[HomeComponent] searchAnimes response', { term: this.searchTerm, results: response.results?.length });
        this.animes = response.results;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erro na busca. Tente novamente.';
        this.isLoading = false;
        console.error('[HomeComponent] searchAnimes error', error);
      }
    });
  }

  // REQUISITO 7: Navega passando ID por parâmetro
  viewDetails(animeId: number) {
    console.log('[HomeComponent] viewDetails', { animeId });
    this.router.navigate(['/anime', animeId]);
  }
}