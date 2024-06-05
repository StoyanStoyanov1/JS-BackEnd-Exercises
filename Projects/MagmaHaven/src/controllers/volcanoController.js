const router = require("express").Router();
const volcanoService = require("../services/volcanoService");
const {getErrorMessage} = require("../utils/errorUtils");

router.get("/create", (req, res) => {
	res.render("volcano/create");
})

router.post("/create", async (req, res) => {
	const volcanoDate = req.body

	try {
		await volcanoService.create(req.user._id, volcanoDate);

		res.redirect('/');
	} catch (err) {
		res.render('volcano/create', {...volcanoDate ,error: getErrorMessage(err)});
	}
});
module.exports = router;