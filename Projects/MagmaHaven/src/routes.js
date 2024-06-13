const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const volcanoController = require('./controllers/volcanoController');

router.use('/', homeController);
router.use('/auth', authController);
router.use('/volcano', volcanoController);

router.all("*", (req, res) => {
	res.render('404');
})

module.exports = router;