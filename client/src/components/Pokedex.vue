<template>
  <div>

    <h1 class="title has-text-primary">Pokédex</h1>

    <h2 class="subtitle">The ultimate Pokémon manager</h2>

    <div class="field">
      <p class="control">
        <a class="button is-info is-large is-right" @click="addNewPokemon">
          Create a Pokémon
        </a>
      </p>
    </div>

    <div class="field has-addons">
      <p class="control is-expanded">
        <input type="text"
               class="input is-large"
               placeholder="Find a Pokémon"
               v-model="searchQuery">
      </p>
      <p class="control">
        <a class="button is-primary is-large" @click="showFavourites = !showFavourites">
          {{ showFavourites ? 'Showing favourites' : 'Showing all' }}
        </a>
      </p>

    </div>

    <div class="columns is-multiline">
      <pokemon :pokemon="newPokemon"
               v-if="newPokemon"
               @created="newPokemon = null"
               @cancel="newPokemon = null"
               class="animated bounceIn"></pokemon>
      <pokemon v-for="pokemon in listPokemon"
               :pokemon="pokemon"
               :key="pokemon._id">
      </pokemon>
    </div>

    <span style="font-size: .7em">this demo resets at 00:00 each day</span>

  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import Pokemon from '@/components/Pokemon'
export default {
  name: 'Pokedex',
  components: { Pokemon },
  watch: {
    showFavourites () {
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
    }),
    ...mapGetters('types', {
      listTypes: 'list'
    })
  },
  methods: {
    ...mapActions('pokemon', {
      findPokemon: 'find',
      createPokemon: 'create',
      patchPokemon: 'patch',
      removePokemon: 'remove'
    }),
    ...mapActions('types', {
      findTypes: 'find'
    }),
    addNewPokemon () {
      this.newPokemon = {
        name: 'Unnamed Pokémon',
        description: '',
        image: 'https://via.placeholder.com/475x475?text=?',
        types: [
          this.listTypes[0]._id,
          this.listTypes[1]._id
        ],
        weaknesses: [
          this.listTypes[0]._id,
          this.listTypes[1]._id
        ],
        evolves_from: null,
        evolves_to: null,
        show: false
      }
    },
    async filter () {
      this.$store.commit('pokemon/clearAll')
      let query = {
        name: {
          $search: [this.searchQuery || '']
        },
        $sort: {
          name: 1
        }
      }
      if (this.showFavourites) {
        query.favourite = {
          $in: [true, false]
        }
      }
      await this.findPokemon({ query })
    }
  },
  async created () {
    await this.findTypes({})
    await this.findPokemon({
      query: {
        name: {
          $search: ['']
        },
        $sort: {
          name: 1
        }
      }
    })
  },
  data () {
    return {
      searchQuery: '',
      filteredPokemon: [],
      showFavourites: false,
      newPokemon: null
    }
  }
}
</script>
