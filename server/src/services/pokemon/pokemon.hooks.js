const { fastJoin } = require('feathers-hooks-common');
const searchRegex = require('../../hooks/search-regex');

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
    all: [
      // Custom hook to do a case-insensitive fuzz-search on 'name' attributes using Regex
      searchRegex(),
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [
      // Prevent the user from having more than 10 favourite Pokémon
      async context => {
        if (context.data.favourite) {
          let favouriteLimit = 10
          let result
          try {
            result = await context.app.service('pokemon').find({ query: { favourite: true } })
          } catch (e) {
            console.error(e)
          }

          if (result.length >= favouriteLimit) {
            throw new Error(`You already have the maximum of ${favouriteLimit} favourite Pokémon`)
          }
        }

        return context
      }
    ],
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
