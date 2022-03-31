const Note = require('../models/Notes');

exports.getNotes = async (req, res) => {
	try {
		const notes = await Note.find({ userId: req.user._id });
		console.log(notes);
		if (!notes || notes.length === 0) {
			res.status(404).json({
				success: false,
			});
		}

		res.status(200).json({
			success: true,
			count: notes.length,
			notes,
		});
	} catch (error) {
		res.status(404).json({
			success: false,
			message: error.message,
		});
	}
};

exports.postNote = async (req, res) => {
	try {
		let note = req.body;
		note = { ...note, userId: req.user._id };

		note = await Note.create(note);

		if (!note || note.length === 0) {
			res.status(404).json({
				success: false,
			});
		}

		res.status(200).json({
			success: true,
			message: 'Note created',
			note,
		});
	} catch (error) {
		res.status(404).json({
			success: false,
			message: error.message,
		});
	}
};

// ID
exports.getNote = async (req, res) => {
	try {
		let note = await Note.findById(req.params.id);

		if (!note || note.length === 0) {
			return res.status(404).json({
				success: false,
			});
		}

		if (note.userId.toString() === req.user._id.toString()) {
			res.status(200).json({
				success: true,
				note,
			});
		} else {
			res.status(404).json({
				success: false,
				message: 'You are not authorized to view this resource',
			});
		}
	} catch (error) {
		res.status(404).json({
			success: false,
			message: error.message,
		});
	}
};

exports.updateNote = async (req, res) => {
	try {
		let note = await Note.findById(req.params.id);

		if (!note || note.length === 0) {
			return res.status(404).json({
				success: false,
			});
		}

		// console.log(note.userId.toString(), req.user._id.toString());
		if (note.userId.toString() === req.user._id.toString()) {
			note = await Note.findByIdAndUpdate(req.params.id, req.body, {
				new: true,
			});
		} else {
			return res.status(404).json({
				success: false,
				message: 'You are not authorized to change this resource',
			});
		}

		res.status(200).json({
			success: true,
			message: 'Successfully updated',
			note,
		});
	} catch (error) {
		res.status(404).json({
			success: false,
			message: error.message,
		});
	}
};

exports.deleteNote = async (req, res) => {
	try {
		let note = await Note.findById(req.params.id);

		if (!note || note.length === 0) {
			return res.status(404).json({
				success: false,
			});
		}

		if (note.userId.toString() === req.user._id.toString()) {
			note = await Note.findByIdAndDelete(req.params.id);
		} else {
			return res.status(404).json({
				success: false,
				message: 'You are not authorized to delete this resource',
			});
		}

		res.status(200).json({
			success: true,
			message: 'Successfully deleted',
		});
	} catch (error) {
		res.status(404).json({
			success: false,
			message: error.message,
		});
	}
};
