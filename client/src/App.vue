<template>
  <div id="app">
    <section class="hero is-fullheight">
      <!-- Hero head: will stick at the top -->
      <div class="hero-head">
        <header class="navbar is-fixed-top">
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
                  Home
                </a>
                <span class="navbar-item">
                  <a class="button is-primary is-inverted" target="_blank" href="https://github.com/wdmtech/pokedex">
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
      </div>

      <!-- Hero content: will be in the middle -->
      <div class="hero-body">
        <div class="container">
          <router-view/>
        </div>
      </div>

      <!-- Hero footer: will stick at the bottom -->
      <div class="hero-foot">
        <nav class="navbar is-fixed-bottom tabs is-toggle is-toggle-rounded is-fullwidth">
          <div class="container">
            <ul>
              <li class="is-active" style="background-color: #fff"><a>All</a></li>
              <li style="background-color: #fff"><a>Favourites</a></li>
            </ul>
          </div>
        </nav>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="sass" type="text/sass">@import "./styles"</style>
