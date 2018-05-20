import types from '../types.js'
import axios from 'axios'

const state ={
	placeInfoShow:false,
}

const getters = {
	placeInfoShow(state){
		return state.placeInfoShow;
	}
}

const actions = {
	show_placeinfo({commit}){
		commit(types.SHOW_PLACEINFO)
	},
	hide_placeinfo({commit}){
		commit(types.HIDE_PLACEINFO)
	}
}

const mutations = {
	[types.SHOW_PLACEINFO](state){
		state.placeInfoShow = true;
	},
	[types.HIDE_PLACEINFO](state){
		state.placeInfoShow = false;
	}
}

export default {
	state,
	getters,
	actions,
	mutations,
}
