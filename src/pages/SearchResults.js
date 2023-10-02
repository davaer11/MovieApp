import { useState, useEffect } from 'react';
import MovieGrid from '../components/MovieGrid';
import MoviePagination from '../components/MoviePagination';
import { useLoaderData, json } from 'react-router-dom';
import { fetchAllMovieGenres, findAllGenresForAllMovies } from '../utils/utils';

const SearchResults = () => {
	const { queryParam, currentPage, movies, totalPages, totalResults } =
		useLoaderData();
	const [movieList, setMovieList] = useState(movies);
	const [currPage, setCurrPage] = useState(currentPage);
	const [totPages, setTotPages] = useState(totalPages);
	const [movieGenres, setMovieGenres] = useState([[]]);

	const size = 4;

	useEffect(() => {
		setCurrPage(1);
	}, [queryParam]);

	useEffect(() => {
		fetchAllMovieGenres(
			`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
		).then((genres) => {
			const genreNames = findAllGenresForAllMovies(genres, movies);
			setMovieGenres(genreNames);
		});

		fetch(
			`https://api.themoviedb.org/3/search/movie?api_key=${
				process.env.REACT_APP_API_KEY
			}&language=en-US&query=${encodeURIComponent(queryParam)}&page=${currPage}`
		).then((response) => {
			if (!response.ok) {
				throw json(
					{ message: 'Could not fetch movies for given input' },
					{ status: 500 }
				);
			} else {
				response.json().then((resData) => {
					setMovieList(resData.results);
					setTotPages(resData.total_pages);
				});
			}
		});
	}, [queryParam, currPage, movies]);

	return (
		<>
			<strong style={{ paddingLeft: '220px', fontSize: '20px' }}>
				{`Total number of results: ${totalResults}`}
			</strong>
			<MovieGrid
				movies={movieList}
				movieGenres={movieGenres}
				size={size}
				searchedMovies={true}
				showVote={true}
			/>
			<MoviePagination
				currentPage={currPage}
				totalPages={totPages}
				onPageChange={setCurrPage}
			/>
		</>
	);
};

export async function loadSearchText({ request, params }) {
	const response = await fetch(
		`https://api.themoviedb.org/3/search/movie?api_key=${
			process.env.REACT_APP_API_KEY
		}&language=en-US&query=${encodeURIComponent(params.searchText)}&page=1`
	);
	if (!response.ok) {
		throw json(
			{ message: 'Could not fetch movies for given input' },
			{ status: 500 }
		);
	} else {
		const resData = await response.json();
		if (resData.total_results === 0) {
			throw new Error(`Sorry, no results found for  ${params.searchText}`);
		}
		return {
			queryParam: params.searchText,
			currentPage: resData.page,
			movies: resData.results,
			totalPages: resData.total_pages,
			totalResults: resData.total_results,
		};
	}
}
export default SearchResults;
