import Vue from 'vue';
import 'vuetify/src/stylus/app.styl'
import Vuetify, { VLayout } from 'vuetify/lib'


Vue.use(Vuetify, {
  iconfont: 'md',
  components: {
    VLayout
  },
  theme: {
    main: '#4FC38C',
    primary: '#3f51b5',
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#b71c1c'
  }
})
