import store from 'store'

export default function (to, from, next) {
  if (store.getters.isLoggedIn) {
    next()
  } else {
    next('login')
  }
};
