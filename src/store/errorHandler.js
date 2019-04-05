import store from 'store'
import router from 'router'

export default (code, sender, senderOptions) => {
  switch (code) {
    case 'bad_request':
      return store.dispatch('logout').then(() => router.push('/login'))
    case 'bad_session':
      return store.dispatch('startSession').then(() => store.dispatch(sender, senderOptions))
  }
}
