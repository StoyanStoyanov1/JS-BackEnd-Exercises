const router = require('express').Router();

const {getErrorMessage} = require("../utils/errorUtils");
const {isAuth} = require("../middlewares/authMiddleware");
const courseService = require('../services/courseService')

router.get('/', async (req, res) => {
	const courses = await  courseService.getAll().lean();

	res.render('courses/catalog', {courses});
});

router.get('/:courseId/details', async (req, res) => {
	const course = await courseService.getOneDetailed(req.params.courseId).lean();
	const signUpUsers = course.signUpList.map(user => user.username).join(', ');

	const isOwner = course.owner._id == req.user?._id;
	const isSigned = course.signUpList.some(user => user._id == req.user?._id)

	res.render('courses/details', {...course, signUpUsers, isOwner, isSigned});
});

router.get('/:courseId/sign-up', async (req, res) => {
	await courseService.signUp(req.params.courseId, req.user._id);
	res.redirect(`/courses/${req.params.courseId}/details`)
});

router.get('/create', isAuth, (req, res) => {
	res.render('courses/create');
});

router.post('/create', isAuth, async (req, res) => {
	const courseData = req.body;

	try {
		await courseService.create(req.user._id, courseData)

		res.redirect('/courses');
	} catch (err)  {
		res.render('courses/create',  {...courseData, error: getErrorMessage(err)})
	}
});

router.get('/:courseId/delete', async (req, res) => {
	if (isCourseOwner()) {
		return;
	}

	await courseService.delete(req.params.courseId);

	res.redirect('/courses');
});

async function isCourseOwner(req, res, next) {
	const course = await courseService.getOne(req.params.courseId);

	if (course.owner != req.user?._id) {
		res.redirect(`/courses/${course.params.courseId}`/details);
		return true;
	}

	next();
}

module.exports = router;