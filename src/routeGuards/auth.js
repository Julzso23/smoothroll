import store from 'store'

export default function (to, from, next) {
  if (store.getters['authentication/isLoggedIn']) {
    next()
  } else {
    next('login')
  }
};
