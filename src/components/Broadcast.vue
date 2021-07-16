<template>
  <div>
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h3 class="text-center">Choose Movie to Broadcast</h3>
          <form ref="broadCastForm" id="broadCastForm">
            <select name="movie" v-model="broadcast.name" id="movie" class="form-control mb-3">
              <option value="" disabled selected>--- Select Movie ---</option>
              <option v-for="movie in movies" :value="movie.name" :key="movie.id">{{ movie.name }}</option>
            </select>
            <div class="text-danger text-center mb-3" v-if="!$v.broadcast.name.required && $v.broadcast.name.$dirty">Movie is required to Broadcast</div>
            <p class="text-center">
              <button @click.prevent="validateData" class="btn btn-lg btn-primary">Broadcast the Movie</button>
            </p>
          </form>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { required } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      movies: [],
      broadcast: { name:'' },
      broadCastBaseURL: 'http://192.168.1.3/moviez/index.php/Broadcast',
      movieBaseURL: 'http://192.168.1.3/moviez/index.php/Movies',
      token: '7110eda4d09e062aa5e4a390b0a572ac0d2c0220'
    }
  },
  created() {
    this.getMovies()
  },
  validations: {
    broadcast: {
      name: { required }
    }
  },
  methods: {
    validateData() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        if(confirm('Are you sure you want to broadcast this Movie Show?')) {
          this.broadCast();
        }
      }
    },
    broadCast() {
      let vm = this, formData = new FormData(vm.$refs.broadCastForm);
      formData.append('token', vm.token);
      this.$axios.post(`${this.broadCastBaseURL}`, formData)
      .then(res => { 
        if(res.status === 200) {
          Vue.$toast.success(`Congratulations, ${res.data.message}`)
        }
       })
      .catch(err => console.log(err))
    },
    getMovies() {
      let vm = this;
      this.$axios.get(`${this.movieBaseURL}/${this.token}`)
      .then(res => {
        if(res.status === 200) {
          vm.movies = res.data.data;
        }
      })
      .catch(err => console.log(err))
    }
  }
}
</script>