/* eslint-disable prettier/prettier */
export default {
    state: {
        users: null,
        allUsers: null,
        page: 1,
        limit: 20,
        total: 0,
        count: 0,
        pageCount: 0,
        selectedUser: [],
        userProcessing: false,
    },

    getters: {
        users: (state) => state.users,
        allUsers: (state) => state.allUsers,
        selectedUser: (state) => state.selectedUser,
        page: (state) => state.page,
        total: (state) => state.total,
        count: (state) => state.count,
        pageCount: (state) => state.pageCount,
        userProcessing: (state) => state.userProcessing
    },

    mutations: {
        SET_USERS(state, payload) {
            !state.users ? (state.users = payload) : state.users.push(payload)
            state.allUsers = payload
        },
        SET_USER_TOTAL(state, payload) {
            state.total = payload
        },
        SET_USER_PAGE(state, payload) {
            state.page = payload
        },
        SET_USER_PAGE_COUNT(state, payload) {
            state.pageCount = payload
        },
        SET_USER_SELECTED(state, payload) {
            state.selectedUser = payload
        },
        SET_PROCESSING(state, payload) {
            state.userProcessing = payload
        },
        ADD_USER(state, newUser) {
            const newId = Math.max(...state.allUsers.map(user => user.id)) + 1
            state.allUsers.splice(0, 0, { id: newId, ...newUser })
            state.users = state.allUsers
        }
    },

    actions: {
        async fetchDataUsers({ commit, state }) {
            try {
                const response = await this.$axios.get('/v1/users', {
                    params: { page: state.page, limit: state.limit },
                    headers: { authorization: 'Bearer ' + this.$cookies.get('token') },
                })

                if (response.status === 200) {
                    commit('SET_USERS', response.data.data)
                    commit('SET_USER_TOTAL', response.data.total)
                    commit('SET_USER_PAGE', response.data.page)
                    commit('SET_USER_PAGE_COUNT', response.data.pageCount)
                }
            } catch (e) {
                throw e.response.data.message[0].description
            }
        },
        setDataUserSelected({ commit, state }, payload) {
            const newData = state.users.map((item) => ({...item }))
            const target = newData.filter((item) => payload === item.id)[0]
            commit('SET_USER_SELECTED', target)
        },
        async addUser({ commit }, payload) {
            commit('SET_PROCESSING', true)
            try {
                const response = await this.$axios.post('/v1/users', payload, {
                    headers: { authorization: 'Bearer ' + this.$cookies.get('token') },
                })
                if (response.status === 200 || response.status === 201) {}
            } catch (e) {
                throw e.response.data.message[0].description
            } finally {
                commit('SET_PROCESSING', false)
            }
        },
        deleteUser({ commit }, payload) {
            return this.$axios.delete(`/v1/users/${payload}`, {
                headers: { authorization: 'Bearer ' + this.$cookies.get('token') },
            })
        },
        async editUser({ commit }, payload) {
            commit('SET_PROCESSING', true)
            try {
                const response = await this.$axios.patch(`/v1/users/${payload.id}`, payload, {
                    headers: { authorization: 'Bearer ' + this.$cookies.get('token') },
                })
                if (response.status === 200 || response.status === 201) {}
            } catch (e) {
                throw e.response.data.message[0].description
            } finally {
                commit('SET_PROCESSING', false)
            }
        }
    },
}