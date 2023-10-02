import { useLoaderData } from 'react-router';
import { useState, useEffect } from 'react';
import Youtube from 'react-youtube';

import { Container, Row, Col, Card } from 'react-bootstrap';
import { fetchRecommendedMovies } from '../utils/utils';
import RecommendedMovies from '../components/RecommendedMovies';

const MovieDetails = () => {
	const { movieInfo, movieCast, movieTrailer } = useLoaderData();
	const [recommendedMovies, setRecommendedMovies] = useState([]);

	useEffect(() => {
		fetchRecommendedMovies(
			'https://api.themoviedb.org/3/discover/movie?api_key=bb2ab9df53ef9495f588e3a4c66dba6b',
			movieInfo.genres,
			movieInfo.movieId
		).then((recommended) => {
			setRecommendedMovies(recommended);
		});
	}, [movieInfo]);

	const firstFewActors = movieCast.slice(0, 5);

	//console.log('hahaha: ' + movieTrailer);
	//https://api.themoviedb.org/3/discover/movie?api_key=YOUR_API_KEY&with_genres=GENRE_ID
	const onReady = (event) => {
		event.target.pauseVideo();
	};

	return (
		<Container style={{ backgroundColor: 'lightgrey' }}>
			<Row>
				<Col md={4}>
					<Card>
						<Card.Img
							variant='top'
							src={`https://image.tmdb.org/t/p/w500${movieInfo.poster_path}`}
						/>
					</Card>
				</Col>
				<Col md={8}>
					<Card style={{ backgroundColor: 'grey' }}>
						<Card.Body>
							<Card.Title>
								<strong>{movieInfo.title}</strong>
							</Card.Title>
							<Card.Text>
								<strong>Cast:</strong>{' '}
								{firstFewActors.map((actor, index) => {
									if (index < firstFewActors.length - 1) {
										return actor + ', ';
									}
									return actor;
								})}
							</Card.Text>
							{movieTrailer ? (
								<Youtube videoId={movieTrailer} onReady={onReady} />
							) : (
								<p
									style={{
										fontSize: '20px',
										fontWeight: 'bold',
										padding: '80px',
										paddingLeft: '330px',
									}}
								>
									No official trailer
								</p>
							)}
							<Card.Text>
								<strong>Genres: </strong>{' '}
								{movieInfo.genres.map((genre, index) => {
									if (index < movieInfo.genres.length - 1) {
										return genre.name + ', ';
									}
									return genre.name;
								})}{' '}
								<br />
								<strong>Release Date:</strong> {movieInfo.release_date} <br />
								<strong>Duration:</strong> {`${movieInfo.runtime} min`} <br />
								<strong>Budget</strong> {`${movieInfo.budget}$`}
								<br />
								<strong>Revenue</strong> {`${movieInfo.revenue}$`}
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			</Row>
			<Row className='mt-5'>
				<RecommendedMovies recommendedMovies={recommendedMovies} />
			</Row>
		</Container>
	);
};

export function loadMovie({ request, params }) {
	const obj = Promise.all([
		fetch(
			`https://api.themoviedb.org/3/movie/${params.movieId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
		),
		fetch(
			`https://api.themoviedb.org/3/movie/${params.movieId}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
		),
		fetch(
			`https://api.themoviedb.org/3/movie/${params.movieId}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
		),
	])
		.then(([resMovieInfo, resCredits, resVideo]) =>
			Promise.all([resMovieInfo.json(), resCredits.json(), resVideo.json()])
		)
		.then(([movieInfoData, creditsData, videoData]) => {
			const movieInfo = {
				title: movieInfoData.title,
				poster_path: movieInfoData.poster_path,
				genres: movieInfoData.genres,
				runtime: movieInfoData.runtime,
				release_date: movieInfoData.release_date,
				budget: movieInfoData.budget,
				revenue: movieInfoData.revenue,
				movieId: movieInfoData.id,
			};

			const cast = creditsData.cast;
			const castNames = [];

			for (const key in cast) {
				if (cast.hasOwnProperty(key)) {
					const { name } = cast[key];
					castNames[key] = name;
				}
			}

			const officialTrailer = videoData.results.find(
				(video) => video.name === 'Official Trailer'
			);
			return {
				movieInfo: movieInfo,
				movieCast: castNames,
				// movie trailer can be undefined
				movieTrailer: officialTrailer?.key,
			};
		});

	return obj;
}

export default MovieDetails;
