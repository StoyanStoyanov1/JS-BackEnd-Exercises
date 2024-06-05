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