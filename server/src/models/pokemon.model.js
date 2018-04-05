// pokemon-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// (and http://mongoosejs.com/docs/api.html#Schematype)
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const pokemon = new Schema({
    // The name (mandatory: a single (unique) word between 4 and 24 characters)
    name: {
      // index: 'text',
      required: true,
      type: String,
      unique: true,
      default: 'An unknown Pokémon',
      validate: [
        val => (val.length >= 4 && val.length <= 24),
        'Uh oh, the {PATH} of this Pokémon should be a single word between 4 and 24 characters.'
      ],
    },
    // Brief description (mandatory: minimum 30 characters)
    description: {
      required: true,
      type: String,
      default: 'Not much is known about this Pokémon yet!',
      validate: [
        val => val.length >= 30,
        'Uh oh, the {PATH} of this Pokémon should be a minimum of 30 characters.'
      ],
    },
    // Type(s): a Pokémon has a maximum of two types (see schema definition in #1 )
    types: {
      required: true,
      type: [mongooseClient.Schema.Types.ObjectId],
      validate: [
        val => (val.length > 0 && val.length <= 2),
        'Uh oh, this Pókemon should have at least one, and a maximum of two types. (e.g. Fire, Poison)'
      ],
    },
    // Weakness(es): a Pokémon has at least one weakness (see schema definition in #1 )
    weaknesses: {
      required: true,
      type: [mongooseClient.Schema.Types.ObjectId],
      validate: [
        val => (val.length > 0),
        'Uh oh, this Pókemon should have at least one {PATH}. No Pokémon is undefeatable!'
      ],
    },
    // Evolutions: Pokémon into which it evolves (optional, eg: bellsprout evolves into weepinbell)
    evolves_from: {
      required: false,
      default: null,
      type: mongooseClient.Schema.Types.ObjectId,
    },
    // Evolutions: Pokémon into which it evolves (optional, eg: bellsprout evolves into weepinbell)
    evolves_to: {
      required: false,
      default: null,
      type: mongooseClient.Schema.Types.ObjectId,
    },
    // Image
    image: {
      required: false,
      type: String,
    },
    // Favourite
    favourite: {
      required: false,
      type: Boolean,
    },
    // Show - used in frontend
    show: {
      required: false,
      default: true,
      type: Boolean,
    }
  }, {
    timestamps: true
  });

  // Set indexes
  // pokemon.index({ name: 'text' });

  return mongooseClient.model('pokemon', pokemon);
};
