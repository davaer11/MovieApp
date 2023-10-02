import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { roundMovieVote } from '../utils/utils';
const MovieCard = (props) => {
	const movieVote = roundMovieVote(props.vote_average, 1);

	return (
		<Card>
			<Link to={`../${props.movieId}`}>
				{props.imgPath ? (
					<Card.Img variant='top' src={props.imgPath} />
				) : (
					<div
						style={{
							height: '150px',
							flexGrow: 3,
							background: '#f0f0f0',
							borderRadius: 5,
						}}
					/>
				)}
			</Link>
			{props.showVote && (
				<Card.ImgOverlay
					style={{
						fontSize: '20px',
						color: 'lightgreen',
						fontWeight: 'bold',
						height: '50px',
						width: '100px',
					}}
				>
					{movieVote}
				</Card.ImgOverlay>
			)}

			<Card.Body>
				<Card.Title>{props.title}</Card.Title>
				<Card.Text>
					{props.genres.map((genre, index) =>
						index < props.genres.length - 1 ? genre + ', ' : genre
					)}
					<br /> <br />
					<strong>Release Date: </strong>
					{props.release_date} <br />
				</Card.Text>
			</Card.Body>
		</Card>
	);
};
export default MovieCard;
