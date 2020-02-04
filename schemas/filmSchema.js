const mongoose = require('mongoose');

const filmSchema = mongoose.Schema({
    name: String,
    description: String,
    genresId: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'genres'
    }]
}, {
    versionKey: false
});

module.exports = mongoose.model('films', filmSchema);
