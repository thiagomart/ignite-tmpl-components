import { GenreResponseProps } from "../interface/genreResponseProps";
import { MovieProps } from "../interface/moviePropos";
import { MovieCard } from "./MovieCard";

interface ContentProps {
  movies: Array<MovieProps>;
}

export function Content({movies}: ContentProps) {
  return (
    <main>
      <div className="movies-list">
        {movies.map(movie => (
          <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
        ))}
      </div>
    </main>
  );
}