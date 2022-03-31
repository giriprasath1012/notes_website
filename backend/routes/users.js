const express = require('express');
const passport = require('passport');
const router = express.Router();
const {
	registerUser,
	loginUser,
	logoutUser,
	isLoggedIn,
} = require('../controllers/users');
const { isAuth } = require('../middlewares/isAuth');

router.post('/register', registerUser);
router.post('/login', passport.authenticate('local'), loginUser);
router.get('/logout', logoutUser);
router.get('/is-logged', isAuth, isLoggedIn);

module.exports = router;
