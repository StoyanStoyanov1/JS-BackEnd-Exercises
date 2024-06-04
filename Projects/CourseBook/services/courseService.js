const Course = require('../models/Course');
const User = require('../models/User');

exports.create = async (userId, courseData) => {
	const createCourse = await Course.create({
		owner: userId,
		...courseData,
	});

	await User.findByIdAndUpdate(userId, {$push: {createdCourses: createCourse._id}})

	return createCourse;
};