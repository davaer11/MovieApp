import { useState, useEffect } from 'react';
import MovieGrid from './MovieGrid';
import {
	fetchMovies,
	fetchAllMovieGenres,
	findAllGenresForAllMovies,
} from './utils/utils';

const UpcomingMovies = () => {
	const [movies, setMovies] = useState([]);
	const [movieGenres, setMovieGenres] = useState([[]]);

	let numOfColumns = 4;

	const getUpcomingMovies = async () => {
		const movies = await fetchMovies(
			`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
		);
		setMovies(movies);

		const genres = await fetchAllMovieGenres(
			`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
		);

		const genreNames = findAllGenresForAllMovies(genres, movies);
		setMovieGenres(genreNames);
	};

	useEffect(() => {
		getUpcomingMovies();
	}, []);

	return (
		<MovieGrid
			movies={movies}
			movieGenres={movieGenres}
			size={numOfColumns}
			searchedMovies={false}
			showVote={false}
		/>
	);
};
export default UpcomingMovies;
