import Vue from 'vue'
import Vuex from 'vuex'
//import actions from './actions'
//import getters from './getters'
//import mutations from './mutations'
import register from './modules/Register.js'
import custmerlist from './modules/CustomerList'
import customerInfo from './modules/CustomerInfo'
import PlaceInfo from './modules/PlaceInfo'

Vue.use(Vuex)

export default new Vuex.Store({
//	getters,
//	actions,
//	mutations,
	modules:{
		register,
		custmerlist,
		customerInfo,
		PlaceInfo,
	}
})
