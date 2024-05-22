const movies = [{

}];

exports.getAll = () => {
	return movies.slice();
}

exports.create = (movieData) => {
	movies.push(movieData)
}