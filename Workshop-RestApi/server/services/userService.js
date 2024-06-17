const User = require('../models/User')
const jwt = require('jsonwebtoken');
exports.register = async (userData) => {
	if (userData.password !== userData.rePass) {
		throw new Error('Password missmatch!');
	}

	const user = await User.create(userData);

	const token = jwt.sign({
		_id: user._id,
		email: user.email,
	})

	return {
		userId: user._id,
		email: user.email,
		token: '',
	}
}