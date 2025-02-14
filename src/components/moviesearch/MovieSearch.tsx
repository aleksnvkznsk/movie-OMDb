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
    defaultSearchQuery?: string;
}

const MovieSearch: React.FC<MovieSearchProps> = ({ apiKey, defaultSearchQuery = 'movie' }) => {
    const [searchQuery, setSearchQuery] = useState(defaultSearchQuery);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState <'year' | 'title' | null>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => { setSearchQuery(event.target.value); };

    const searchMovies = async () => {
        setError(null);
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
            console.log(data);

            if (data.Response === 'True') {
                setMovies(data.Search || []);
            } else {
                setError(data.Error || 'Фильм не найден');
                setMovies([]);
                console.log("Фильм не найден");
            }
        } catch (e) {
        }

    };

    useEffect(() => {
        searchMovies();
    }, [apiKey, defaultSearchQuery]);

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
                <button className="movie__container__sort__button" onClick={handleSortByYear} disabled={sortBy === 'year'}>
                    Сортировать по году
                </button>
                <button className="movie__container__sort__button" onClick={handleSortByTitle} disabled={sortBy === 'title'}>
                    Сортировать по названию
                </button>
            </div>

            <div className="movie__container__body">
                {!error && movies.length > 0 && (
                    <div className="movie__container__body__movie__list">
                        {movies.map((movie) => (
                            <div key={movie.imdbID} className="movie__container__body__movie__item">
                                <img className="movie__container__body__movie__img" src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'} alt={movie.Title} />
                                <div className="movie__container__body__movie__details">
                                    <h3 className="movie__container__body__movie__title">{movie.Title}</h3>
                                    <p className="movie__container__body__movie__year">Дата выхода: {movie.Year} год</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieSearch;