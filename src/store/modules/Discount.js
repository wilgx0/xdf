import types from '../types.js'
import axios from 'axios'
import qs from 'qs'

/**
 * 获取登录用户的token和设备类型
 */
function getToken(){
	var storage = window.sessionStorage;
	let token = storage.getItem('XX-Token');
	let device = storage.getItem('XX-Device-Type');
	return {
		Token			: 	token,
		DeviceType		:	device,
	}
}


const state ={
	discountShow:false,	
	discountSubShow:false,	
    discountlist:[],		//数据列表
    discountsublist:[],		//子页面的数据明细	
	LastPage:0,  			//总页数
	page:1,					//当前页数
	subpage:1,				//子页面当前页
	sublastpage:0,			//子页面的总页数
}

const getters = {
	discountShow(state){
		return state.discountShow;
	},
	discountlist(state){
		return state.discountlist;
	},
	discountSubShow(state){
		return state.discountSubShow;
	},
	discountsublist(state){
		return state.discountsublist;
	},
	
}

const actions = {
	hide_discountsub({commit}){
		commit(types.HIDE_DISCOUNTSUB)
	},
	show_discountsub({commit,state},id){
		var _this = this;
		let postData = qs.stringify({
			...getToken(),
			page			:	state.subpage,
			id:id,
		})
		function getData(){
			axios({
				method: 'post',
				url: _this._vm.$url + '/Api/Discount/get_discountsublist',
				data: postData,
			}).then(function(response) {
				let result = response.data;
				if(result.code > 0){
					commit(types.SET_DISCOUNTSUBLIST,result.data)		
				}
			}).catch(function(error) {
				console.log(error);
			});
		}
		getData();
		commit(types.SHOW_DISCOUNTSUB)
	},
	show_discount({commit}){
		commit(types.SHOW_DISCOUNT)
	},
	hide_discount({commit}){
		commit(types.HIDE_DISCOUNT)
	},
	get_discountlist({commit,state},obj){
		var first = obj.first;
		var _this = this;
		if(!first){			//非第一次加载，每次调用页码加1
			++ state.page;
		}
	
		let postData = qs.stringify({
			...getToken(),
			page			:	state.page,
		})
		
		//第一次加载的时候因为列表组件尚未渲染无法调用onBottomLoaded方法，所以第一次加载不调用此方法
		function isFirst(){
			if(!first){
				obj.$refs.loadmore.onBottomLoaded();	//表示数据加载完毕	
			}	
		}
		//获取服务器的数据
		function getData(){
			axios({
				method: 'post',
				url: _this._vm.$url + '/Api/Discount/get_discountlist',
				data: postData,
			}).then(function(response) {
				let result = response.data;
				if(result.code > 0){
					commit(types.GET_DISCOUNTLIST,result.data)	
					isFirst()		
				}
			}).catch(function(error) {
				console.log(error);
			});
		}
		
		if(first){			//第一次加载数据，不需要判断页码是否是最后一页
			getData();
			return;
		}
		
		if(state.page <= state.LastPage){		//非第一次次加载调用的方法
			getData();
		} else {
			obj.allLoaded = true;
			isFirst();
		}
	}
}

const mutations = {
	[types.SHOW_DISCOUNT](state){
		state.discountShow = true;
	},
	[types.HIDE_DISCOUNT](state){
		state.discountShow = false;
	},
	[types.GET_DISCOUNTLIST](state,data){
		state.discountlist = state.discountlist.concat(data.list);
		state.LastPage = data.pageCount;
	},
	[types.SHOW_DISCOUNTSUB](state){
		state.discountSubShow = true;
	},
	[types.HIDE_DISCOUNTSUB](state){
		state.discountsublist = [];
		state.discountSubShow = false;
	},
	[types.SET_DISCOUNTSUBLIST](state,data){
		state.discountsublist = state.discountsublist.concat(data.list);
		state.sublastpage = data.pageCount;
	}
}

export default {
	state,
	getters,
	actions,
	mutations,
}
