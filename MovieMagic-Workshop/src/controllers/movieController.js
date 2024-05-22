const router = require('express').Router();
const moviesService = require('../services/movieService');

router.get('/create', (req, res) => {
	res.render('createMovie');
});

router.post('/create', (req, res) => {
	const newMovie = req.body;
	newMovie.ratingStars = '&#x2605;'.repeat(newMovie.rating);

	moviesService.create(newMovie);

	res.redirect('/')
});

router.get('/movies/:movieId', (req, res) => {
	const movieId = req.params.movieId;
	const movie = moviesService.getOne(movieId);

	res.render('details', {movie});
})

module.exports = router;