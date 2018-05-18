import types from '../types.js'
import axios from 'axios'

const state ={
	registerShow : false,
	loginShow : true,
}

const getters = {
	registerShow(state){
		return state.registerShow;
	},
	loginShow(state){
		return state.loginShow;
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
		commit(types.HIDE_LOGIN)
	},
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
}

export default {
	state,
	getters,
	actions,
	mutations,
}
