const router = require("express").Router();
const volcanoService = require("../services/volcanoService");
const {getErrorMessage} = require("../utils/errorUtils");
const {isAuth} = require("../middleware/authMiddleware");

router.get("/create", isAuth, (req, res) => {
	res.render("volcano/create");
})

router.post("/create", isAuth, async (req, res) => {
	const volcanoDate = req.body

	try {
		await volcanoService.create(req.user._id, volcanoDate);

		res.redirect('/volcano/catalog');
	} catch (err) {
		res.render('volcano/create', {...volcanoDate ,error: getErrorMessage(err)});
	}
});

router.get('/catalog', async (req, res) => {
	const catalog = await volcanoService.getAll().lean();

	res.render('volcano/catalog', {catalog});
});



module.exports = router;