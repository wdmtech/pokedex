module.exports = async function(app) {

  const typesService = app.service('types');
  const pokemonService = app.service('pokemon');

  await typesService.remove(null)
  await pokemonService.remove(null)

  let typesData = []

  try {
    typesData = await typesService.create([
      { name: 'fire', color: 'red' },
      { name: 'flying', color: 'blue' },
      { name: 'water', color: 'lightblue' },
      { name: 'fighting', color: 'orange' },
      { name: 'electrical', color: 'darkyellow' },
      { name: 'plant', color: 'green' },
      { name: 'poison', color: 'darkgreen' },
      { name: 'ice', color: 'deepblue' },
      { name: 'fairy', color: 'pink' },
      { name: 'bug', color: 'lightgreen' },
      { name: 'ghost', color: 'gray' },
      { name: 'rock', color: 'darkgray' },
      { name: 'ground', color: 'lightgray' },
      { name: 'psychic', color: 'violet' },
    ]);
  } catch (e) {

    console.error(e)
  }

  const getOrCreateTypeByName = async (types, name) => {
    const type = types.find(type => type.name === name)
    if (type) {
      // Found the type
      return type._id
    } else {
      // Create the type
      return await typesService.create({ name })
    }
  }

  try {

    let result = await pokemonService.create(
      [
        {
          name: 'Charizard',
          description: 'A fiery, dragon type Pokémon, that will roast you if you get too close.',
          image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png',
          types: [
            await getOrCreateTypeByName(typesData, 'fire'),
            await getOrCreateTypeByName(typesData, 'flying'),
          ],
          weaknesses: [
            await getOrCreateTypeByName(typesData, 'water'),
          ],
        },
        {
          name: 'Bulbasaur',
          description: 'It is easy to see Bulbasaur taking a nap in the sun. The seed that it has in the back is growing more and more as it absorbs the rays of the sun.',
          image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
          types: [
            await getOrCreateTypeByName(typesData, 'plant'),
            await getOrCreateTypeByName(typesData, 'poison'),
          ],
          weaknesses: [
            await getOrCreateTypeByName(typesData, 'fire'),
          ],
        }
      ]
    )

    console.log(result)

  } catch (e) {

    console.error(e)
  }

}
