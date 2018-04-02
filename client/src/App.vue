<template>
  <div id="app">

    <notifications group="foo" />

    <div class="container">

      <header class="navbar is-dark is-fixed-top">
        <div class="container">
          <div class="navbar-brand">
            <a class="navbar-item">
              Pokédex
            </a>
            <span class="navbar-burger burger" data-target="navbarMenuHeroC">
            <span></span>
            <span></span>
            <span></span>
          </span>
          </div>
          <div id="navbarMenuHeroC" class="navbar-menu">
            <div class="navbar-end">
              <a class="navbar-item is-active">
                Create a Pokémon
              </a>
              <span class="navbar-item">
                  <a class="button is-dark is-inverted is-outlined" target="_blank" href="https://github.com/wdmtech/pokedex">
                    <span class="icon">
                      <i class="fa fa-github"></i>
                    </span>
                    <span>View on GitHub</span>
                  </a>
                </span>
            </div>
          </div>
        </div>
      </header>

      <div class="container">
        <router-view/>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="sass" type="text/sass">@import "./styles"</style>
