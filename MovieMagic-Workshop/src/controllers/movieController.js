const router = require('express').Router();

router.get('/create', (req, res) => {
	res.render('createMovie')
})

module.exports = router;