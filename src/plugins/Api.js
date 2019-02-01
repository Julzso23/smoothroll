const _locale = 'enGB';
const _version = '1.1.20.0';
const _connectivity_type = 'ethernet';
const _api_version = '0';
const _url = 'https://api.crunchyroll.com/';

const _baseParameters = {
  locale: _locale,
  version: _version,
  connectivity_type: _connectivity_type
};

class Api {
  getFormData(object) {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
  }

  get(route, inputParameters = {}) {
    let url = new URL(_url + route + '.' + _api_version + '.json');

    let parameters = Object.assign({}, _baseParameters, inputParameters);

    url.search = new URLSearchParams(parameters);

    return fetch(url)
      .then(response => response.json())
      .then(response => {
        if (!response.error) {
          return response.data;
        } else {
          throw response.code;
        }
      });
  }

  post(route, inputParameters = {}) {
    let url = _url + route + '.' + _api_version + '.json';
    let parameters = Object.assign({}, _baseParameters, inputParameters);

    return fetch(url, {
      method: 'POST',
      body: this.getFormData(parameters)
    })
      .then(response => response.json())
      .then(response => {
        if (!response.error) {
          return response.data;
        } else {
          throw response.code;
        }
      });
  }
}

export default (Vue, options) => {
  Vue.api = new Api();
  Vue.prototype.$api = Vue.api;
};
