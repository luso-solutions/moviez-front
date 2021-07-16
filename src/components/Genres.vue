<template>
  <div>
    <h3 class="mb-5">
      Genres
      <button class="btn btn-outline-secondary float-end" 
        data-bs-toggle="modal" 
        data-bs-target="#genreModal">
        Add New Genre
      </button>
    </h3>
    <table class="table">
      <thead>
        <tr>
          <th>Genre Name</th>
          <th class="text-center">Edit</th>
          <th class="text-center">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(genre,i) in genres" :key="genre.id">
          <td>{{ genre.name }}</td>
          <td class="text-center"><a @click.prevent="loadForm(i)" href="#">edit</a></td>
          <td class="text-center"><a @click.prevent="deleteGenre(i)" href="#">Del</a></td>
        </tr>
      </tbody>
    </table>

    <!-- Genre Modal -->
    <div ref="genreModal" class="modal fade" id="genreModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="genreModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Add New Genre</h5>
            <button type="button" @click.prevent="clearForm" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form ref="genreForm" id="genreForm">
              <div class="mb-3">
                <label for="name" class="form-label">Genre Name</label>
                <input type="text" name="name" v-model="genre.name" class="form-control" id="name" aria-describedby="name">
                <div class="text-danger" v-if="!$v.genre.name.required && $v.genre.name.$dirty">Name is required</div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" @click.prevent="clearForm" class="btn btn-secondary">Clear</button>
            <button type="button" @click.prevent="validateData" class="btn btn-primary">Add Genre</button>
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
      genres: [],
      genre: { 
        id:'', name:'',
        // token:'7110eda4d09e062aa5e4a390b0a572ac0d2c0220', 
        baseURL:'http://192.168.1.3/moviez/index.php/Genres'
      },
      edit: false
    }
  },
  created() {
    this.getGenres();
  },
  validations: {
    genre: {
      name: { required }
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
        console.log('edit...')
        let vm = this, formData = new FormData(this.$refs.genreForm)
        formData.append('_method', 'PUT');
        this.$axios.post(`${vm.genre.baseURL}/${vm.genre.id}`, formData)
        .then(res => {
          console.log(res.status)
        })
        .catch(err => console.log(err))
      } else {
        console.log('add new')
        let vm = this, formData = new FormData(this.$refs.genreForm)
        this.$axios.post(`${vm.genre.baseURL}`, formData)
        .then(res => {
          console.log(res.status)
        })
        .catch(err => console.log(err))
      }
    },
    getGenres() {
      let vm = this;
      this.$axios.get(`${vm.genre.baseURL}`)
      .then(res => {
        if(res.status === 200) {
          vm.genres = res.data.data;
        }
      })
      .catch(err => console.log(err))
    },
    loadForm(i) {
      this.edit = true; let vm = this;
      this.genre.name = this.genres[i].name; 
      this.genre.id = this.genres[i].id;
      new Modal(vm.$refs.genreModal).show();
    },
    deleteGenre(i) {
      let vm = this;
      this.$axios.delete(`${vm.genre.baseURL}/${vm.genres[i].id}`)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    },
    clearForm() {
      this.genre.name = ''; this.genre.id = '';
      document.getElementById('genreForm').reset();
      this.$v.$reset(); this.edit = false;
    }
  }
}
</script>