const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String
}, {
    versionKey: false
});

module.exports = mongoose.model('users', userSchema);
