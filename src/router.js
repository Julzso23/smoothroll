import Vue from 'vue';
import Router from 'vue-router';
import store from 'store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('pages/Dashboard')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('pages/Login')
    },
    {
      path: '/browse',
      name: 'browse',
      component: () => import('pages/Browse')
    },
    {
      path: '/queue',
      name: 'queue',
      component: () => import('pages/Queue')
    },
    {
      path: '/media/:id',
      name: 'media',
      component: () => import('pages/Media')
    },
    {
      path: '/series/:id',
      name: 'series',
      component: () => import('pages/Series')
    },
    {
      path: '/premium',
      name: 'premium',
      component: () => import('pages/Premium')
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.name == 'login') {
    if (store.getters.isLoggedIn) {
      next(from);
    } else {
      next();
    }
  } else if (to.name == 'premium') {
    if (!store.getters.isLoggedIn) {
      next('login');
    } else if (store.getters.isPremium) {
      next(from);
    } else {
      next();
    }
  } else if (!store.getters.isLoggedIn) {
    next('login');
  } else if (!store.getters.isPremium) {
    next('premium');
  } else {
    next();
  }
});

export default router;
