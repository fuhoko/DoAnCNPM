export default {
  state: {
    currentUser:
      localStorage.getItem('user') != null
        ? JSON.parse(localStorage.getItem('user'))
        : null,
    processing: false,
  },

  getters: {
    currentUser: (state) => state.currentUser,
    processing: (state) => state.processing,
  },

  mutations: {
    setUser(state, payload) {
      state.currentUser = payload
    },

    setLogout(state) {
      state.currentUser = null
    },

    setProcessing(state, payload) {
      state.processing = payload
    },
  },

  actions: {
    async login({ commit }, payload) {
      commit('setProcessing', true)
      try {
        const response = await this.$axios.post('/v1/auth/login', payload)
        if (response.status === 200 || response.status === 201) {
          const item = {
            avatar: response.data.data.avatar,
            email: response.data.data.email,
            fullName: response.data.data.fullName,
            phone: response.data.data.phone,
            role: response.data.data.role,
          }
          localStorage.setItem('user', JSON.stringify(item))
          this.$cookies.set('token', response.data.data.token)
          commit('setUser', item)
        }
      } catch (e) {
        throw e.response.data.message[0].description
      } finally {
        commit('setProcessing', false)
      }
    },

    logout({ commit }) {
      localStorage.removeItem('user')
      commit('setLogout')
      this.$cookies.remove('token')
    },
  },
}
