import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Card, CardTitle } from 'react-bootstrap';
import MovieCard from './MovieCard';
import { useEffect, useState } from 'react';
import { findAllGenresForAllMovies, fetchAllMovieGenres } from './utils/utils';

const RecommendedMovies = (props) => {
	const movies = props.recommendedMovies;
	const [movieGenres, setMovieGenres] = useState([[]]);

	useEffect(() => {
		fetchAllMovieGenres(
			`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
		).then((genres) => {
			const genreNames = findAllGenresForAllMovies(genres, movies);
			setMovieGenres(genreNames);
		});
	}, [movies]);

	const settings = {
		dots: true,
		Infinite: true,
		speed: 800,
		slidesToShow: 4,
		slidesToScroll: 4,
	};

	const sliderStyles = {
		width: '100%',
		paddingLeft: '10px',
	};
	return (
		<Card style={{ backgroundColor: 'lightgrey', marginTop: '30px' }}>
			<CardTitle>
				<strong style={{ fontSize: '30px' }}>More like this: </strong>
			</CardTitle>
			<Slider style={sliderStyles} {...settings}>
				{movies.map((movie, index) => (
					<MovieCard
						key={movie.id}
						title={movie.title}
						release_date={movie.release_date}
						vote_average={movie.vote_average}
						genres={movieGenres[index] ?? []}
						imgPath={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
						movieId={movie.id}
					/>
				))}
			</Slider>
		</Card>
	);
};

export default RecommendedMovies;
