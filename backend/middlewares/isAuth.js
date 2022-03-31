exports.isAuth = (req, res, next) => {
	// console.log(req.isAuthenticated());
	// console.log(req.user);
	// console.log(req.session);
	if (req.isAuthenticated()) {
		next();
	} else {
		res.status(404).json({
			success: false,
			message: 'You are not authorized to view this resource',
		});
	}
};
