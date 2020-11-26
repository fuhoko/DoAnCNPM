export default {
  state: {
    services: null,
    query: {
      page: 0,
      limit: 10,
      s: null,
    },
    total: 0,
  },

  mutations: {
    SET_SERVICES(state, payload) {
      state.services = payload
    },
    SET_SERVICE_TOTAL(state, payload) {
      state.total = payload
    },
  },

  actions: {
    async fetchDataServices({ commit, state }) {
      try {
        const response = await this.$axios.get('/v1/services', {
          params: state.query,
          headers: { authorization: 'Bearer ' + this.$cookies.get('token') },
        })
        commit('SET_SERVICES', response.data.data)
        commit('SET_SERVICE_TOTAL', response.data.total)
      } catch (e) {
        throw e.response.data.message[0].description
      }
    },

    async createService(context, payload) {
      await console.log(payload)
      // try {
      //   await this.$axios.post('/v1/services', payload, {
      //     headers: { authorization: 'Bearer ' + this.$cookies.get('token') },
      //   })
      // } catch (e) {
      //   throw e.response.data.message[0].description
      // }
    },
  },
}
