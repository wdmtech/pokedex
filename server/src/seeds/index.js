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
      { name: 'grass', color: 'green' },
      { name: 'poison', color: 'darkgreen' },
      { name: 'ice', color: 'cornflowerblue' },
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
          name: 'Bulbasaur',
          description: 'It is easy to see Bulbasaur taking a nap in the sun. The seed that it has in the back is growing more and more as it absorbs the rays of the sun.',
          image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png',
          types: [
            await getOrCreateTypeByName(typesData, 'grass'),
            await getOrCreateTypeByName(typesData, 'poison'),
          ],
          weaknesses: [
            await getOrCreateTypeByName(typesData, 'fire'),
            await getOrCreateTypeByName(typesData, 'flying'),
            await getOrCreateTypeByName(typesData, 'ice'),
            await getOrCreateTypeByName(typesData, 'psychic'),
          ],
        },
        {
          name: 'Ivysaur',
          description: 'There is a bud on this Pokémon\'s back. To support its weight, Ivysaur\'s legs and trunk grow thick and strong. If it starts spending more time lying in the sunlight, it\'s a sign that the bud will bloom into a large flower soon.',
          image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/002.png',
          types: [
            await getOrCreateTypeByName(typesData, 'grass'),
            await getOrCreateTypeByName(typesData, 'poison'),
          ],
          weaknesses: [
            await getOrCreateTypeByName(typesData, 'fire'),
            await getOrCreateTypeByName(typesData, 'flying'),
            await getOrCreateTypeByName(typesData, 'ice'),
            await getOrCreateTypeByName(typesData, 'psychic'),
          ],
        },
        {
          name: 'Venusaur',
          description: 'There is a large flower on Venusaur\'s back. The flower is said to take on vivid colors if it gets plenty of nutrition and sunlight. The flower\'s aroma soothes the emotions of people.',
          image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/003.png',
          types: [
            await getOrCreateTypeByName(typesData, 'grass'),
            await getOrCreateTypeByName(typesData, 'poison'),
          ],
          weaknesses: [
            await getOrCreateTypeByName(typesData, 'fire'),
            await getOrCreateTypeByName(typesData, 'flying'),
            await getOrCreateTypeByName(typesData, 'ice'),
            await getOrCreateTypeByName(typesData, 'psychic'),
          ],
        },
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
          name: 'Squirtle',
          description: 'Squirtle\'s shell is not merely used for protection. The shell\'s rounded shape and the grooves on its surface help minimize resistance in water, enabling this Pokémon to swim at high speeds.',
          image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png',
          types: [
            await getOrCreateTypeByName(typesData, 'water'),
          ],
          weaknesses: [
            await getOrCreateTypeByName(typesData, 'electric'),
            await getOrCreateTypeByName(typesData, 'grass'),
          ],
        },
        {
          name: 'Wartortle',
          description: 'Its tail is large and covered with a rich, thick fur. The tail becomes increasingly deeper in color as Wartortle ages. The scratches on its shell are evidence of this Pokémon\'s toughness as a battler.',
          image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/008.png',
          types: [
            await getOrCreateTypeByName(typesData, 'water'),
          ],
          weaknesses: [
            await getOrCreateTypeByName(typesData, 'electric'),
            await getOrCreateTypeByName(typesData, 'grass'),
          ],
        },
        {
          name: 'Blastoise',
          description: 'Blastoise has water spouts that protrude from its shell. The water spouts are very accurate. They can shoot bullets of water with enough accuracy to strike empty cans from a distance of over 160 feet.',
          image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/009.png',
          types: [
            await getOrCreateTypeByName(typesData, 'water'),
          ],
          weaknesses: [
            await getOrCreateTypeByName(typesData, 'electric'),
            await getOrCreateTypeByName(typesData, 'grass'),
          ],
        },
        {
          name: 'Caterpie',
          description: 'Caterpie has a voracious appetite. It can devour leaves bigger than its body right before your eyes. From its antenna, this Pokémon releases a terrifically strong odor.',
          image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/010.png',
          types: [
            await getOrCreateTypeByName(typesData, 'bug'),
          ],
          weaknesses: [
            await getOrCreateTypeByName(typesData, 'fire'),
            await getOrCreateTypeByName(typesData, 'flying'),
            await getOrCreateTypeByName(typesData, 'rock'),
          ],
        },
        {
          name: 'Metapod',
          description: 'The shell covering this Pokémon\'s body is as hard as an iron slab. Metapod does not move very much. It stays still because it is preparing its soft innards for evolution inside the hard shell.',
          image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/011.png',
          types: [
            await getOrCreateTypeByName(typesData, 'bug'),
          ],
          weaknesses: [
            await getOrCreateTypeByName(typesData, 'fire'),
            await getOrCreateTypeByName(typesData, 'flying'),
            await getOrCreateTypeByName(typesData, 'rock'),
          ],
        },
        {
          name: 'Butterfree',
          description: 'Butterfree has a superior ability to search for delicious honey from flowers. It can even search out, extract, and carry honey from flowers that are blooming over six miles from its nest.',
          image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/012.png',
          types: [
            await getOrCreateTypeByName(typesData, 'bug'),
            await getOrCreateTypeByName(typesData, 'flying'),
          ],
          weaknesses: [
            await getOrCreateTypeByName(typesData, 'rock'),
            await getOrCreateTypeByName(typesData, 'electric'),
            await getOrCreateTypeByName(typesData, 'fire'),
            await getOrCreateTypeByName(typesData, 'flying'),
            await getOrCreateTypeByName(typesData, 'ice'),
          ],
        },
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

    // X evolves, from Y, to Z

    await setupEvolutions('Charmander', null, 'Charmelion');
    await setupEvolutions('Charmelion', 'Charmander', 'Charizard');
    await setupEvolutions('Charizard', 'Charmelion', null);

    await setupEvolutions('Bulbasaur', null, 'Ivysaur');
    await setupEvolutions('Ivysaur', 'Bulbasaur', 'Venusaur');
    await setupEvolutions('Venusaur', 'Ivysaur', null);

    await setupEvolutions('Squirtle', null, 'Wartortle');
    await setupEvolutions('Wartortle', 'Squirtle', 'Blastoise');
    await setupEvolutions('Blastoise', 'Wartortle', null);

    await setupEvolutions('Caterpie', null, 'Metapod');
    await setupEvolutions('Metapod', 'Caterpie', 'Butterfree');
    await setupEvolutions('Butterfree', 'Metapod', null);

  } catch (e) {

    console.error(e)
  }

}
