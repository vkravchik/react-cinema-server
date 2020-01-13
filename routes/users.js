module.exports = function(app, db) {
  const collectionName = 'users';
  const collection = db.collection(collectionName);

  app.get(`/${collectionName}`, (req, res) => {
    collection.find().toArray((err, data) => {
      if (err) console.log(err);

      res.send(data);
    });
  });

  app.post('/register', (req, res) => {
    const user = req.body;

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

          res.send(data);
        })
      }
    });
  })
};
