import Movie from "./Movie";

const MovieList = ({ movies }) => {
  return (
    <ul>
      {movies.map((movies) => (
        <Movie movie={movies} key={movies.id} />
      ))}
    </ul>
  );
};
export default MovieList;
