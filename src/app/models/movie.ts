// Interface para tipar os dados da API TMDB
export interface Movie {
  mal_id: number;
  title_english: string;
  synopsis: string;
  poster_path: string;
  backdrop_path: string;
  year: string;
  score: number;
  scored_by: number;
  popularity: number;
  genre_ids?: number[];
  genres?: Genre[];
  runtime?: number;
  tagline?: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieResponse {
  results: Movie[];
  pagination?: any;
}