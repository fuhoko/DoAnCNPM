// export default {
//   state: {
//     customers: null,
//     query: {
//       page: 0,
//       limit: 10,
//       s: null,
//     },
//     total: 0,
//   },

//   mutations: {
//     SET_CUSTOMERS(state, payload) {
//       state.customers = payload
//     },
//     SET_CUSTOMER_TOTAL(state, payload) {
//       state.total = payload
//     },
//   },

//   actions: {
//     async fetchDataCustomers({ commit, state }) {
//       try {
//         const response = await this.$axios.get('/v1/customers', {
//           params: state.query,
//           headers: { authorization: 'Bearer ' + this.$cookies.get('token') },
//         })
//         commit('SET_CUSTOMERS', response.data.data)
//         commit('SET_CUSTOMER_TOTAL', response.data.total)
//       } catch (e) {
//         throw e.response.data.message[0].description
//       }
//     },
//   },
// }
