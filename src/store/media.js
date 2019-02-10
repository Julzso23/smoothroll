import Vue from 'vue';
import {mediaFields, seriesFields} from './fields';

export default {
  state: {
    mediaList: [],
    seriesList: [],
    currentMedia: null,
    currentSeries: null,
    searchResults: [],
    recentMedia: []
  },

  mutations: {
    setMediaList(state, mediaList) {
      state.mediaList = mediaList;
    },
    appendMediaList(state, mediaList) {
      state.mediaList = state.mediaList.concat(mediaList);
    },
    setSeriesList(state, seriesList) {
      state.seriesList = seriesList;
    },
    appendSeriesList(state, seriesList) {
      state.seriesList = state.seriesList.concat(seriesList);
    },
    setCurrentMedia(state, media) {
      state.currentMedia = media;
    },
    setCurrentSeries(state, series) {
      state.currentSeries = series;
    },
    setSearchResults(state, results) {
      state.searchResults = results;
    },
    setRecentMedia(state, recentMedia) {
      state.recentMedia = recentMedia;
    }
  },

  actions: {
    async listMedia({commit, rootState, dispatch}, {seriesId, count}) {
      await dispatch('verifySession');

      return Vue.api.get('list_media', {
        series_id: seriesId,
        limit: count,
        fields: mediaFields,
        sort: 'desc',
        session_id: rootState.authentication.sessionId
      })
        .then(data => {
          commit('setMediaList', data);
        })
        .catch(({code}) => {
          if (code == 'bad_session') {
            return dispatch('startSession').then(() => dispatch('listMedia'));
          }
        });
    },

    async listSeries({commit, rootState, dispatch}, {filter, mediaType, limit, offset, append}) {
      await dispatch('verifySession');

      return Vue.api.get('list_series', {
        filter: filter,
        media_type: mediaType,
        limit: limit,
        offset: offset,
        fields: seriesFields,
        session_id: rootState.authentication.sessionId
      })
        .then(data => {
          if (append) {
            commit('appendSeriesList', data);
          } else {
            commit('setSeriesList', data);
          }
        })
        .catch(({code}) => {
          if (code == 'bad_session') {
            return dispatch('startSession').then(() => dispatch('listSeries'));
          }
        });
    },

    async getMedia({commit, rootState, dispatch}, id) {
      await dispatch('verifySession');

      return Vue.api.get('info', {
        media_id: id,
        fields: mediaFields,
        session_id: rootState.authentication.sessionId
      })
        .then(data => {
          commit('setCurrentMedia', data);
        })
        .catch(({code}) => {
          if (code == 'bad_session') {
            return dispatch('startSession').then(() => dispatch('getMedia'));
          }
        });
    },

    async getSeries({commit, rootState, dispatch}, id) {
      await dispatch('verifySession');

      return Vue.api.get('info', {
        series_id: id,
        fields: seriesFields,
        session_id: rootState.authentication.sessionId
      })
        .then(data => {
          commit('setCurrentSeries', data);
        })
        .catch(({code}) => {
          if (code == 'bad_session') {
            return dispatch('startSession').then(() => dispatch('getSeries'));
          }
        });
    },

    async search({commit, rootState, dispatch}, query) {
      await dispatch('verifySession');

      return Vue.api.get('autocomplete', {
        media_types: 'anime|drama',
        q: query,
        filter: seriesFields,
        limit: 5,
        session_id: rootState.authentication.sessionId
      })
        .then(data => {
          commit('setSearchResults', data);
        })
        .catch(({code}) => {
          if (code == 'bad_session') {
            return dispatch('startSession').then(() => dispatch('search'));
          }
        });
    },

    async toggleQueue({rootState, dispatch}, {seriesId, inQueue}) {
      await dispatch('verifySession');

      const request = inQueue ? 'remove_from_queue' : 'add_to_queue';
      return Vue.api.post(request, {
        series_id: seriesId,
        session_id: rootState.authentication.sessionId
      })
        .catch(({code}) => {
          if (code == 'bad_session') {
            return dispatch('startSession').then(() => dispatch('toggleQueue'));
          }
        });
    },

    async logTime({rootState, dispatch}, {mediaId, time}) {
      await dispatch('verifySession');

      return Vue.api.post('log', {
        media_id: mediaId,
        playhead: time,
        event: 'playback_status',
        session_id: rootState.authentication.sessionId
      })
        .catch(({code}) => {
          if (code == 'bad_session') {
            return dispatch('startSession').then(() => dispatch('logTime'));
          }
        });
    },

    async getHistory({rootState, dispatch, commit}, {mediaTypes, limit, offset, append}) {
      await dispatch('verifySession');

      return Vue.api.get('recently_watched', {
        media_types: mediaTypes,
        offset: offset,
        limit: limit,
        fields: mediaFields,
        session_id: rootState.authentication.sessionId
      })
        .then(data => {
          let mediaList = [];
          for (let item of data) {
            mediaList.push(item.media);
          }

          if (append) {
            commit('appendMediaList', mediaList);
          } else {
            commit('setMediaList', mediaList);
          }
        })
        .catch(({code}) => {
          if (code == 'bad_session') {
            return dispatch('startSession').then(() => dispatch('getHistory'));
          }
        });
    },

    async getRecentMedia({rootState, dispatch, commit}, mediaType) {
      await dispatch('verifySession');

      return Vue.api.get('list_series', {
        media_type: mediaType,
        filter: 'updated',
        limit: 50,
        fields: [mediaFields, 'series.most_recent_media'].join(','),
        session_id: rootState.authentication.sessionId
      })
        .then(data => {
          let recentMedia = [];
          for (let series of data) {
            recentMedia.push(series.most_recent_media);
          }

          commit('setRecentMedia', recentMedia);
        })
        .catch(({code}) => {
          if (code == 'bad_session') {
            return dispatch('startSession').then(() => dispatch('getRecentMedia'));
          }
        });
    }
  }
};
