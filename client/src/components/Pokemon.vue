<template>
  <div class="column is-4">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          <!-- todo add tooltips -->

          <!--pokemon name - editable-->
          <span ref="pokemonName"
                :contenteditable="editingName"
                :style="{ 'background-color': editingName ? '#cccccc' : '' }">
            {{ pokemon.name }}
          </span>&nbsp;

          <!--pokemon name - edit/save button-->
          <span class="tag button is-small is-info is-outlined" @click="startEditingName">
            <span v-if="!editingName">Edit</span>
            <span v-if="editingName" @click="editName">Save</span>
          </span>

          <!--pokemon - favourite indicator (star)-->
          <span class="icon has-text-warning" v-if="pokemon.favourite"><i class="fa fa-star"></i></span>

        </p>

        <!--pokemon 'show more' button - only show when pokemon has an _id-->
        <a href="#"
           class="card-header-icon"
           aria-label="more options"
           v-if="pokemon._id"
           @click="pokemon.show = !pokemon.show">
          <span class="icon" >
            <i class="fa fa-angle-down" aria-hidden="true" ></i>
          </span>
        </a>
      </header>
      <div class="card-content">
        <div class="content">

          <!--pokemon image-->
          <div style="position: relative">
            <figure class="image">
              <img :src="pokemon.image" alt class="pointer animated" @click="toggleFavourite" :data-id="pokemon._id">
              <!--<img v-show="pokemon.favourite" style="position: absolute" @click="toggleFavourite" :data-id="pokemon._id" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 31.201 29.676'><polygon points='15.602,0 19.325,11.279 31.2,11.332 21.624,18.36 25.243,29.676 15.602,22.738 5.96,29.676 9.577,18.36 0,11.332 11.878,11.279' fill='#f3ef07' /></svg>" alt class="animated rotateIn">-->
            </figure>
          </div>

          <h6>Description</h6>

          <!--description and description editing-->
          <article class="message">
            <div class="message-body">
              <!--only show if this pokemon has a _id-->
              <div v-if="pokemon._id">
                <button class="button is-small is-info is-outlined is-pulled-right"
                        v-if="!editingDescription"
                        @click="startEditingDescription">
                  Edit
                </button>
                <button class="button is-small is-info is-outlined is-pulled-right"
                        v-if="editingDescription"
                        @click="editDescription">
                  Save
                </button>
              </div>
              <div :contenteditable="editingDescription || !pokemon._id"
                   :style="{ 'background-color': (editingName && !pokemon._id) || editingDescription ? '#cccccc' : '' }"
                   ref="pokemonDescription">
                {{ pokemon.description }}
              </div>
            </div>
          </article>


          <!--only show if pokemon.show === true-->
          <div v-if="pokemon.show">

            <hr>

            <!--pokemon types-->
            <h4 class="subtitle">Types</h4>

            <div class="tags">
            <span class="tag" v-for="pokemonType in pokemon.types" :key="pokemonType._id" :style="{ 'background-color': pokemonType.color, 'color': '#fff' }">
              #{{ pokemonType.name }}
              <span class="delete" @click="removeType(pokemon, pokemonType)"></span>
            </span>

            <!--pokemon types - edit/cancel button-->
            <span class="button tag is-info is-outlined" @click="addingType = !addingType">
              <span v-if="!addingType">Add type&hellip;</span>
              <span v-if="addingType">Cancel</span>
            </span>

            <!--pokemon types - choose a type-->
            <div class="select is-small" v-show="addingType">
              <select @change="addType">
                <option value disabled>Choose a type</option>
                <option v-for="type in listTypes" :value="type._id" :key="type._id">{{ type.name }}</option>
              </select>
            </div>

            </div>

            <hr>

            <h4 class="subtitle">Weaknesses</h4>

            <!--pokemon weaknesses-->
            <div class="tags">
              <span class="tag" v-for="type in pokemon.weaknesses" :key="type._id" :style="{ 'background-color': type.color, 'color': '#fff' }">
                #{{ type.name }}
                <span class="delete" @click="removeWeakness(pokemon, type)"></span>
              </span>

                <!--pokemon weaknesses - edit/cancel button-->
              <span class="button tag is-info is-outlined" @click="addingWeakness = !addingWeakness">
                <span v-if="!addingWeakness">Add type&hellip;</span>
                <span v-if="addingWeakness">Cancel</span>
              </span>

              <!--pokemon weaknesses - choose a type-->
              <div class="select is-small" v-show="addingWeakness">
                <select @change="addWeakness">
                  <option value disabled>Choose a type</option>
                  <option v-for="type in listTypes" :value="type._id" :key="type._id">{{ type.name }}</option>
                </select>
              </div>

            </div>

            <hr>

            <h4 class="subtitle">Evolutions</h4>

            <div class="columns is-mobile">
              <!--evolves from-->
              <div class="column is-6">
                <!--edit evolves from-->
                <div class="has-text-centered">
                  <button class="button is-small is-info is-outlined" @click="editingEvolutionFrom = true">Edit</button>
                  <div class="select is-small" v-show="editingEvolutionFrom">
                    <select @change="updateEvolutionFrom">
                      <option value disabled>Choose a Pokémon</option>
                      <option :value="null">None</option>
                      <option v-for="evolution in listPokemon" :value="evolution._id" :key="evolution._id">{{ evolution.name }}</option>
                    </select>
                  </div>
                </div>
                <div v-for="evolvesFrom in pokemon.evolves_from" :key="evolvesFrom._id">
                  <figure>
                    <img :src="evolvesFrom.image" v-if="evolvesFrom.image">
                    <div v-else>Nothing</div>
                    <figcaption>
                      <span class="has-text-primary">From: </span>{{ evolvesFrom.name }}
                    </figcaption>
                  </figure>
                </div>
              </div>
              <!--evolves to-->
              <div class="column is-6">
                <!--edit evolves to-->
                <div class="has-text-centered">
                  <button class="button is-small is-info is-outlined" @click="editingEvolutionTo = true">Edit</button>
                  <div class="select is-small" v-show="editingEvolutionTo">
                    <select @change="updateEvolutionTo">
                      <option value disabled>Choose a Pokémon</option>
                      <option :value="null">None</option>
                      <option v-for="evolution in listPokemon" :value="evolution._id" :key="evolution._id">{{ evolution.name }}</option>
                    </select>
                  </div>
                </div>
                <div v-for="evolvesTo in pokemon.evolves_to" :key="evolvesTo._id">
                  <figure>
                    <img :src="evolvesTo.image" v-if="evolvesTo.image">
                    <img src="https://placeholder.com/475/475" v-else>
                    <figcaption>
                      <span class="has-text-primary">To: </span>{{ evolvesTo.name }}
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--pokemon - delete button-->
      <footer class="card-footer" v-if="pokemon._id">
        <a href="#" class="card-footer-item has-text-danger" @click="removePokemon(pokemon._id)">Delete {{ pokemon.name }}</a>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'pokemon',
  computed: {
    // ...mapState(['types']),
    ...mapGetters('pokemon', {
      getPokemonFromStore: 'get',
      listPokemon: 'list'
    }),
    ...mapGetters('types', {
      listTypes: 'list'
    })
  },
  async created () {
    await this.findTypes({})
  },
  methods: {
    ...mapActions('pokemon', {
      createPokemon: 'create',
      patchPokemon: 'patch',
      removePokemon: 'remove'
    }),
    ...mapActions('types', {
      findTypes: 'find'
    }),
    async toggleFavourite (e) {
      try {
        let pokemon = await this.getPokemonFromStore(e.target.dataset['id'])
        let result = await this.patchPokemon([pokemon._id, { favourite: !pokemon.favourite }])
        e.target.classList.remove('bounce')
        e.target.classList.remove('shake')
        if (result.favourite) {
          this.$notify({
            group: 'foo',
            type: 'success',
            title: 'Wahoo!',
            text: `${pokemon.name} is one of your new favourite Pokémon!`
          })
          window.setTimeout(() => {
            e.target.classList.add('bounce')
          }, 50)
        } else {
          this.$notify({
            group: 'foo',
            type: 'warn',
            title: `Poor ${pokemon.name}!`,
            text: `${pokemon.name} is no longer one of your favourites, but don't worry - he understands&hellip; 😭`
          })
          window.setTimeout(() => {
            e.target.classList.add('shake')
          }, 50)
        }
      } catch (e) {
        this.$notify({
          group: 'foo',
          type: 'error',
          title: `Error`,
          text: e.message
        })
      }
    },
    async addType (e) {
      let newTypeIds = this.pokemon.types.map(type => type._id)
      newTypeIds.push(e.target.value)
      try {
        await this.patchPokemon([ this.pokemon._id, { types: newTypeIds } ])
      } catch (e) {
        this.$notify({
          group: 'foo',
          type: 'warn',
          title: 'Error',
          text: e.message
        })
      } finally {
        this.addingType = false
      }
    },
    async addWeakness (e) {
      let newTypeIds = this.pokemon.weaknesses.map(type => type._id)
      newTypeIds.push(e.target.value)
      try {
        await this.patchPokemon([ this.pokemon._id, { weaknesses: newTypeIds } ])
      } catch (e) {
        this.$notify({
          group: 'foo',
          type: 'warn',
          title: 'Error',
          text: e.message
        })
      } finally {
        this.addingWeakness = false
      }
    },
    async removeType (pokemon, typeToRemove) {
      let newTypeIds = pokemon.types.filter(type => type !== typeToRemove).map(type => type._id)
      try {
        await this.patchPokemon([ pokemon._id, { types: newTypeIds } ])
      } catch (e) {
        this.$notify({
          group: 'foo',
          type: 'warn',
          title: 'Error',
          text: e.message
        })
      }
    },
    async removeWeakness (pokemon, typeToRemove) {
      let newTypeIds = pokemon.weaknesses.filter(type => type !== typeToRemove).map(type => type._id)
      try {
        await this.patchPokemon([ pokemon._id, { weaknesses: newTypeIds } ])
      } catch (e) {
        this.$notify({
          group: 'foo',
          type: 'warn',
          title: 'Error',
          text: e.message
        })
      }
    },
    startEditingName () {
      this.editingName = true
      let element = this.$refs.pokemonName
      this.$nextTick(() => {
        element.focus()
      })
    },
    async editName () {
      let element = this.$refs.pokemonName.innerText
      this.$nextTick(() => {
        element.focus()
      })
      try {
        if (this.pokemon._id) {
          await this.patchPokemon([ this.pokemon._id, { name: element.innerText } ])
        } else {
          // Create a brand new Pokémon (mix in the name and description properties)
          await this.createPokemon({
            ...this.pokemon,
            name: this.$refs.pokemonName.innerText,
            description: this.$refs.pokemonDescription.innerText,
            show: true
          })
          // send event to Pokedex to indicate the pokemon was created
          this.$emit('created')
        }
        this.editingName = false
      } catch (e) {
        this.$notify({
          group: 'foo',
          type: 'warn',
          title: 'Error',
          text: e.message
        })
      }
    },
    startEditingDescription () {
      this.editingDescription = true
      let element = this.$refs.pokemonDescription
      this.$nextTick(() => {
        element.focus()
      })
    },
    async editDescription () {
      let element = this.$refs.pokemonDescription
      this.$nextTick(() => {
        element.focus()
      })
      try {
        await this.patchPokemon([ this.pokemon._id, { description: element.innerText } ])
        this.editingDescription = false
      } catch (e) {
        this.$notify({
          group: 'foo',
          type: 'warn',
          title: 'Error',
          text: e.message
        })
      }
    },
    async updateEvolutionFrom (e) {
      try {
        await this.patchPokemon([ this.pokemon._id, { evolves_from: e.target.value || null } ])
        this.editingEvolutionFrom = false
      } catch (e) {
        this.$notify({
          group: 'foo',
          type: 'warn',
          title: 'Error',
          text: e.message
        })
      }
    },
    async updateEvolutionTo (e) {
      try {
        await this.patchPokemon([ this.pokemon._id, { evolves_to: e.target.value || null } ])
        this.editingEvolutionTo = false
      } catch (e) {
        this.$notify({
          group: 'foo',
          type: 'warn',
          title: 'Error',
          text: e.message
        })
      }
    }
  },
  props: {
    pokemon: {}
  },
  data () {
    return {
      addingType: false,
      addingWeakness: false,
      editingName: false,
      editingDescription: false,
      editingEvolutionFrom: false,
      editingEvolutionTo: false
    }
  }
}
</script>

<style scoped>
  .message-body {
    height: 8em;
    overflow: scroll;
  }
  hr { opacity: .5 }
</style>
