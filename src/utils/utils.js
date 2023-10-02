export const findAllGenresForAllMovies = (genres, movies) => {
	const genreIds = movies.map((movie) => movie.genre_ids); //[[genre_ids_first_movie],[genre_ids_second_movie]...]
	let genreNames = [];

	for (let i = 0; i < genreIds.length; i++) {
		const movieWithIds = genreIds[i];
		let movieGenreNames = [];
		for (let j = 0; j < movieWithIds.length; j++) {
			const movieId = movieWithIds[j];
			const movieGenre = genres.find((genre) => genre.id === movieId);
			movieGenreNames[j] = movieGenre.name;
		}
		genreNames.push(movieGenreNames);
	}
	return genreNames;
};

export const fetchMovies = async (moviesPath) => {
	//za upcoming i top rated movies
	const res = await fetch(moviesPath);

	//handle error
	const data = await res.json();

	return data.results;
};

export const fetchAllMovieGenres = async (genresPath) => {
	const res = await fetch(genresPath);

	//handle error
	const data = await res.json();

	return data.genres;
};
export const fetchRecommendedMovies = async (
	baseFetchPath,
	genres,
	currentMovieId
) => {
	const recommendedMovies = [];
	const genreIds = genres.map((genre) => genre.id);

	for (const genreId of genreIds) {
		const res = await fetch(`${baseFetchPath}&with_genres=${genreId}`);
		//handle error
		const data = await res.json();

		let itemsForAdd = 2; // broji koliko sam stavio filmova za svaki dostupan žanr, želim stavit dva po svakom žanru
		if (genreIds.length === 1) {
			itemsForAdd *= 2; // ako film ima samo jedan žanr, onda uzmi duplo više filmova za jedan žanr
		}

		for (let i = 0; i < data.results.length; i++) {
			if (itemsForAdd === 0) {
				break;
			}

			if (recommendedMovies.length > 1) {
				//provjera jel već ubačen taj film ili je to film za koji se radi preporuka
				if (
					recommendedMovies.some((movie) => movie.id === data.results[i].id) ||
					data.results[i].id === currentMovieId
				) {
					continue;
				} else {
					recommendedMovies.push(data.results[i]);
					itemsForAdd -= 1;
				}
			} else {
				recommendedMovies.push(data.results[i]);
				itemsForAdd -= 1;
			}
		}
	}
	return recommendedMovies;
};
export const roundMovieVote = (vote, numOfDecimals) => {
	return vote.toFixed(numOfDecimals);
};
