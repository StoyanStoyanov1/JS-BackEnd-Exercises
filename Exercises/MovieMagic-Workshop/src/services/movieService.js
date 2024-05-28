const Movie = require("../models/Movie");

exports.getAll = () => Movie.find();

exports.search = (title, genre, year) => {
	let query = {};

	if (title) {
		query.title = new RegExp(title, 'i');
	}

	if (genre) {
		query.genre = genre.toLowerCase();
	}

	if (year) {
		query.year = year;
	}

	return Movie.find(query);
};

exports.getOne = (movieId) => Movie.findById(movieId).populate('casts');

exports.create = (movieData) => Movie.create(movieData);

exports.attach = async  (movieId, castId) => {
	const movie = await this.getOne(movieId);

	movie.casts.push(cast);

	await movie.save();

	return movie;
}