const router = require("express").Router();

const userService = require('../services/userService');

router.post('/register', async (req, res) => {
	const userDate = req.body;

	const {userId, email, token} = await userService.register(userDate);

	res.send({
		userId: '',
		email: '',
		token: '',
	})
});

module.exports = router;