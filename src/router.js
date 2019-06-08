import Vue from 'vue';
import Router from 'vue-router';
import Settings from './views/profile/ProfileSettings';
import RegisterForm from './views/RegisterForm';
import ProfileIndex from './views/profile/ProfileIndex';
import ProfileIndexAdmin from './views/profile/ProfileIndexAdmin';
import Profile from './views/profile/Profile';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'registerForm',
      component: RegisterForm
    },
    {
      path: '/profile/:id',
      name: 'profile',
      component: () => import(/* webpackChunkName: "profile" */ './views/profile/Profile'),
      children: [
        {
          path: '',
          name: 'profileIndex',
          component: ProfileIndex
        },
        {
          path: 'settings',
          name: 'settings',
          component: Settings
        },
        {
          path: 'admin/',
          name: 'admin',
          component: ProfileIndexAdmin
        },
        
      ]
    },

  ]
})
