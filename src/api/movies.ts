import axios from "axios";
import type { MoviesResponse } from "../types/movie";

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export const fetchMovies = async (query: string, page: number): Promise<MoviesResponse> => {
  const response = await axios.get("https://api.themoviedb.org/3/search/movie", {
    params: {
      api_key: TOKEN,
      query,
      page
    },
  });

  return response.data;
};
