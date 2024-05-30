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
		res.render(getErrorMessage);
	}
});

router.get('/login', (req, res) => {
	res.render('auth/login');
});

router.post('/login', async (req, res) => {
	const loginData = req.body;

	try {
		const token = await  authService.login(loginData);

		res.cookie('auth', token);
		res.redirect('/');
	} catch (err) {
		res.render('auth/login', {error: getErrorMessage(err)});
	}
})




module.exports = router;