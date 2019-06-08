import Vue from 'vue';
import Router from 'vue-router';
import Settings from './views/profile/ProfileSettings';
import RegisterForm from './views/RegisterForm';
import ProfileIndex from './views/profile/ProfileIndex';
import ProfileIndexAdmin from './views/profile/ProfileIndexAdmin';
import Profile from './views/profile/Profile';

Vue.use(Router)

const router = new Router({
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
      meta: { 
        requiresAuth: true,
        isAdmin : true
      },
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
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: ProfileIndexAdmin,
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