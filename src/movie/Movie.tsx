import MovieSearch from "../components/moviesearch/MovieSearch";

function Movie() {
    const apiKey = 'daadfd56';
    return (
        <MovieSearch apiKey={apiKey} />
    );
}

export default Movie;