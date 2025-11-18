// src/components/MovieGrid/MovieGrid.tsx
import React from 'react';
import { type Movie } from '../../types/movie';
import styles from './MovieGrid.module.css';
import { makeImagePath } from '../../utils/image';

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, onSelect }) => {
  if (!movies.length) return null;

  return (
    <ul className={styles.grid}>
      {movies.map((m) => (
        <li key={m.id}>
          <div className={styles.card} onClick={() => onSelect(m)} role="button" tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') onSelect(m); }}>
            <img
              className={styles.image}
              src={makeImagePath(m.poster_path, 'w500')}
              alt={m.title}
              loading="lazy"
            />
            <h2 className={styles.title}>{m.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieGrid;
