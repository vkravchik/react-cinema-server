const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtKey = require('../cfg/key');
const router = require('express').Router();
const UserModel = require('../schemas/userSchema');

router.get(`/`, (req, res) => {
    UserModel.find({}).then(data => {
        res.send(data);
    });
});

router.post('/login', (req, res) => {
    const {username, password} = req.body;

    UserModel.findOne({username})
        .then(data => {
            if (!data) {
                return res.status(400).send({
                    success: false,
                    message: 'Entered bad login/password!'
                });
            } else {
                if (bcrypt.compareSync(password, data.password)) {
                    const token = jwt.sign({
                        id: data._id,
                        username: data.username,
                        email: data.email,
                    }, jwtKey.tokenKey);

                    res.send(token);
                } else {
                    res.status(400).send({
                        success: false,
                        message: 'Entered bad login/password!'
                    });
                }
            }
        }, err => {
            throw err;
        })
});

router.post('/register', (req, res) => {
    let {username, email, password} = req.body;
    password = bcrypt.hashSync(password, 8);

    const user = {
        username,
        email,
        password
    };

    UserModel.findOne({username: user.username})
        .then(data => {
            if (data) {
                return res.status(409).send({
                    success: false,
                    message: 'User already exist!'
                });
            } else {
                const newUser = new UserModel(user);
                newUser.save()
                    .then(data => {
                        res.send(data);
                    }, err => {
                        throw err;
                    })
            }
        }, err => {
            throw err;
        });
});

module.exports = router;
