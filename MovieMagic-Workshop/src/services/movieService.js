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