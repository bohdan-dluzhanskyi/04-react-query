import type { ReactNode } from "react";

export interface Movie {
  backdro_ppath: string | null;
  backdroppath: string | null;
  vote_average: ReactNode;
  release_date: ReactNode;
  backdrop_path(backdrop_path: any, arg1: string): string | undefined;
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
}

