
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail';

// REQUISITO 1: Mínimo 2 páginas
// REQUISITO 7: Rota com parâmetro (:id)
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movie/:id', component: MovieDetailComponent }, // Passa ID por rota
  { path: '**', redirectTo: '' }
];