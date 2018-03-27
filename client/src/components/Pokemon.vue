<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        {{ pokemon.name }}
      </p>
      <a href="#" class="card-header-icon" aria-label="more options">
      <span class="icon">
        <i class="fa fa-angle-down" aria-hidden="true"></i>
      </span>
      </a>
    </header>
    <div class="card-content">
      <div class="content">
        <img :src="pokemon.image" alt="">
        <div class="tags">
          <span class="tag"  v-for="type in pokemon.types" :key="type">
            #{{ type }}
          </span>
        </div>

        <article class="message is-success">
          <div class="message-body">
            {{ pokemon.description }}
          </div>
        </article>

        <div class="muted">
          <time datetime="2016-1-1">Added {{ pokemon.createdAt }}</time>
          <br>
          <time datetime="2016-1-1">Updated {{ pokemon.updatedAt }}</time>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <a href="#" class="card-footer-item">Save</a>
      <a href="#" class="card-footer-item">Edit</a>
      <a href="#" class="card-footer-item">Delete</a>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'pokemon',
  props: {
    pokemon: {}
  }
}
</script>
