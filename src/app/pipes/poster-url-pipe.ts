import { Pipe, PipeTransform } from '@angular/core';

// REQUISITO 4: Pipe PERSONALIZADO - Transforma caminho do poster em URL completa
@Pipe({
  name: 'posterUrl',
  standalone: true
})
export class PosterUrlPipe implements PipeTransform {
  private baseImageUrl = 'https://image.tmdb.org/t/p/w500';
  private placeholderImage = 'https://via.placeholder.com/500x750/1f2937/ffffff?text=Sem+Poster';

  transform(posterPath: string | null): string {
    // Se não tiver poster, retorna placeholder
    if (!posterPath) {
      return this.placeholderImage;
    }
    // Retorna URL completa do poster
    return `${this.baseImageUrl}${posterPath}`;
  }
}