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
    SET_USER(state, payload) {
      state.currentUser = payload
    },

    SET_LOGOUT(state) {
      state.currentUser = null
    },

    SET_PROCESSING(state, payload) {
      state.processing = payload
    },
  },

  actions: {
    async login({ commit }, payload) {
      commit('SET_PROCESSING', true)
      try {
        const response = await this.$axios.post('/v1/auth/login', payload)
        if (response.status === 200) {
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
      } finally {
        commit('SET_PROCESSING', false)
      }
    },

    logout({ commit }) {
      localStorage.removeItem('user')
      commit('SET_LOGOUT')
      this.$cookies.remove('token')
    },
  },
}
