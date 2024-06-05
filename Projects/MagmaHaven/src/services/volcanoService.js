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

exports.delete = (volcanoId) => Volcano.findOneAndDelete(volcanoId);

exports.addVote = async (volcanoId, userId) => {
	try {
		const volcano = await Volcano.findByIdAndUpdate(
			volcanoId,
			{$push: { voteList: userId}},
			{new: true}
			)

		return volcano
	} catch (err) {
		throw new Error('Failed to add vote');
	}
}

exports.UserInVoteList = async (volcanoId, userId) => {
	const volcano = await Volcano.findOne({_id: volcanoId, voteList: userId});
	return !!volcano;
};