const mongoose = require('mongoose');

const genreSchema = mongoose.Schema({
    name: String,
});

genreSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('genres', genreSchema);
