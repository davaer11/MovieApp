import { Outlet } from 'react-router';
import SearchBar from './SearchBar';
import { useState } from 'react';
import SearchTopResults from './SearchTopResults';
import { useNavigate } from 'react-router';

const NavBar = () => {
	const [topFiveResults, setTopFiveResults] = useState([]);
	const [clickedSearchBar, setClickedSearchBar] = useState(false); // jesam li kliknuo u SearchBar

	const navigate = useNavigate();

	const goToMovieDetailPage = (movieId) => {
		navigate(`${movieId}`);
	};

	return (
		<div style={{ position: 'relative' }}>
			<SearchBar
				setTopFiveResults={setTopFiveResults}
				setClickedSearchBar={setClickedSearchBar}
			/>
			{!!topFiveResults.length && clickedSearchBar && (
				<SearchTopResults
					topResults={topFiveResults}
					goToMovieDetailPage={goToMovieDetailPage}
				/>
			)}
			<Outlet />
		</div>
	);
};
export default NavBar;
