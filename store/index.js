/* eslint-disable prettier/prettier */
import Vuex from 'vuex'
import auth from './modules/auth.js'
import users from './modules/users.js'
import role from './modules/role.js'
import permission from './modules/permission.js'
import destination from './modules/destination.js'
import location from './modules/location.js'
import category from './modules/category.js'

const store = () => {
	return new Vuex.Store({
		modules: {
			auth,
			users,
			role,
			permission,
			destination,
			location,
			category,
		},
	})
}

export default store