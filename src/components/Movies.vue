<template>
  <div>
    <h3 class="mb-5">
      Listed Movies
      <button class="btn btn-outline-secondary float-end" data-bs-toggle="modal" data-bs-target="#movieModal">Add New Movie</button>
    </h3>
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Date</th>
          <th>Time</th>
          <th>Starring</th>
          <th>Genres</th>
          <th>Rating</th>
          <th class="text-center">Edit</th>
          <th class="text-center">Del</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(movie,i) in movies" :key="movie.id">
          <td>{{ movie.name }}</td>
          <td>{{ movie.date }}</td>
          <td>{{ movie.time }}</td>
          <td>{{ movie.starring }}</td>
          <td>{{ movie.genres }}</td>
          <td>{{ movie.rating }}</td>
          <td class="text-center"><a @click.prevent="loadForm(i)" href="#">Edit</a></td>
          <td class="text-center"><a @click.prevent="deleteMovie(i)" href="#">Del</a></td>
        </tr>
      </tbody>
    </table>

    <!-- Movies Modal -->
    <div class="modal fade" ref="movieModal" id="movieModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="movieModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Add New Movie</h5>
            <button type="button" @click.prevent="clearForm" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form ref="movieForm" id="movieForm">
              <div class="mb-3">
                <label for="name">Movie Name</label>
                <input type="text" v-model="movie.name" name="name" id="name" class="form-control">
                <div class="text-danger" v-if="!$v.movie.name.required && $v.movie.name.$dirty">Name is required</div>
              </div>
              <div class="row">
                <div class="col-lg-6 mb-3">
                  <label for="date" class="form-label">Movie Date</label>
                  <input type="date" name="date" v-model="movie.date" class="form-control" id="date" aria-describedby="date">
                  <div class="text-danger" v-if="!$v.movie.date.required && $v.movie.date.$dirty">Date is required</div>
                </div>
                <div class="col-lg-6 mb-3">
                  <label for="time" class="form-label">Movie Time</label>
                  <input type="time" name="time" v-model="movie.time" class="form-control" id="time" aria-describedby="time">
                  <div class="text-danger" v-if="!$v.movie.time.required && $v.movie.time.$dirty">Time is required</div>
                </div>
              </div>
              <div class="mb-3">
                <label for="starring">Starring Actors</label>
                <input type="text" v-model="movie.starring" name="starring" id="starring" class="form-control">
              </div>
              <div class="mb-3">
                <label for="genres">Movie Genres</label>
                <input type="text" v-model="movie.genres" name="genres" id="genres" class="form-control">
              </div>
              <div class="mb-3">
                <label for="rating">Movie Rating</label>
                <input type="text" v-model="movie.rating" name="rating" id="rating" class="form-control">
              </div>
              <div class="mb-3">
                <label for="description">Movie Description</label>
                <textarea name="description" id="description" cols="30" rows="4" class="form-control"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" @click.prevent="clearForm" class="btn btn-secondary">Clear</button>
            <button type="button" @click.prevent="validateData" class="btn btn-primary">Add Movie</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { Modal } from 'bootstrap';
export default {
  data() {
    return {
      movies: [],
      movie: {
        id:'', name:'', date:'', time:'', starring:'', genres: [], rating:'', description:''
      },
      baseURL:'http://192.168.1.3/moviez/index.php/Movies',
      token:'7110eda4d09e062aa5e4a390b0a572ac0d2c0220',
      edit: false
    }
  },
  created() {
    this.getMovies();
  },
  validations: {
    movie: {
      name: { required },
      date: { required },
      time: { required },
      starring: { required },
      genres: { required },
      rating: { required }
    }
  },
  methods: {
    validateData() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.sendData();
      }
    },
    sendData() {
      let vm = this;
      if(vm.edit) {
        console.log('editing...')
        let vm = this, formData = new FormData(vm.$refs.movieForm)
        formData.append('_method', 'PUT')
        this.$axios.post(`${vm.baseURL}/${vm.token}/${vm.movie.id}`, formData)
        .then(res => {
          console.log(res)
          })
        .catch(err => console.log(err))
      } else {
        console.log('add new...')
        let vm = this, formData = new FormData(vm.$refs.movieForm)
        formData.append('token', vm.token)
        this.$axios.post(`${vm.baseURL}/${vm.token}`, formData)
        .then(res => console.log(res))
        .catch(err => console.log(err))
      }
    },
    getMovies() {
      let vm = this;
      this.$axios.get(`${this.baseURL}/${this.token}`)
      .then(res => {
        if(res.status === 200) {
          vm.movies = res.data.data
        }
      })
      .catch(err => console.log(err))
    },
    loadForm(i) {
      let vm = this; vm.edit = true;
      new Modal(vm.$refs.movieModal).show();

      vm.movie.date = vm.movies[i].date; vm.movie.time = vm.movies[i].time;
      vm.movie.starring = vm.movies[i].starring; vm.movie.genres = vm.movies[i].genres;
      vm.movie.rating = vm.movies[i].rating; vm.movie.id = vm.movies[i].id;
      vm.movie.name = vm.movies[i].name; vm.movie.description = vm.movies[i].description;
    },
    deleteMovie(i) {
      let vm = this;
      this.$axios.delete(`${vm.baseURL}/${vm.token}/${vm.movies[i].id}`)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    },
    clearForm() {
      this.movie.date = ''; this.movie.time = ''; this.movie.starring = '';
      this.movie.genres = ''; this.movie.rating = ''; this.edit = false;
      document.getElementById('movieForm').reset(); this.movie.name = '';
      this.movie.description = ''; this.$v.$reset();
    }
  }
}
</script>