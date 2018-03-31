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
      { name: 'electric', color: '#afaf0c' },
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
          name: 'Charmander',
          description: 'The flame that burns at the tip of its tail is an indication of its emotions. The flame wavers when Charmander is enjoying itself. If the Pokémon becomes enraged, the flame burns fiercely.',
          image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png',
          types: [
            await getOrCreateTypeByName(typesData, 'fire'),
          ],
          weaknesses: [
            await getOrCreateTypeByName(typesData, 'ground'),
            await getOrCreateTypeByName(typesData, 'rock'),
            await getOrCreateTypeByName(typesData, 'water'),
          ],
        },
        {
          name: 'Charmelion',
          description: 'Charmeleon mercilessly destroys its foes using its sharp claws. If it encounters a strong foe, it turns aggressive. In this excited state, the flame at the tip of its tail flares with a bluish white color.',
          image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/005.png',
          types: [
            await getOrCreateTypeByName(typesData, 'fire'),
          ],
          weaknesses: [
            await getOrCreateTypeByName(typesData, 'ground'),
            await getOrCreateTypeByName(typesData, 'rock'),
            await getOrCreateTypeByName(typesData, 'water'),
          ],
        },
        {
          name: 'Charizard',
          description: 'A fiery, dragon type Pokémon, that will roast you if you get too close.',
          image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png',
          types: [
            await getOrCreateTypeByName(typesData, 'fire'),
            await getOrCreateTypeByName(typesData, 'flying'),
          ],
          weaknesses: [
            await getOrCreateTypeByName(typesData, 'rock'),
            await getOrCreateTypeByName(typesData, 'electric'),
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

    const setupEvolutions = async (name = null, evolvesFromName = null, evolvesToName = null) => {
      // Get the Pokémon to modify
      let pokemon = await pokemonService.find({ query: { name }, $limit: 1 })

      if (pokemon && pokemon.length) {
        pokemon = pokemon[0]

        if (evolvesFromName && evolvesFromName.length) {
          let pokemonEvolvesFrom = await pokemonService.find({ query: { name: evolvesFromName } })
          if (pokemonEvolvesFrom && pokemonEvolvesFrom.length) {
            pokemonEvolvesFrom = pokemonEvolvesFrom[0]
            await pokemonService.patch(pokemon._id, { evolves_from: pokemonEvolvesFrom._id })
          }
        }

        if (evolvesToName && evolvesToName.length) {
          let pokemonEvolvesTo = await pokemonService.find({ query: { name: evolvesToName } })
          if (pokemonEvolvesTo && pokemonEvolvesTo.length) {
            pokemonEvolvesTo = pokemonEvolvesTo[0]
            await pokemonService.patch(pokemon._id, { evolves_to: pokemonEvolvesTo._id })
          }
        }

      } else {
        console.error(`Pokémon '${name}'does not exist! Couldn't set up evolutions.`)
      }
    }

    await setupEvolutions('Charmander', null, 'Charmelion');
    await setupEvolutions('Charmelion', 'Charmander', 'Charizard');
    await setupEvolutions('Charizard', 'Charmelion', null);

  } catch (e) {

    console.error(e)
  }

}
