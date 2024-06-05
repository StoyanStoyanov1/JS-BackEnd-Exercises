const router = require("express").Router();
const volcanoService = require("../services/volcanoService");

router.get("/create", (req, res) => {
	res.render("volcano/create");
})

router.post("/create", async (req, res) => {
	const volcano = await volcanoService.create(req.user._id ,req.body);

	res.redirect('/');

	return volcano;
});
module.exports = router;