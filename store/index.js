import Vuex from 'vuex'
import user from './modules/user.js'

const store = () => {
  return new Vuex.Store({
    modules: {
      user,
    },
  })
}

export default store
