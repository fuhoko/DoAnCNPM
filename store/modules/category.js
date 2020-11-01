export default {
  state: {
    categories: null,
  },

  mutations: {
    SET_CATEGORIES(state, payload) {
      state.categories = payload
    },
  },

  actions: {
    async fetchDataCategories({ commit }) {
      try {
        const response = await this.$axios.get('/v1/service_categories', {
          headers: { authorization: 'Bearer ' + this.$cookies.get('token') },
        })
        commit('SET_CATEGORIES', response.data.data)
      } catch (e) {
        throw e.response.data.message[0].description
      }
    },
  },
}
