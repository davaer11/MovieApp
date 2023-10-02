import { useState } from 'react';
const SearchTopResults = ({ topResults, goToMovieDetailPage }) => {
	const [resultsHover, setResultsHover] = useState(
		Array(topResults.length).fill(false)
	);

	const handleListClick = (resultId) => {
		goToMovieDetailPage(resultId);
	};

	const handleHovers = (index, value) => {
		const newArray = [...resultsHover];
		newArray[index] = value;
		setResultsHover(newArray);
	};

	const chooseStyle = (index) => {
		return {
			backgroundColor: resultsHover[index] ? 'lightblue' : 'lightgrey',
			display: 'flex',
			flexDirection: 'row',
			borderRadius: '5px',
			cursor: resultsHover[index] ? 'pointer' : 'auto',
		};
	};

	return (
		<div
			className='container-fluid'
			style={{
				zIndex: 5,
				left: '225px',
				top: '37px',
				padding: '10px',
				backgroundColor: 'white',
				boxShadow: '0 1px 20px 1px black',
				width: '275px',
				borderTopRightRadius: 0,
				borderTopLeftRadius: 0,
				borderRadius: '10px',
				position: 'absolute',
				display: 'flex',
				flexDirection: 'column',
				gap: '10px',
			}}
		>
			{topResults.map((result, index) => (
				<div
					key={result.id}
					style={chooseStyle(index)}
					onMouseDown={() => handleListClick(result.id)}
					onMouseEnter={() => handleHovers(index, true)}
					onMouseLeave={() => handleHovers(index, false)}
				>
					<img
						className='card-img'
						src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
						alt={result.title}
						style={{
							minWidth: '80px',
							maxWidth: '80px',
							height: '100px',
							borderRadius: '5px',
						}}
					/>

					<div
						style={{
							marginLeft: '10px',
							fontWeight: 500,
						}}
					>
						{result.title}
					</div>
				</div>
			))}
		</div>
	);
};
export default SearchTopResults;
