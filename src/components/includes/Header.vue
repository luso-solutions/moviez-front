<template>
  <div>
    <ul>
      <router-link class="li" to="/admin/movies">Movies</router-link>
      <router-link class="li" to="/admin/genres">Movie Genres</router-link>
      <router-link class="li" to="/admin/broadcast">Broadcast</router-link>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  display: flex;
  justify-content: center;
}
ul .li {
  margin: 0 15px;
}
ul .li {
  display: block;
  border: 1px solid #ccc;
  text-decoration: none;
  padding: 4px 14px;
}
</style>