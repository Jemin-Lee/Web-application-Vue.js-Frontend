import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuetify from "vuetify";
import 'vuetify/dist/vuetify.min.css';
import VueCookie from 'vue-cookie';
import axios from 'axios';
import VueAxios from "vue-axios";
import VModal from 'vue-js-modal';

import App from './App.vue';
import Home from './Home.vue';
import SinglePetition from './SinglePetition.vue';
import AddPetition from './AddPetition.vue';

Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(Vuetify);
Vue.use(VueCookie);
Vue.use(VModal);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/petitions/:petitionId",
    name: "petition",
    component: SinglePetition
  }


];

const router = new VueRouter({
  routes: routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  vuetify : new Vuetify(),
  router: router,
  render: h => h(App)
});
