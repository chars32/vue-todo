import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

import { routes } from './route.js'


Vue.use(Vuetify);
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes
});
// Usamos eventBus para comunicacion entre
// componentes hermanos
export const eventBus = new Vue();

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
