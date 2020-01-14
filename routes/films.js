const authMiddleware = require('../middlewares/authMiddleware');
const router = require('express').Router();
const FilmModel = require('../schemas/filmSchema');
const GenreModel = require('../schemas/genreSchema');

router.get(`/`, (req, res) => {
    FilmModel.find({}).populate('genresId').then(data => {
        res.send(data);
    });
});

module.exports = router;
