const router = require('express').Router();
const moviesService = require('../services/movieService');

router.get('/create', (req, res) => {
	res.render('createMovie');
});

router.post('/create', (req, res) => {
	const newMovie = req.body;

	moviesService.create(newMovie);

	res.redirect('/')
})

module.exports = router;