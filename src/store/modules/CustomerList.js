import types from '../types.js'
import axios from 'axios'
var storage = window.sessionStorage;
import qs from 'qs'

const state = {
	cuslistShow:false,
	cusList:[],		//数据列表
	cusLastPage:0,  //总页数
	page:1			//单前页数
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
	get_cuslist({commit,state},obj){
		var first = obj.first;
		var _this = this;
		if(!first){			//非第一次加载，每次调用页码加1
			++ state.page;
		}

		let token = storage.getItem('XX-Token');
		let device = storage.getItem('XX-Device-Type');
		let postData = qs.stringify({
				Token			: 	token,
				DeviceType		:	device,
				page			:	state.page,
		});
		
		//第一次加载的时候因为列表组件尚未渲染无法调用onBottomLoaded方法，所以这里需要进行判断
		function isFirst(){
			if(!first){
				obj.$refs.loadmore.onBottomLoaded();	//表示数据加载完毕	
			}	
		}
		//获取服务器的数据
		function getData(){
			axios({
				method: 'post',
				url: _this._vm.$url + '/Api/customer/get_customerlist',
				data: postData,
			}).then(function(response) {
				let result = response.data;
				
					commit(types.GET_CUSLIST,result.data)	
					isFirst()		
					if(obj.loadingAnimation){
						obj.loadingAnimation();
					}
				
			}).catch(function(error) {
				console.log(error);
			});
		}
		
		if(first){			//第一次加载数据，不需要判断页码是否是最后一页
			getData();
			return;
		}
		
		if(state.page <= state.cusLastPage){		//非第一次次加载调用的方法
			getData();
		} else {
			obj.allLoaded = true;
			isFirst();
		}
	},

}

const mutations = {
	[types.SHOW_CUSLIST](state){
		state.cuslistShow = true;
	},
	[types.HIDE_CUSLIST](state){
		state.cusList = [],		//数据列表
		state.cusLastPage = 0,  //总页数
		state.page = 1			//单前页数
		state.cuslistShow = false;
	},
	[types.GET_CUSLIST](state,data){
		
		state.cusList = state.cusList.concat(data.list);
		state.cusLastPage = data.pageCount;
		//console.log(state.cusList);
	},

}

export default {
	state,
	getters,
	actions,
	mutations,
}
