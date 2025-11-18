// src/components/MovieModal/MovieModal.tsx
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { type Movie } from '../../types/movie';
import styles from './MovieModal.module.css';
import { makeImagePath } from '../../utils/image';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
  const backdropRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    // Забороняємо скрол
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) onClose();
  };

  const el = (
    <div className={styles.backdrop} role="dialog" aria-modal="true" ref={backdropRef} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <button className={styles.closeButton} aria-label="Close modal" onClick={onClose}>
          &times;
        </button>
        <img
          src={makeImagePath(movie.backdrop_path, 'original')}
          alt={movie.title}
          className={styles.image}
        />
        <div className={styles.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}/10
          </p>
        </div>
      </div>
    </div>
  );

  const modalRoot = document.getElementById('modal-root') ?? document.body;
  return ReactDOM.createPortal(el, modalRoot);
};

export default MovieModal;
