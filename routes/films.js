module.exports = function (app, db) {
  const collectionName = 'films';
  const collection = db.collection(collectionName);

  app.get(`/${collectionName}`, (req, res) => {
    collection.find().toArray((err, data) => {
      if (err) console.log(err);

      res.send(data);
    });
  });
};
