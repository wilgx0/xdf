import types from '../types.js'

const state={
	cusinfoShow:false,
}

const getters = {
	cusinfoShow(state){
		return state.cusinfoShow
	}
}

const actions = {
	show_cusinfo({commit}){
		commit(types.SHOW_CUSINFO);
	},
	hide_cusinfo({commit}){
		commit(types.HIDE_CUSINFO);
	},
}

const mutations = {
	[types.SHOW_CUSINFO](state) {
		state.cusinfoShow = true;
	},
	[types.HIDE_CUSINFO](state) {
		state.cusinfoShow = false;
	}
}

export default {
	state,
	getters,
	actions,
	mutations,
}