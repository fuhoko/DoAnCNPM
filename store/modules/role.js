export default {
  state: {
    roles: null,
    page: 0,
    limit: 10,
    total: 0,
    pageCount: 0,
    roleSelected: null,
  },

  getters: {
    roles: (state) => state.roles,
    roleSelected: (state) => state.roleSelected,
  },

  mutations: {
    SET_ROLES(state, payload) {
      !state.roles ? (state.roles = payload) : state.roles.push(payload)
    },
    SET_ROLE_TOTAL(state, payload) {
      state.total = payload
    },
    SET_ROLE_PAGE(state, payload) {
      state.page = payload
    },
    SET_ROLE_PAGE_COUNT(state, payload) {
      state.pageCount = payload
    },
    SET_ROLE_SELECTED(state, payload) {
      state.roleSelected = payload
    },
  },

  actions: {
    async fetchDataRoles({ commit, state }) {
      try {
        const response = await this.$axios.get('/v1/roles', {
          params: { page: state.page + 1, limit: state.limit },
          headers: { authorization: 'Bearer ' + this.$cookies.get('token') },
        })

        if (response.status === 200) {
          commit('SET_ROLES', response.data.data)
          commit('SET_ROLE_TOTAL', response.data.total)
          commit('SET_ROLE_PAGE', response.data.page)
          commit('SET_ROLE_PAGE_COUNT', response.data.pageCount)
        }
      } catch (e) {
        throw e.response.data.message[0].description
      }
    },
    setDataRoleSelected({ commit, state }, payload) {
      const newData = state.roles.map((item) => ({ ...item }))
      const target = newData.filter((item) => payload === item.id)[0]
      commit('SET_ROLE_SELECTED', target)
    },
  },
}
