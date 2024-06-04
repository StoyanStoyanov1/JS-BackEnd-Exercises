const router = require('express').Router();

const {getErrorMessage} = require("../utils/errorUtils");
const {isAuth} = require("../middlewares/authMiddleware");
const courseService = require('../services/courseService')

router.get('/', async (req, res) => {
	const courses = await  courseService.getAll().lean();

	res.render('courses/catalog', {courses});
})

router.get('/create', isAuth, (req, res) => {
	res.render('courses/create');
})

router.post('/create', isAuth, async (req, res) => {
	const courseData = req.body;

	try {
		await courseService.create(req.user._id, courseData)

		res.redirect('/courses');
	} catch (err)  {
		res.render('courses/create',  {...courseData, error: getErrorMessage(err)})
	}
})

module.exports = router;