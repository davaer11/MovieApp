import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SearchBar = ({ setTopFiveResults, setClickedSearchBar }) => {
	const [searchText, setSearchText] = useState('');

	const navigate = useNavigate();

	const fetchCurrentMatches = (value) => {
		fetch(
			`https://api.themoviedb.org/3/search/movie?api_key=${
				process.env.REACT_APP_API_KEY
			}&language=en-US&query=${encodeURIComponent(value)}&page=1`
		)
			.then((response) => response.json())
			.then((data) => {
				const searchResults = data.results;
				let filteredSearchResults = [];

				if (searchResults.length > 0 && searchResults.length <= 5) {
					filteredSearchResults = searchResults;
				} else {
					//6,7,8...
					filteredSearchResults = searchResults.slice(0, 5);
				}
				setTopFiveResults(filteredSearchResults);
			});
	};

	const handleSearchChange = (event) => {
		fetchCurrentMatches(event.target.value);
		setSearchText(event.target.value);
	};
	const handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			if (searchText !== '') {
				navigate(`results/${searchText}`);
				setSearchText('');
			}
		}
	};
	const handleBlur = (event) => {
		setClickedSearchBar(false);
	};
	const handleFocus = (event) => {
		setClickedSearchBar(true);
	};

	return (
		<Container className='mt-5 mb-3'>
			<Row>
				<Col sm={4}>
					<Form className='d-flex'>
						<Form.Control
							type='search'
							placeholder='Search'
							className='me-2 rounded-pill'
							aria-label='Search'
							value={searchText}
							onChange={handleSearchChange}
							onKeyDown={handleKeyPress}
							onBlur={handleBlur}
							onFocus={handleFocus}
						></Form.Control>

						{searchText !== '' ? (
							<Link to={`results/${searchText}`}>
								<Button
									className='rounded-pill'
									variant='outline-primary'
									style={{ marginLeft: '30px' }}
								>
									Search
								</Button>
							</Link>
						) : (
							<Button
								className='rounded-pill'
								variant='outline-primary'
								disabled
							>
								Search
							</Button>
						)}
					</Form>
				</Col>
			</Row>
		</Container>
	);
};
export default SearchBar;
