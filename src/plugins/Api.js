import uuid from 'uuid/v4';
import EventBus from 'EventBus';

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

    return fetch(url)
      .then(response => response.json())
      .then(response => {
        if (!response.error) {
          return response.data;
        } else {
          throw response.code;
        }
      })
      .catch(code => {
        if (code == 'bad_session') {
          localStorage.removeItem('session_id');
          this.startSession();
          this.post(route, inputParameters);
        } else {
          throw code;
        }
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
      })
      .catch(code => {
        if (code == 'bad_session') {
          localStorage.removeItem('session_id');
          this.startSession();
          this.post(route, inputParameters);
        } else {
          throw code;
        }
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

    return await this.post('login', {
      account: account,
      password: password,
      session_id: session_id
    })
      .then(data => {
        localStorage.setItem('auth', data.auth);
        EventBus.$emit('onLogin', data);
      });
  }

  async logout() {
    let auth = localStorage.getItem('auth');
    if (auth) {
      await this.post('logout', {
        auth: auth
      })
        .catch(code => {
          if (code == 'bad_auth_params') {
            localStorage.removeItem('auth');
          }
        });

      localStorage.removeItem('auth');
    }

    EventBus.$emit('onLogout');
  }
}

export default (Vue, options) => {
  Vue.api = new Api();
  Vue.prototype.$api = Vue.api;
};
