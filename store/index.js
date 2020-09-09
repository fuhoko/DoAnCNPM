/* eslint-disable prettier/prettier */
import Vuex from 'vuex'
import user from './modules/user.js'
import users from './modules/users.js'
import role from './modules/role.js'
import permission from './modules/permission.js'

const store = () => {
    return new Vuex.Store({
        modules: {
            user,
            users,
            role,
            permission,
        },
    })
}

export default store