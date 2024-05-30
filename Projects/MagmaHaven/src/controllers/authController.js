const router = require("express").Router();

const authService = require("../services/authService");

router.get('/register', (req, res) => {
	res.render('auth/register');
})

router.post('/register', async (req, res) => {
	const userData = req.body;

	try {
		await authService.register(userData);

		res.redirect('/')
	} catch (err) {
		console.log(err);
		res.redirect('/register');
	}
})

module.exports = router;