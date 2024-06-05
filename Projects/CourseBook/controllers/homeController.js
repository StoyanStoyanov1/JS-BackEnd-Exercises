const router = require('express').Router();
const courseService = require('../services/courseService');
const userService = require('../services/userService');
const {isAuth} = require("../middlewares/authMiddleware");

router.get('/', async (req, res) => {
	const latestCourses = await courseService.getLatest().lean();

	res.render('home', {latestCourses});
});

router.get('/profile', isAuth, async (req, res) => {
	const user = await userService.getInfo(req.user._id).lean();

	res.render('profile', {user,})
})

module.exports = router;