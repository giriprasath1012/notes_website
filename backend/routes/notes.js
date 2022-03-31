const express = require('express');
const router = express.Router();
const {
	getNotes,
	getNote,
	postNote,
	updateNote,
	deleteNote,
} = require('../controllers/notes');

const { isAuth } = require('../middlewares/isAuth');

router.get('/', isAuth, getNotes);
router.post('/', isAuth, postNote);

router.get('/:id', isAuth, getNote);
router.put('/:id', isAuth, updateNote);
router.delete('/:id', isAuth, deleteNote);

module.exports = router;
