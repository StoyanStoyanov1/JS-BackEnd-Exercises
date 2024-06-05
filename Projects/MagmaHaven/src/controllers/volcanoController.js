const router = require("express").Router();
const volcanoService = require("../services/volcanoService");
const {getErrorMessage} = require("../utils/errorUtils");
const {isAuth, authMiddleware} = require("../middleware/authMiddleware");

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

router.get('/:volcanoId/details', async (req, res) => {
	const volcano = await volcanoService.getOne(req.params.volcanoId).lean();
	const userId = req.user?._id

	const isOwner = volcano.owner == userId ? userId: false;

	const isUserInVoteList = await volcanoService.UserInVoteList(volcano._id, userId) ? userId : false;

	res.render('volcano/details', {volcano, isOwner, isUserInVoteList});
})



module.exports = router;