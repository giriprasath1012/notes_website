const Note = require('../models/Notes');

exports.getNotes = async (req, res) => {
	try {
		const notes = await Note.find({ userId: req.user._id });

		if (!notes || notes.length === 0) {
			return res.status(404).json({
				success: false,
				message: 'No notes found',
			});
		}

		res.status(200).json({
			success: true,
			count: notes.length,
			notes,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Error retrieving notes',
			error: error.message,
		});
	}
};

exports.postNote = async (req, res) => {
	try {
		let note = { ...req.body, userId: req.user._id };
		note = await Note.create(note);

		res.status(201).json({
			success: true,
			message: 'Note created',
			note,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Error creating note',
			error: error.message,
		});
	}
};

exports.getNote = async (req, res) => {
	try {
		let note = await Note.findById(req.params.id);

		if (!note) {
			return res.status(404).json({
				success: false,
				message: 'Note not found',
			});
		}

		if (note.userId.toString() === req.user._id.toString()) {
			res.status(200).json({
				success: true,
				note,
			});
		} else {
			res.status(403).json({
				success: false,
				message: 'You are not authorized to view this note',
			});
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Error retrieving note',
			error: error.message,
		});
	}
};

exports.updateNote = async (req, res) => {
	try {
		let note = await Note.findById(req.params.id);

		if (!note) {
			return res.status(404).json({
				success: false,
				message: 'Note not found',
			});
		}

		if (note.userId.toString() === req.user._id.toString()) {
			note = await Note.findByIdAndUpdate(req.params.id, req.body, {
				new: true,
			});
			res.status(200).json({
				success: true,
				message: 'Note updated',
				note,
			});
		} else {
			res.status(403).json({
				success: false,
				message: 'You are not authorized to update this note',
			});
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Error updating note',
			error: error.message,
		});
	}
};

exports.deleteNote = async (req, res) => {
	try {
		let note = await Note.findById(req.params.id);

		if (!note) {
			return res.status(404).json({
				success: false,
				message: 'Note not found',
			});
		}

		if (note.userId.toString() === req.user._id.toString()) {
			await Note.findByIdAndDelete(req.params.id);
			res.status(200).json({
				success: true,
				message: 'Note deleted',
			});
		} else {
			res.status(403).json({
				success: false,
				message: 'You are not authorized to delete this note',
			});
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Error deleting note',
			error: error.message,
		});
	}
};
