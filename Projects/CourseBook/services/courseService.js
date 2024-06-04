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

exports.getAll = () => Course.find();

exports.getOne = (courseId) => Course.findById(courseId);

exports.getOneDetailed = (courseId) => this.getOne(courseId).populate('owner').populate('signUpList');

exports.signUp = async (courseId, userId) => {
	await Course.findByIdAndUpdate(courseId, {$push: {signUpList: userId}});
	await User.findByIdAndUpdate(userId, {$push: {signedUpCourses: courseId}});
};

exports.delete = (courseId) => Course.findByIdAndDelete(courseId);

exports.edit = (courseId, courseData) =>  Course.findByIdAndUpdate(courseId, courseData, {runValidators: true});