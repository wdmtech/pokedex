const types = require('./types/types.service.js');
const pokemon = require('./pokemon/pokemon.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(types);
  app.configure(pokemon);
};
