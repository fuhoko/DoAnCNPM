/* eslint-disable prettier/prettier */
import Vuex from 'vuex'
import user from './modules/user.js'
import users from './modules/users.js'
import role from './modules/role.js'
import permission from './modules/permission.js'
import providers from './modules/providers.js'

const store = () => {
    return new Vuex.Store({
        modules: {
            user,
            users,
            role,
            permission,
            providers,
        },
    })
}

export default store