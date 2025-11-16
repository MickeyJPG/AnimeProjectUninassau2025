import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeService } from '../../services/anime';
import { Anime } from '../../models/anime';
import { PosterUrlPipe } from '../../pipes/poster-url-pipe';
import { HighlightRatingDirective } from '../../directives/highlight-rating';

@Component({
  selector: 'app-anime-detail',
  standalone: true,
  imports: [
    CommonModule, 
    PosterUrlPipe,
    HighlightRatingDirective
  ],
  templateUrl: './anime-detail.html',
  styleUrl: './anime-detail.css'
})
export class AnimeDetailComponent implements OnInit {
  anime: Anime | null = null;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private animeService: AnimeService
  ) {}

  ngOnInit() {
    // REQUISITO 7: Recebe ID por parâmetro da rota
    const animeId = this.route.snapshot.paramMap.get('id');
    console.log('[AnimeDetailComponent] ngOnInit, route param id =', animeId);
    
    if (animeId) {
      this.loadAnimeDetails(+animeId);
    }
  }

  loadAnimeDetails(id: number) {
    this.isLoading = true;
    this.errorMessage = '';

    console.log('[AnimeDetailComponent] loadAnimeDetails calling service', { id });

    this.animeService.getAnimeDetails(id).subscribe({
      next: (anime) => {
        console.log('[AnimeDetailComponent] loadAnimeDetails response', { id, anime });
        this.anime = anime;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erro ao carregar detalhes do filme.';
        this.isLoading = false;
        console.error('[AnimeDetailComponent] loadAnimeDetails error', { id, error });
      }
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}