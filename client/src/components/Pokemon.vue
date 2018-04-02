<template>
  <div class="column is-4">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          <!-- todo add tooltips -->
          {{ pokemon.name }} <span class="icon has-text-warning" v-if="pokemon.favourite"><i class="fa fa-star"></i></span>
        </p>
        <a href="#" class="card-header-icon" aria-label="more options">
      <span class="icon" @click="pokemon.show = !pokemon.show">
        <i class="fa fa-angle-down" aria-hidden="true" ></i>
      </span>
        </a>
      </header>
      <div class="card-content">
        <div class="content">

          <div style="position: relative">
            <figure class="image">
              <img :src="pokemon.image" alt class="pointer animated" @click="toggleFavourite" :data-id="pokemon._id">
              <!--<img v-show="pokemon.favourite" style="position: absolute" @click="toggleFavourite" :data-id="pokemon._id" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 31.201 29.676'><polygon points='15.602,0 19.325,11.279 31.2,11.332 21.624,18.36 25.243,29.676 15.602,22.738 5.96,29.676 9.577,18.36 0,11.332 11.878,11.279' fill='#f3ef07' /></svg>" alt class="animated rotateIn">-->
            </figure>
          </div>

          <div v-if="pokemon.show">

            <hr>

            <h4 class="subtitle">Types</h4>

            <div class="tags">
            <span class="tag" v-for="type in pokemon.types" :key="type._id" :style="{ 'background-color': type.color, 'color': '#fff' }">
              #{{ type.name }}
            </span>
            </div>

            <hr>

            <h4 class="subtitle">Weaknesses</h4>

            <div class="tags">
            <span class="tag" v-for="type in pokemon.weaknesses" :key="type._id" :style="{ 'background-color': type.color, 'color': '#fff' }">
              #{{ type.name }}
            </span>
            </div>

            <hr>

            <article class="message">
              <div class="message-body">
                {{ pokemon.description }}
              </div>
            </article>

            <h4 class="subtitle">Evolutions</h4>

            <div class="columns">
              <div class="column is-6">
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
              <div class="column is-6">
                <div v-for="evolvesTo in pokemon.evolves_to" :key="evolvesTo._id">
                  <figure>
                    <img :src="evolvesTo.image" v-if="evolvesTo.image">
                    <div v-else>Nothing</div>
                    <figcaption>
                      <span class="has-text-primary">To: </span>{{ evolvesTo.name }}
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div>

            <!--<div class="muted">
              <small>
                <time datetime="2016-1-1">Added {{ pokemon.createdAt }}</time>
              </small>
              <br>
              <small>
                <time datetime="2016-1-1">Updated {{ pokemon.updatedAt }}</time>
              </small>
            </div>-->

          </div>

        </div>
      </div>
      <footer class="card-footer">
        <a href="#" class="card-footer-item">Save</a>
        <a href="#" class="card-footer-item">Edit</a>
        <a href="#" class="card-footer-item">Delete</a>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'pokemon',
  computed: {
    ...mapGetters('pokemon', { getPokemonFromStore: 'get' }),
    ...mapGetters('types', { getTypesFromStore: 'get' })
  },
  mounted () {
  },
  methods: {
    ...mapActions('pokemon', {
      // getPokemon: 'get',
      createPokemon: 'create',
      patchPokemon: 'patch',
      removePokemon: 'remove'
    }),
    ...mapActions('types', {
      getTypes: 'get'
    }),
    async toggleFavourite (e) {
      try {
        let pokemon = await this.getPokemonFromStore(e.target.dataset['id'])
        await this.patchPokemon([pokemon._id, { favourite: !pokemon.favourite }])
      } catch (e) {
        console.error(e)
      } finally {
        e.target.classList.remove('bounce')
        window.setTimeout(() => {
          e.target.classList.add('bounce')
        }, 50)
        window.setTimeout(() => {
          e.target.nextElementSibling.classList.add('rotateOut')
        }, 0)
      }
    }
  },
  props: {
    pokemon: {}
  },
  data () {
    return {
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
