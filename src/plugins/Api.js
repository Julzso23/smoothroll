import uuid from 'uuid/v4';

const _locale = 'enGB';
const _version = '1.1.20.0';
const _connectivity_type = 'ethernet';
const _api_version = '0';
const _url = 'https://api.crunchyroll.com/';
const _access_token = 'LNDJgOit5yaRIWN';
const _device_type = 'com.crunchyroll.windows.desktop';

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

  async get(route, inputParameters = {}) {
    let url = new URL(_url + route + '.' + _api_version + '.json');
    let parameters = Object.assign({}, _baseParameters, inputParameters);
    url.search = new URLSearchParams(parameters);

    return fetch(url).then(response => response.json());
  }

  async post(route, inputParameters = {}) {
    let url = _url + route + '.' + _api_version + '.json';
    let parameters = Object.assign({}, _baseParameters, inputParameters);

    const session_id = localStorage.getItem('session_id');
    if (session_id) {
      parameters.session_id = session_id;
    }

    return fetch(url, {
      method: 'POST',
      body: this.getFormData(parameters)
    }).then(response => response.json())
  }

  async startSession() {
    const id = uuid().toUpperCase();
    localStorage.setItem('uuid', id);

    return this.post('start_session', {
      access_token: _access_token,
      device_type: _device_type,
      device_id: id
    }).then(response => {
      if (!response.error) {
        localStorage.setItem('session_id', response.data.session_id);
        return response.data.session_id;
      }
    });
  }
}

export default (Vue, options) => {
  Vue.api = new Api();
  Vue.prototype.$api = Vue.api;
};
