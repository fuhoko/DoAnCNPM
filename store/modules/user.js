export default {
  state: {
    currentUser:
      localStorage.getItem('user') != null
        ? JSON.parse(localStorage.getItem('user'))
        : null,
  },

  getters: {
    currentUser: (state) => state.currentUser,
  },

  mutations: {
    SET_USER(state, payload) {
      state.currentUser = payload
    },

    SET_LOGOUT(state) {
      state.currentUser = null
    },
  },

  actions: {
    async login({ commit }, payload) {
      try {
        const response = await this.$axios.post('/v1/auth/login', payload)
        if (response.status === 201) {
          const item = {
            avatar: response.data.data.avatar,
            email: response.data.data.email,
            fullName: response.data.data.fullName,
            phone: response.data.data.phone,
            role: response.data.data.role,
          }
          localStorage.setItem('user', JSON.stringify(item))
          this.$cookies.set('token', response.data.data.token)
          commit('SET_USER', item)
        }
      } catch (e) {
        throw e.response.data.message[0].description
      }
    },

    logout({ commit, dispatch }) {
      localStorage.removeItem('user')
      this.$cookies.remove('token')
      commit('SET_ROLE_DEFAULT', { root: true })
      commit('SET_PERMISSION_DEFAULT', { root: true })
      commit('SET_LOGOUT')
    },
  },
}
