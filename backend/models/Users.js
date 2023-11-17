const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    username: String,
    emailId: String,
    password: String,
});

const User = mongoose.model('user', usersSchema);
module.exports = User;
