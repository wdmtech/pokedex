import Vue from 'vue'
import Router from 'vue-router'
import Pokedex from '@/components/Pokedex'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Pokedex',
      component: Pokedex
    }
  ]
})
