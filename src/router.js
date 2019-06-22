import Vue from 'vue';
import Router from 'vue-router';
import Settings from './views/profile/childrens/Settings';
import Dashboard from './views/profile/childrens/Dashboard';
import DashboardAdmin from './views/admin/childrens/DashboardAdmin';
import InboxAdmin from './views/admin/childrens/InboxAdmin';
import Checkout from './views/profile/childrens/Checkout';
import Inbox from './views/profile/childrens/Inbox';
import RegistrationsForm from './views/RegistrationsForm';
import Admin from './views/admin/AdminHome';
import MobileHome from './views/profile/ProfileHome';//chank

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'registrationsForm',
      component: RegistrationsForm
    },
    {
      path: '/profile',
      name: 'home',
      meta: {
        requiresAuth: true,
      },
      component: () => import(/* webpackChunkName: "profile" */ './views/profile/ProfileHome'),
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: Dashboard
        },
        {
          path: 'settings',
          name: 'settings',
          component: Settings
        },
        {
          path: 'checkout',
          name: 'checkout',
          component: Checkout
        },
        {
          path: 'inbox',
          name: 'inbox',
          component: Inbox
        },
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: {
        requiresAuth: true,
        isAdmin: true
      },
      children: [
        {
          path: 'dashboard',
          name: 'dashboardAdmin',
          component: DashboardAdmin
        },
        {
          path: 'inbox',
          name: 'inboxAdmin',
          component: InboxAdmin
        },
      ]
    },
  ]
});

router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/',
      })
    } else {
      let user = JSON.parse(localStorage.getItem('user'));

      if (to.matched.some(record => record.meta.isAdmin)) {
        if (user.isAdmin) {
          next()
        }
        // else{
        //   next()
        // }
      }
      else {
          next()
        }
    }
  } 
  else {
    next()
  }
});

export default router;