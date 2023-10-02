import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MovieCard from './MovieCard';
import {
	fetchMovies,
	fetchAllMovieGenres,
	findAllGenresForAllMovies,
} from '../utils/utils';

const TopRatedMovies = () => {
	const [movies, setMovies] = useState([]);
	const [movieGenres, setMovieGenres] = useState([[]]);

	const getTopRatedMovies = async () => {
		const movies = await fetchMovies(
			`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
		);
		setMovies(movies);

		const genres = await fetchAllMovieGenres(
			`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
		);

		const genreNames = findAllGenresForAllMovies(genres, movies);
		setMovieGenres(genreNames);
	};

	useEffect(() => {
		getTopRatedMovies();
	}, []);

	const settings = {
		dots: true,
		Infinite: true,
		speed: 800,
		slidesToShow: 5,
		slidesToScroll: 4,
	};
	return (
		<div>
			<Slider {...settings} style={{ zIndex: 2 }}>
				{movies.map((movie, index) => (
					<MovieCard
						key={movie.id}
						title={movie.title}
						release_date={movie.release_date}
						vote_average={movie.vote_average}
						genres={movieGenres[index] ?? []}
						imgPath={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
						movieId={movie.id}
						showVote={true}
					/>
				))}
			</Slider>
		</div>
	);
};
export default TopRatedMovies;
