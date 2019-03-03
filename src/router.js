import Vue from 'vue';
import Router from 'vue-router';
import {authGuard, premiumGuard, loginGuard} from 'routeGuards';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('pages/Dashboard'),
      meta: {
        guard: premiumGuard
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('pages/Login'),
      meta: {
        guard: loginGuard
      }
    },
    {
      path: '/browse',
      component: () => import('pages/browse/Browse'),
      meta: {
        guard: premiumGuard
      },
      children: [
        {
          path: 'categories',
          component: () => import('pages/browse/Categories')
        },
        {
          path: 'categories/:mediaType/:tag',
          component: () => import('pages/browse/Filter')
        },
        {
          path: '',
          component: () => import('pages/browse/Filter')
        }
      ]
    },
    {
      path: '/queue',
      name: 'queue',
      component: () => import('pages/Queue'),
      meta: {
        guard: premiumGuard
      }
    },
    {
      path: '/media/:id',
      name: 'media',
      component: () => import('pages/Media'),
      meta: {
        guard: premiumGuard
      }
    },
    {
      path: '/series/:id',
      name: 'series',
      component: () => import('pages/Series'),
      meta: {
        disableContainer: true,
        guard: premiumGuard
      }
    },
    {
      path: '/premium',
      name: 'premium',
      component: () => import('pages/Premium'),
      meta: {
        guard: authGuard
      }
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('pages/History'),
      meta: {
        guard: premiumGuard
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('pages/Settings'),
      meta: {
        guard: premiumGuard
      }
    },
    {
      path: '*',
      name: 'notFound',
      component: () => import('pages/NotFound')
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.guard != null) {
    to.meta.guard(to, from, next)
  } else {
    next();
  }
});

export default router;
