<template>
  <div>
    <h1 class="title has-text-primary">Pokédex</h1>

    <h2 class="subtitle">The ultimate Pokémon manager</h2>

    <div class="field has-addons">
      <p class="control is-expanded">
        <input type="text"
               class="input is-large"
               placeholder="Find a Pokémon"
               v-model="searchQuery">
      </p>
      <p class="control">
        <a class="button is-primary is-large" @click="includeFavourites = !includeFavourites">
          {{ includeFavourites ? 'Including' : 'Hiding' }} favourites
        </a>
      </p>
    </div>

    <div class="columns is-multiline">
      <pokemon v-for="pokemon in listPokemon"
               :pokemon="pokemon"
               :key="pokemon._id">
      </pokemon>
    </div>

  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import Pokemon from '@/components/Pokemon'
export default {
  name: 'Pokedex',
  components: { Pokemon },
  watch: {
    includeFavourites () {
      this.filter(this.searchQuery)
    },
    searchQuery () {
      this.filter(this.searchQuery)
    }
  },
  computed: {
    ...mapState(['pokemon']),
    ...mapGetters('pokemon', {
      findPokemonInStore: 'find',
      listPokemon: 'list',
      currentPokemon: 'current'
    })
  },
  methods: {
    ...mapActions('pokemon', {
      findPokemon: 'find',
      createPokemon: 'create',
      patchPokemon: 'patch',
      removePokemon: 'remove'
    }),
    async filter () {
      this.$store.commit('pokemon/clearAll')
      let query = {
        name: {
          $search: [this.searchQuery || '']
        }
      }
      if (this.includeFavourites) {
        query.$or = [
          { favourite: true },
          { favourite: false }
        ]
      } else {
        query.favourite = false
      }
      console.log(query)
      await this.findPokemon({ query })
    }
  },
  async created () {
    await this.findPokemon({
      query: {
        name: {
          $search: ['']
        }}})
  },
  data () {
    return {
      searchQuery: '',
      filteredPokemon: [],
      includeFavourites: true
    }
  }
}
</script>
