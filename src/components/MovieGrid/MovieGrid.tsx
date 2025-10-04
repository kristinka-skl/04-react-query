import type { Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";
interface MovieGridProps {
  onSelect: (movie: Movie) => void;
  movies: Movie[];
}
export default function MovieGrid({ onSelect, movies }: MovieGridProps) {
  return (
    <ul className={css.grid}>
      {movies.map((movie) => {
        return (
          <li onClick={() => onSelect(movie)} key={movie.id}>
            <div className={css.card}>
              {movie.poster_path ? (
                <img
                  className={css.image}
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  loading="lazy"
                />
              ) : (
                <span className={css.noimage}>No image</span>
              )}

              <h2 className={css.title}>{movie.title}</h2>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
