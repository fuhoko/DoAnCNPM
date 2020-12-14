export default {
  state: {
    services: null,
    query: {
      page: 0,
      limit: 10,
      s: null,
      sort: null,
    },
    total: 0,
    serviceSelected: null,
  },

  mutations: {
    SET_SERVICES(state, payload) {
      state.services = payload
    },
    SET_SERVICE_TOTAL(state, payload) {
      state.total = payload
    },
    SET_SERVICE_QUERY(state, query) {
      state.query = { ...state.query, ...{ limit: 10, page: query.page } }
      if (query.s && query.q) {
        state.query.s = `{"$or":[{"${query.s}":{"$contL":"${query.q}"}}]}`
      } else {
        state.query.s = null
      }
      if (query.sort) {
        state.query.sort = query.sort
      }
    },
    SET_SERVICE_SELECTED(state, payload) {
      state.serviceSelected = payload
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

    getDataServiceSelected({ commit, state }, payload) {
      const newData = state.services.map((item) => ({ ...item }))
      const target = newData.filter((item) => payload === item.id)[0]
      commit('SET_SERVICE_SELECTED', target)
    },

    async createService(context, payload) {
      try {
        await this.$axios.post('/v1/services', payload, {
          headers: { authorization: 'Bearer ' + this.$cookies.get('token') },
        })
      } catch (e) {
        throw e.response.data.message[0].description
      }
    },

    async deleteService(context, payload) {
      try {
        await this.$axios.delete(`/v1/services/${payload}`, {
          headers: { authorization: 'Bearer ' + this.$cookies.get('token') },
        })
      } catch (e) {
        throw e.response.data.message[0].description
      }
    },
  },
}