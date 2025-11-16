
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { AnimeDetailComponent } from './pages/anime-detail/anime-detail';

// REQUISITO 1: Mínimo 2 páginas
// REQUISITO 7: Rota com parâmetro (:id)
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'anime/:id', component: AnimeDetailComponent }, // Passa ID por rota
  { path: '**', redirectTo: '' }
];