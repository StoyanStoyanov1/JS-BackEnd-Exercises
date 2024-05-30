const router = require("express").Router();

const authService = require("../services/authService");

router.get('/register', (req, res) => {
	res.render('auth/register');
})

router.post('/register', async (req, res) => {
	const userData = req.body;

	try {
		const token = await  authService.register(userData);

		res.cookie('auth', token);

		res.redirect('/');
	} catch (err) {
		console.log(err);
	}
});




module.exports = router;