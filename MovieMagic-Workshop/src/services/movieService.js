const movies = [];

exports.getAll = () => {
	return movies.slice();
}

exports.create = (movieData) => {
	movieData._id = movies.length + 1;
	movies.push(movieData)
}

exports.getOne = (movieId) => {
	const movie = movies.find(movie => movie._id == movieId);

	return movie;
}

exports.search = (title, genre, year) => {
	let foundMovies = movies.slice();

	if (title) {
		foundMovies = foundMovies.filter(movie => movie.title.includes(title))
	}

	if (genre) {
		foundMovies = foundMovies.filter(movie => movie.genre.includes(genre));
	}

	if (year) {
		foundMovies = foundMovies.filter(movie => movie.year === year);
	}

	return foundMovies;
}