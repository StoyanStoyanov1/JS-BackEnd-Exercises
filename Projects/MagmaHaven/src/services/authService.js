const User = require('../models/User');

exports.register = async (userData) => {
	if (userData.password !== userData.rePassword) {
		throw new Error('Password mismatch');
	}

	const user = await User.findOne({email: userData.email});
	if (user) {
		throw new Error('User already exists');
	}

	const createdUser = await User.create(userData);

};

