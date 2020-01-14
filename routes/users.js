const bcrypt = require('bcryptjs');

module.exports = function (app, db) {
  const collectionName = 'users';
  const collection = db.collection(collectionName);

  app.get(`/${collectionName}`, (req, res) => {
    collection.find().toArray((err, data) => {
      if (err) console.log(err);

      res.send(data);
    });
  });

  app.post('/login', (req, res) => {
    const {username, password} = req.body;

    collection.findOne({username}, (err, data) => {
      if (err) console.log(err);
      if (!data) {
        return res.status(400).send({
          success: false,
          message: 'Entered bad login/password!'
        });
      } else {
        bcrypt.compareSync(password, data.password) ?
          res.send(data) :
          res.status(400).send({
            success: false,
            message: 'Entered bad login/password!'
          });
      }
    })
  });

  app.post('/register', (req, res) => {
    let {username, email, password} = req.body;
    password = bcrypt.hashSync(password, 8);

    const user = {
      username,
      email,
      password
    };

    collection.findOne({username: user.username}, (err, data) => {
      if (err) console.log(err);
      if (data) {
        return res.status(409).send({
          success: false,
          message: 'User already exist!'
        });
      } else {
        collection.insertOne(user, (err, data) => {
          if (err) console.log(err);

          res.send(data.ops);
        })
      }
    });
  })
};
