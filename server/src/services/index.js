const pokemon = require('./pokemon/pokemon.service.js');
const types = require('./types/types.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(pokemon);
  app.configure(types);
};
