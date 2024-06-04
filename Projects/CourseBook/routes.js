const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const courseController = require('./controllers/courseController')

router.use(homeController);
router.use('/auth', authController);
router.use('/courses', courseController);

router.all("*", (req, res) => {
	res.render('404');
})

module.exports = router;