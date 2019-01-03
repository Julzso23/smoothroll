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

  get(route, inputParameters = {}) {
    let url = new URL(_url + route + '.' + _api_version + '.json');

    let parameters = Object.assign({}, _baseParameters, inputParameters);
    const session_id = localStorage.getItem('session_id');
    if (session_id) {
      parameters.session_id = session_id;
    }
    const auth = localStorage.getItem('auth');
    if (auth) {
      parameters.auth = auth;
    }

    url.search = new URLSearchParams(parameters);

    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => response.json())
        .then(response => {
          if (!response.error) {
            resolve(response.data);
          } else {
            reject(response.code);
          }
        });
    });
  }

  post(route, inputParameters = {}) {
    let url = _url + route + '.' + _api_version + '.json';
    let parameters = Object.assign({}, _baseParameters, inputParameters);

    const session_id = localStorage.getItem('session_id');
    if (session_id) {
      parameters.session_id = session_id;
    }
    const auth = localStorage.getItem('auth');
    if (auth) {
      parameters.auth = auth;
    }

    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'POST',
        body: this.getFormData(parameters)
      })
        .then(response => response.json())
        .then(response => {
          if (!response.error) {
            resolve(response.data);
          } else {
            reject(response.code);
          }
        });
    });
  }

  startSession() {
    const id = uuid().toUpperCase();
    localStorage.setItem('uuid', id);

    return this.post('start_session', {
      access_token: _access_token,
      device_type: _device_type,
      device_id: id
    }).then(data => {
      localStorage.setItem('session_id', data.session_id);
      return data.session_id;
    });
  }

  listSeries(filter, mediaType, limit, offset) {
    return this.get('list_series', {
      filter: filter,
      media_type: mediaType,
      limit: limit,
      offset: offset
    });
  }

  async login(account, password) {
    let session_id = localStorage.getItem('session_id');
    if (!session_id) {
      session_id = await this.startSession();
    }

    await this.post('login', {
      account: account,
      password: password,
      session_id: session_id
    })
      .then(data => {
        localStorage.setItem('auth', data.auth);
      })
      .catch(code => {
        if (code == 'bad_session') {
          localStorage.removeItem('session_id');
          this.login(account, password);
        }
      });
  }
}

export default (Vue, options) => {
  Vue.api = new Api();
  Vue.prototype.$api = Vue.api;
};
