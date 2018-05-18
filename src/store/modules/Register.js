import types from '../types.js'
import axios from 'axios'

const state ={
	registerShow : false,
	loginShow : true,
	indexShow:true,
}

const getters = {
	registerShow(state){
		return state.registerShow;
	},
	loginShow(state){
		return state.loginShow;
	},
	indexShow(state){
		return state.indexShow;
	}
	
}

const actions = {
	show_register({commit}){
		commit(types.SHOW_RIGISTER);
	},
	hide_register({commit}){
		commit(types.HIDE_RIGISTER)
	},
	show_login({commit}){
		commit(types.SHOW_LOGIN);
	},
	hide_login({commit}){
		commit(types.HIDE_LOGIN);
	},
	show_index({commit}){
		commit(types.SHOW_INDEX);
	},
	hide_index({commit}){
		commit(types.HIDE_INDEX);
	}
}

const mutations = {
	[types.SHOW_RIGISTER](state){
		state.registerShow = true;
	},
	[types.HIDE_RIGISTER](state){
		state.registerShow = false;
	},
	[types.SHOW_LOGIN](state){
		state.loginShow = true;
	},
	[types.HIDE_LOGIN](state){
		state.loginShow = false;
	},
	[types.SHOW_INDEX](state){
		state.indexShow = true;
	},
	[types.HIDE_INDEX](state){
		state.indexShow = false;
	}
}

export default {
	state,
	getters,
	actions,
	mutations,
}
