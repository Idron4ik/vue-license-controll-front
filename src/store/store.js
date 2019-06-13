import Vue from 'vue'
import Vuex from 'vuex'
import { profile } from './user/profile'
import { products } from './products/productsUser'
import productsAdmin  from './products/productsAdmin'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    profile,
    products,
    productsAdmin,
  },
})

