const router = require("express").Router();
const volcanoService = require("../services/volcanoService");
const {getErrorMessage} = require("../utils/errorUtils");
const {isAuth, checkIsOwner} = require("../middleware/authMiddleware");

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
	const volcanoId = req.params.volcanoId;
	const userId = req.user?._id

	const volcano = await volcanoService.getOne(volcanoId).lean();

	const isOwner = await checkIsOwner(userId, volcanoId)

	const isUserInVoteList =  userId ? await volcanoService.UserInVoteList(volcano._id, userId) : false;

	res.render('volcano/details', {volcano, isOwner, isUserInVoteList});
});

router.get('/:volcanoId/delete', isAuth,async (req, res) => {
	const volcanoId = req.params.volcanoId;
	const userId = req.user?._id;

	if (!userId) {
		return res.redirect('/auth/login');
	}

	const isOwner = await checkIsOwner(userId, volcanoId);

	if (!isOwner) {
		return  res.redirect('/volcano/catalog');
	}

	await volcanoService.delete(volcanoId);

	res.redirect('/volcano/catalog');
});

router.get('/:volcanoId/vote', isAuth, async (req, res) => {
	const volcanoId = req.params.volcanoId;
	const userId = req.user?._id;

	const isOwner = await checkIsOwner(userId, volcanoId);

	if (isOwner) {
		return res.redirect(`/volcano/${volcanoId}/details`);
	}

	const isUserVoted = await volcanoService.UserInVoteList(volcanoId, userId);

	if (isUserVoted) {
		return res.redirect(`/volcano/${volcanoId}/details`);
	}

	await volcanoService.addVote(volcanoId, userId);

	return res.redirect(`/volcano/${volcanoId}/details`);
});

router.get('/:volcanoId/edit', isAuth,async (req, res) => {
	const volcanoId = req.params.volcanoId;
	const userId = req.owner?._id;

	const isOwner = checkIsOwner(userId, volcanoId);

	if (!isOwner) {
		res.redirect(`/volcano/catalog`);
	}

	const volcano = await volcanoService.getOne(volcanoId).lean();

	res.render('volcano/edit', volcano);
});

router.post('/:volcanoId/edit', isAuth, async (req, res) => {
	const volcanoId = req.params.volcanoId;

	const volcanoData = req.body;

	await volcanoService.edit(volcanoId, volcanoData);

	res.redirect(`/volcano/${volcanoId}/details`);

})


module.exports = router;