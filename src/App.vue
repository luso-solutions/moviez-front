<template>
  <div class="container">
    <div class="row">
      <Header />
      <router-view class="col"></router-view>
    </div>
  </div>
</template>

<script>
import Header from './components/includes/Header.vue'
export default {
  name: 'App',
  components: {
    Header,
  }
}
</script>

<style>
/*  */
</style>
