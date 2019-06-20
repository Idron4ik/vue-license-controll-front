import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store/store';
import axios from "axios";

import './registerServiceWorker';

Vue.config.productionTip = false;
axios.defaults.baseURL = 'https://frozen-headland-66798.herokuapp.com/';
axios.defaults.headers.common['Authorization'] = `JWT ${localStorage.getItem("jwt")}`;

console.log(123123);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
