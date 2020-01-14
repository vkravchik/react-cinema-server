const mongoose = require('mongoose');

const filmSchema = mongoose.Schema({
    name: String,
    description: String,
    genresId: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'genres'
    }]
});

filmSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('films', filmSchema);
