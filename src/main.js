import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";

import './registerServiceWorker'

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:3000/';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
