const mongoose = require('mongoose');

const genreSchema = mongoose.Schema({
    name: String,
}, {
    versionKey: false
});

module.exports = mongoose.model('genres', genreSchema);
