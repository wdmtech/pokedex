const mongoose = require('mongoose');

module.exports = function (app) {
  mongoose.connect(process.env.DATABASE_URL || app.get('mongodb'), {});
  mongoose.Promise = global.Promise;

  app.set('mongooseClient', mongoose);
};
