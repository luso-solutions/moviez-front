import Vue from 'vue'
import App from './App.vue'

import Axios from 'axios';
import jQuery from 'jquery';
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

Vue.prototype.$axios = Axios;
Vue.prototype.$jquery = jQuery;
Vue.config.productionTip = false;

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.use(VueRouter);
Vue.use(Vuelidate);
Vue.use(VueToast, {
  position: 'bottom',
  duration: 3000
});

// imported components
import Broadcast from './components/Broadcast.vue';
import Movies from './components/Movies.vue';
import Genres from './components/Genres.vue';

const routes = [
  { path:'/', redirect: '/admin/movies' },
  { path:'/admin/broadcast', component: Broadcast },
  { path:'/admin/genres', component: Genres },
  { path:'/admin/movies', component: Movies },
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
