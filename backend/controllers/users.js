const User = require('../models/Users');
const { hash } = require('bcrypt');

exports.registerUser = async (req, res) => {
	try {
		let user = new User(req.body);

		// Hash password
		user.password = await hash(user.password, 10);

		// Create user
		user = await user.save();

		res.status(200).json({
			success: true,
			message: 'User Registered',
			user,
		});
	} catch (error) {
		res.status(404).json({
			success: false,
			message: error.message,
		});
	}
};

exports.loginUser = async (req, res) => {
	res.status(200).json({
		success: true,
		message: 'User Logged In',
	});
};

exports.logoutUser = async (req, res) => {
	// Logout user
	req.logout();

	res.status(200).json({
		success: true,
		message: 'User Logged Out',
	});
};

exports.isLoggedIn = async (req, res) => {
	res.status(200).json({
		success: true,
		username: req.user.username,
		message: 'Login is active.',
	});
};
