import Vue from 'vue'
import Router from 'vue-router'
import { premiumGuard, nonPremiumGuard, loginGuard, landingGuard } from 'routeGuards'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('pages/Landing'),
      meta: {
        guard: landingGuard
      }
    },
    {
      path: '/dashboard',
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
      children: [
        {
          path: 'categories',
          component: () => import('pages/browse/Categories'),
          meta: {
            guard: premiumGuard
          }
        },
        {
          path: 'categories/:mediaType/:tag',
          component: () => import('pages/browse/Tags'),
          meta: {
            guard: premiumGuard
          }
        },
        {
          path: '',
          component: () => import('pages/browse/Filter'),
          meta: {
            guard: premiumGuard
          }
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
        guard: nonPremiumGuard
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
      path: '*',
      name: 'notFound',
      component: () => import('pages/NotFound')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.guard != null) {
    to.meta.guard(to, from, next)
  } else {
    next()
  }
})

export default router
