const authMiddleware = require('../middlewares/authMiddleware');

module.exports = function (app, db) {
  const collectionName = 'films';
  const collection = db.collection(collectionName);

  app.get(`/${collectionName}`, authMiddleware, (req, res) => {
    collection.find().toArray((err, data) => {
      if (err) console.log(err);

      res.send(data);
    });
  });
};
