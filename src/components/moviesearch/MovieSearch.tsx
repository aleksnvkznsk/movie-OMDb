import React, { useState, useEffect } from 'react';
import './MovieSearch.scss';

interface Movie {
    Year: string;
    Title: string;
    imdbID: string;
    Poster: string;
}

interface MovieSearchProps {
    apiKey: string;
}

const MovieSearch: React.FC<MovieSearchProps> = ({ apiKey }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [movies, setMovies] = useState<Movie[]>([]);
    const [sortBy, setSortBy] = useState<'year' | 'title' | null>(null);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => { setSearchQuery(event.target.value); };

    const searchMovies = async () => {
        if (!searchQuery) {
            setMovies([]);
            return;
        }

        try {
            const response = await fetch(
                `https://www.omdbapi.com/?s=${searchQuery}&apikey=${apiKey}`
            );

            if (!response.ok) {
                console.log("Ошибка запроса");
            }

            const data = await response.json();

            if (data.Response === 'True') {
                setMovies(data.Search || []);
            } else {
                setMovies([]);
                console.log("Фильм не найден");
            }
        } catch (e) {
            console.error("Ошибка при поиске фильмов:", e);
        }

    };

    const sortMovies = (moviesToSort: Movie[]): Movie[] => {
        if (!sortBy) {
            return moviesToSort;
        }

        return [...moviesToSort].sort((a, b) => {
            if (sortBy === 'year') {
                const yearA = parseInt(a.Year, 10);
                const yearB = parseInt(b.Year, 10);
                if (yearA < yearB) return -1;
                if (yearA > yearB) return 1;
            } else if (sortBy === 'title') {
                if (a.Title < b.Title) return -1;
                if (a.Title > b.Title) return 1;
            }

            return 0;
        });
    };

    useEffect(() => {
        setMovies(prevMovies => sortMovies(prevMovies));
    }, [sortBy, movies]);

    const handleSortByYear = () => {
        setSortBy('year');
    };

    const handleSortByTitle = () => {
        setSortBy('title');
    };

    const openModal = (movie: Movie) => {
        setSelectedMovie(movie);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMovie(null);
    };

    return (
        <div className="movie">
            <div className="movie__container__header">
                <input
                    className="movie__container__header__input"
                    type="text"
                    placeholder="Найдите фильм..."
                    value={searchQuery}
                    onChange={handleInputChange}
                />
                <button className="movie__container__header__button" onClick={searchMovies} >Найти</button>
            </div>

            <div className="movie__container__sort">
                <button className="movie__container__sort__button" onClick={handleSortByYear} disabled={sortBy === 'year'}>Сортировать по году</button>
                <button className="movie__container__sort__button" onClick={handleSortByTitle} disabled={sortBy === 'title'}>Сортировать по названию</button>
            </div>

            <div className="movie__container__body">
                <div className="movie__container__body__movie__list">
                    {movies.map((movie) => (
                        <div key={movie.imdbID} className="movie__container__body__movie__item" onClick={() => openModal(movie)}>
                            <img className="movie__container__body__movie__img" src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'} alt={movie.Title} />
                            <div className="movie__container__body__movie__details">
                                <h3 className="movie__container__body__movie__title">{movie.Title}</h3>
                                <p className="movie__container__body__movie__year">Дата выхода: {movie.Year} год</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal__content">
                        <span className="modal__close" onClick={closeModal}>&times;</span>
                        {selectedMovie && (
                            <>
                                <h2>{selectedMovie.Title}</h2>
                                <img src={selectedMovie.Poster !== 'N/A' ? selectedMovie.Poster : '/placeholder.png'} alt={selectedMovie.Title} />
                                <p>Дата выхода: {selectedMovie.Year}</p>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MovieSearch;