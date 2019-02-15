import Vue from 'vue';
import {mediaFields, seriesFields} from './fields';

function sortQueue(queue, order) {
  queue.sort((a, b) => {
    let indexA = null;
    let indexB = null;
    for (let i in order) {
      if (a.series.series_id == order[i]) {
        indexA = i;
      }
      if (b.series.series_id == order[i]) {
        indexB = i;
      }
    }

    if (indexA != null && indexB != null) {
      if (indexA < indexB) {
        return -1;
      } else {
        return 1;
      }
    } else {
      if (indexA != null) {
        return -1;
      } else {
        return 1;
      }
    }
  });

  for (let i in queue) {
    queue.queue_entry_id = i;
  }

  return queue;
}

export default {
  state: {
    queue: [],
    queueOrder: JSON.parse(localStorage.getItem('queueOrder')) || []
  },

  mutations: {
    setQueue(state, queue) {
      state.queue = queue;
    },
    setQueueOrder(state, order) {
      state.queueOrder = order;
      localStorage.setItem('queueOrder', JSON.stringify(order));
    }
  },

  actions: {
    async getQueue({commit, rootState, state, dispatch}) {
      await dispatch('verifySession');

      return Vue.api.get('queue', {
        media_types: 'anime|drama',
        fields: [mediaFields, seriesFields].join(','),
        locale: rootState.locale.locale,
        session_id: rootState.authentication.sessionId,
        auth: rootState.authentication.authTicket
      })
        .then(data => {
          commit('setQueue', sortQueue(data, state.queueOrder));
        })
        .catch(({code}) => {
          if (code == 'bad_session') {
            return dispatch('startSession').then(() => dispatch('getQueue'));
          }
        });
    },

    async sortQueue({commit}, queue) {
      commit('setQueue', queue);

      let queueOrder = [];
      for (let item of queue) {
        queueOrder.push(item.series.series_id);
      }

      commit('setQueueOrder', queueOrder);
    }
  }
};
