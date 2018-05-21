import types from '../types.js'
import axios from 'axios'

const state ={
	registerShow : false,
	loginShow : true,
	indexShow:true,
	userData:{},			//用户数据
	userStatus:false,		//用户状态
	personalShow:false,		
	
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
	},
	userData(state){
		return state.userData;
	},
	userStatus(state){
		return state.userStatus;
	},
	personalShow(state){
		return state.personalShow;
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
	},
	set_userdata({commit},data){
		commit(types.SET_USERDATA,data)
	},
	set_userStatus({commit},val){
		commit(types.SET_USERSTATUS,val)
	},
	show_personal({commit}){
		commit(types.SHOW_PERSONAL)
	},
	hide_personal({commit}){
		commit(types.HIDE_PERSONAL)
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
	},
	[types.SET_USERDATA](state,data){
		state.userData = data
		//console.log(state.userData)
	},
	[types.SET_USERSTATUS](state,val){
		state.userStatus = val;
	},
	[types.SHOW_PERSONAL](state){
		state.personalShow = true;
	},
	[types.HIDE_PERSONAL](state){
		state.personalShow = false;
	},
}

export default {
	state,
	getters,
	actions,
	mutations,
}
