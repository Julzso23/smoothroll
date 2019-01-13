import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
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
      component: () => import('pages/Media')
    }
  ]
});
