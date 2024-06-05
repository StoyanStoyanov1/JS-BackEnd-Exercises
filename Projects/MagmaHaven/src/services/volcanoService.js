const {Volcano} = require("../models/Volcano");

exports.create = async (ownerId, volcanoData) => {
	const createVolcano = await volcanoModel.create({
		owner: ownerId,
		...volcanoData,
	});

	return createVolcano;
}

exports.create = async (userId, courseData) => {
	const createCourse = await Volcano.create({
		owner: userId,
		...courseData,
	});

	return createCourse;
};

exports.getAll = () => Volcano.find();

exports.getOne = (volcanoId) => Volcano.findById(volcanoId);

exports.UserInVoteList = async (volcanoId, userId) => {
	const volcano = await Volcano.findOne({_id: volcanoId, voteList: userId});
	return !!volcano;
};