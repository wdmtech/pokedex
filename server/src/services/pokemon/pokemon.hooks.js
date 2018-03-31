const { fastJoin } = require('feathers-hooks-common');

const pokemonTypesResolver = {
  joins: {
    types: $select =>
      async (pokemon, context) =>
        pokemon.types =
          await context.app.service('types').find({
            query: {
              _id: { $in: pokemon.types },
              $select: $select || ['name']
            }
          })
  }
};

const pokemonWeaknessesResolver = {
  joins: {
    types: $select =>
      async (pokemon, context) =>
        pokemon.weaknesses =
          await context.app.service('types').find({
            query: {
              _id: { $in: pokemon.weaknesses },
              $select: $select || ['name']
            }
          })
  }
};

const pokemonEvolvesFromResolver = {
  joins: {
    pokemon: $select =>
      async (pokemon, context) =>
        pokemon.evolves_from =
          await context.app.service('pokemon').find({
            query: {
              _id: pokemon.evolves_from,
              $select: $select || ['name', 'image']
            }
          })
  }
};

const pokemonEvolvesToResolver = {
  joins: {
    pokemon: $select =>
      async (pokemon, context) =>
        pokemon.evolves_to =
          await context.app.service('pokemon').find({
            query: {
              _id: pokemon.evolves_to,
              $select: $select || ['name', 'image']
            }
          })
  }
};

const query = {
  types: [['id', 'name', 'color']]
};

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [
      fastJoin(pokemonTypesResolver, query),
      fastJoin(pokemonWeaknessesResolver, query),
      fastJoin(pokemonEvolvesFromResolver),
      fastJoin(pokemonEvolvesToResolver)
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
