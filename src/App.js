import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NavBar from './components/NavBar';
import FrontPage from './pages/FrontPage';
import SearchResults from './pages/SearchResults';
import { loadSearchText } from './pages/SearchResults';
import { loadMovie } from './pages/MovieDetails';
import MovieDetails from './pages/MovieDetails';
import SearchResultsError from './pages/SearchResultError';

const router = createBrowserRouter([
	{
		path: '/',
		element: <NavBar />,
		children: [
			{
				index: true,
				element: <FrontPage />,
			},
			{
				path: 'results/:searchText?',
				element: <SearchResults />,
				errorElement: <SearchResultsError />,
				loader: loadSearchText,
			},
		],
	},
	{
		path: '/:movieId',
		element: <MovieDetails />,
		loader: loadMovie,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
