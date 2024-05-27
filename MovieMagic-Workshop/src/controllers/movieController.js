const router = require('express').Router();

const moviesService = require('../services/movieService');
const castService = require('../services/castService');

router.get('/create', (req, res) => {
	res.render('create');
});

router.post('/create', async (req, res) => {
	const newMovie = req.body;

	try {
		await moviesService.create(newMovie);

		res.redirect('/')
	} catch (err) {
		console.log(err.message);
		res.redirect('/create');
	}

	res.redirect('/')
});

router.get('/movies/:movieId', async (req, res) => {
	const movieId = req.params.movieId;
	const movie = await moviesService.getOne(movieId).lean();

	// TODO: This is not perfect, use handlebars helpers
	movie.rating = new Array(Number(movie.rating.fill(true)));

	res.render('details', { movie });
})

router.get('/movies/:movieId/attach', async (req, res) => {
	const movie = await moviesService.getOne(req.params.movieId).lean();
	const casts = await castService.getAll().lean();

	res.render('movie/attach', {...movie, casts});
});

router.post('/movies/:movieId/attach', async (req, res) => {
	const castId = req.body.cast;
	const movieId = req.params.movieId;

	await movieService.attach(movieId, castId);

	res.redirect(`/movies/${movieId}/attach`)
})
module.exports = router;