module.exports = async function(app) {

  const TYPES = {
    FIRE: 'fire',
    FLYING: 'flying',
    WATER: 'water',
    FIGHTING: 'fighting',
    ELECTRICAL: 'electrical',
    PLANT: 'plant',
    POISON: 'poison',
    ICE: 'ice',
    FAIRY: 'fairy',
    BUG: 'bug',
    GHOST: 'ghost',
    ROCK: 'rock',
    GROUND: 'ground',
    PSYCHIC: 'psychic',
  }

  const pokemon = [
    {
      name: 'Charizard',
      description: 'A fiery, dragon type Pokémon, that will roast you if you get too close.',
      image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png',
      types: [TYPES.FIRE, TYPES.FLYING],
      weaknesses: [TYPES.WATER],
    },
    {
      name: 'Bulbasaur',
      description: 'It is easy to see Bulbasaur taking a nap in the sun. The seed that it has in the back is growing more and more as it absorbs the rays of the sun.',
      image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
      types: [TYPES.PLANT, TYPES.POISON],
      weaknesses: [TYPES.FIRE],
    }
  ]

  try {

    let result = await this.service('pokemon').create(pokemon)

    console.log(result)

  } catch (e) {

    console.error(e)
  }

}
