import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store/store';
import axios from "axios";

import './registerServiceWorker';

Vue.config.productionTip = false;
Vue.prototype.$token = localStorage.getItem('jwt');
axios.defaults.baseURL = 'http://localhost:3000/';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
