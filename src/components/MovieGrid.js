import { Row, Col, Container } from 'react-bootstrap';
import MovieCard from './MovieCard';
const MovieGrid = (props) => {
	const movies = props.movies;
	const movieGenres = props.movieGenres;
	const size = props.size;

	const splitMovies = (movies, size) => {
		return Array.from({ length: Math.ceil(movies.length / size) }, (v, i) =>
			movies.slice(i * size, i * size + size)
		);
	};
	const rows = splitMovies(movies, size);

	return (
		<Container>
			{rows.map((row, rowIndex) => (
				// rows won't be added or removed individually so we can use
				// row index as key prop
				<Row key={rowIndex} xs={1} md={props.size} className='g-4 mt-4'>
					{row.map((movie, index) => (
						<Col key={movie.id}>
							<MovieCard
								movieId={movie.id}
								title={movie.title}
								release_date={movie.release_date}
								vote_average={movie.vote_average}
								genres={movieGenres[rowIndex * row.length + index] ?? []}
								searchedMovies={props.searchedMovies}
								imgPath={
									movie.poster_path
										? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
										: null
								}
								showVote={props.showVote}
							/>
						</Col>
					))}
				</Row>
			))}
		</Container>
	);
};
export default MovieGrid;
