export default {
  state: {
    permissions: null,
    offset: 0,
    limit: 10,
    total: 0,
    pageCount: 0,
  },

  getters: {
    permissions: (state) => state.permissions,
    permissionTotal: (state) => state.total,
  },

  mutations: {
    SET_PERMISSIONS(state, payload) {
      !state.permissions
        ? (state.permissions = payload)
        : (state.permissions = state.permissions.concat(...payload))
    },
    SET_PERMISSION_OFFSET(state, payload) {
      state.offset = payload
    },
    SET_PERMISSION_TOTAL(state, payload) {
      state.total = payload
    },
  },

  actions: {
    async fetchDataPermissions({ commit, state }) {
      try {
        const response = await this.$axios.get('/v1/permissions', {
          params: { offset: state.offset, limit: state.limit },
          headers: { authorization: 'Bearer ' + this.$cookies.get('token') },
        })
        if (response.status === 200) {
          commit('SET_PERMISSIONS', response.data.data)
          commit('SET_PERMISSION_OFFSET', response.data.page * 10)
          commit('SET_PERMISSION_TOTAL', response.data.total)
        }
      } catch (e) {
        throw e.response.data.message[0].description
      }
    },
  },
}
