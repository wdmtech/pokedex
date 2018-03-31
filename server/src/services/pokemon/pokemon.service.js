// Initializes the `pokemon` service on path `/pokemon`
const createService = require('feathers-mongoose');
const createModel = require('../../models/pokemon.model');
const hooks = require('./pokemon.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'pokemon',
    Model,
    // paginate
  };

  // Initialize our service with any options it requires
  app.use('/pokemon', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('pokemon');

  service.hooks(hooks);
};
