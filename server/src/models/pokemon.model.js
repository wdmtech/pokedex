// pokemon-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// (and http://mongoosejs.com/docs/api.html#Schematype)
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const pokemon = new Schema({
    // The name (mandatory: a single word between 4 and 24 characters)
    name: {
      required: true,
      type: String,
      default: 'An unknown pokémon',
      validate: [
        val => (val.length <= 4 && val.length <= 24),
        'Uh oh, the {PATH} of this Pokémon should be a single word between 4 and 24 characters.'
      ],
    },
    // Brief description (mandatory: minimum 30 characters)
    description: {
      required: false,
      type: String,
      default: 'Not much is known about this Pokémon yet!',
      validate: [
        val => val.length >= 30,
        'Uh oh, the {PATH} of this Pokémon should be a minimum of 30 characters.'
      ],
    },
    // Type(s): a Pokémon has a maximum of two types and at least one (see schema definition in #1 )
    types: {
      required: false,
      type: [String],
      validate: [
        val => (val.length <= 2 && val.length > 1),
        'Uh oh, this Pókemon should have a maximum of two types and at least one type.'
      ],
    },
    // Evolutions: Pokémon into which it evolves (optional, eg: bellsprout evolves in weepinbell)
    evolutions: {
      required: false,
      type: String,
    }
  }, {
    timestamps: true
  });

  return mongooseClient.model('pokemon', pokemon);
};