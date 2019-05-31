import store from 'store'

export default function (to, from, next) {
  if (store.getters['authentication/isLoggedIn']) {
    if (store.getters['authentication/isPremium']) {
      next('/')
    } else {
      next()
    }
  } else {
    next('login')
  }
};
