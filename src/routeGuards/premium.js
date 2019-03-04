import store from 'store'

export default function (to, from, next) {
  if (store.getters.isLoggedIn) {
    if (store.getters.isPremium) {
      next()
    } else {
      next('premium')
    }
  } else {
    next('login')
  }
};
