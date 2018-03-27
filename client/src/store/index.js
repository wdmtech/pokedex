import Vue from 'vue'
import Vuex from 'vuex'
import feathersVuex from 'feathers-vuex'
import feathersClient from '../feathers-client'

const { service } = feathersVuex(feathersClient, { idField: '_id' })

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    service('pokemons')
  ]
})
