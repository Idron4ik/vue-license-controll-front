import Vue from 'vue';
import Router from 'vue-router';
import Settings from './views/profile/childrens/Settings';
import Dashboard from './views/profile/childrens/Dashboard';
import ApprovedProducts from './views/profile/childrens/ApprovedProducts';
import RegistrationsForm from './views/RegistrationsForm';
import Admin from './views/admin/Admin';
import MobileHome from './views/MobileHome';
import Profile from './views/profile/Profile';

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
      path: '/profile/:id',
      name: 'home',
      meta: { 
        requiresAuth: true,
        isAdmin : true
      },
      component: () => import(/* webpackChunkName: "profile" */ './views/MobileHome'),
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
          path: 'approved-products',
          name: 'approvedProducts',
          component: ApprovedProducts
        },
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: { 
          requiresAuth: true,
      }
  }, 
  ]
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
      console.log(localStorage.getItem('jwt') );
      next();
      // if (localStorage.getItem('jwt') == null) {
      //     next({
      //         path: '/login',
      //     })
      // } else {
          let user = JSON.parse(localStorage.getItem('user'));
          if(to.matched.some(record => record.meta.isAdmin)) {
            if(user.isAdmin){
              next({ path: '/admin'})
            }
            else{
              next()
            }
      //     }else {
      //         next()
      //     }
      }
  // } else if(to.matched.some(record => record.meta.guest)) {
  //     if(localStorage.getItem('jwt') == null){
  //         next()
  //     }
  //     else{
  //         next({ name: 'userboard'})
  //     }
  }else {
      next() 
  }
});

export default router;