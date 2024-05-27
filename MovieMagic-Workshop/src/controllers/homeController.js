const router = require('express').Router();
const movieService = require('../services/movieService');

router.get('/', async (req, res) => {
	const movies = await movieService.getAll().lean() = movieService.getAll();

	res.render('home', {movies})
});

router.get('/about', (req, res) => {

	res.render('about')
})

router.get('/search', (req, res) => {
	const {title, genre, year} = req.query;

	const movies = movieService.search(title, genre, year);

	res.render('search', {movie, title, genre, year})
})

router.get('*', (req, res) => {
	res.render('404')
})
module.exports = router;