export default (Vue, options) => {
  Vue.prototype.$https = url => url.replace('http://', 'https://')
}
