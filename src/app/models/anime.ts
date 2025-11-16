// Interface para tipar os dados da API Jikan
export interface Anime {
  mal_id: number;
  title_english: string;
  synopsis: string;
  images: any;
  backdrop_path: string;
  aired: any;
  score: number;
  scored_by: number;
  popularity: number;
  duration?: number;
  genre_ids?: number[];
  genres?: Genre[];
  tagline?: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface AnimeResponse {
  results: Anime[];
  pagination?: any;
}