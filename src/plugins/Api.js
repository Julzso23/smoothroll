const locale = 'enGB'
const version = '1.1.20.0'
const connectivityType = 'ethernet'
const apiVersion = '0'
const apiUrl = 'https://api.crunchyroll.com/'

const baseParameters = {
  locale: locale,
  version: version,
  connectivity_type: connectivityType
}

class Api {
  getFormData (object) {
    const formData = new window.FormData()
    Object.keys(object).forEach(key => formData.append(key, object[key]))
    return formData
  }

  get (route, inputParameters = {}) {
    const url = new URL(apiUrl + route + '.' + apiVersion + '.json')

    const parameters = Object.assign({}, baseParameters, inputParameters)

    url.search = new URLSearchParams(parameters)

    return window.fetch(url)
      .then(response => response.json())
      .then(response => {
        if (!response.error) {
          return response.data
        } else {
          throw response
        }
      })
  }

  post (route, inputParameters = {}) {
    const url = apiUrl + route + '.' + apiVersion + '.json'
    const parameters = Object.assign({}, baseParameters, inputParameters)

    return window.fetch(url, {
      method: 'POST',
      body: this.getFormData(parameters)
    })
      .then(response => response.json())
      .then(response => {
        if (!response.error) {
          return response.data
        } else {
          throw response
        }
      })
  }
}

export default (Vue, options) => {
  Vue.api = new Api()
  Vue.prototype.$api = Vue.api
}
