// types-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const types = new Schema({
    name: {
      required: true,
      unique: true,
      type: String,
    }
  }, {
    timestamps: true
  });

  return mongooseClient.model('types', types);
};
