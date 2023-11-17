exports.isAuth = (req, res, next) => {
	if (req.isAuthenticated()) {
	  next();
	} else {
	  res.status(401).json({
		success: false,
		message: 'Unauthorized access. Please log in.',
	  });
	}
  };
  