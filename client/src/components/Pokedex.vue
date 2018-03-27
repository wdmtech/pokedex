<template>
  <div>
    <h1 class="title has-text-primary">
      Pokédex
    </h1>
    <h2 class="subtitle">
      The ultimate Pokémon manager
    </h2>

    <pokemon v-for="pokemon in listPokemon"
             :pokemon="pokemon"
             :key="pokemon._id">
    </pokemon>

  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import Pokemon from '@/components/Pokemon'
export default {
  name: 'Pokedex',
  components: { Pokemon },
  computed: {
    ...mapState(['pokemon']),
    ...mapGetters('pokemon', {
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
    })
  },
  async created () {
    await this.findPokemon({})
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
