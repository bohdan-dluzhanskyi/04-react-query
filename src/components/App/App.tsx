import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import { fetchMovies } from '../../services/movieService';
import { type Movie } from '../../types/movie';
import toast, { Toaster } from 'react-hot-toast';

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    setMovies([]);
    setError(null);
    setLoading(true);

    try {
      const data = await fetchMovies({ query });
      if (!data.results.length) {
        toast('No movies found for your request.');
      } else {
        setMovies(data.results);
      }
    } catch (err) {
      console.error(err);
      setError('failed');
      toast.error('There was an error while fetching movies.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (movie: Movie) => {
    setSelected(movie);
  };

  const handleCloseModal = () => {
    setSelected(null);
  };

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      <main>
        {loading && <Loader />}
        {error && <ErrorMessage />}
        {!loading && !error && <MovieGrid movies={movies} onSelect={handleSelect} />}
        {selected && <MovieModal movie={selected} onClose={handleCloseModal} />}
      </main>
    </>
  );
};

export default App;
