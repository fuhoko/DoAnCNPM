export default {
  state: {
    categories: null,
  },

  mutations: {},

  actions: {
    async fetchDataCategories() {
      try {
        const response = await this.$axios.get('/v1/service_categories', {
          headers: { authorization: 'Bearer ' + this.$cookies.get('token') },
        })
        console.log(response)
      } catch (e) {
        throw e.response.data.message[0].description
      }
    },
  },
}
