import types from '../types.js'
import axios from 'axios'
var storage = window.sessionStorage;
import qs from 'qs'

const state = {
	cuslistShow:false,
	cusList:[],
	cusLastPage:1,
}

const getters = {
	cuslistShow(state){
		return state.cuslistShow;	
	},
	cusList(state){
		return state.cusList;
	},
	cusLastPage(state){
		return state.cusLastPage;
	}
}

const actions = {
	show_cuslist({commit}){
		commit(types.SHOW_CUSLIST);
	},
	hide_cuslist({commit}){
		commit(types.HIDE_CUSLIST);
	},
	get_cuslist({commit},page){
		let token = storage.getItem('XX-Token');
		let device = storage.getItem('XX-Device-Type');
		let postData = qs.stringify({
				Token			: 	token,
				DeviceType		:	device,
				page			:	page,
		});

		axios({
			method: 'post',
			url: this._vm.$url + '/Api/customer/get_customerlist',
			data: postData,
		}).then(function(response) {
			let result = response.data;
			//console.log(response);
			if(result.code > 0){
				commit(types.GET_CUSLIST,result.data)
			}
		}).catch(function(error) {
			console.log(error);
		});
	}
}

const mutations = {
	[types.SHOW_CUSLIST](state){
		state.cuslistShow = true;
	},
	[types.HIDE_CUSLIST](state){
		state.cuslistShow = false;
	},
	[types.GET_CUSLIST](state,data){
		state.cusList = state.cusList.concat(data);
		console.log(state.cusList);
	}
}

export default {
	state,
	getters,
	actions,
	mutations,
}
