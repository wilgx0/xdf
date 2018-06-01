import types from '../types.js'
import axios from 'axios'
import qs from 'qs'
import {getToken} from '../../common.js'

const state = {
	cuslistShow:false,
	cusList:[],		//数据列表
	cusLastPage:0,  //总页数
	page:1			//当前页数
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
		var _this = this;
		state.cusList = [];
        state.cusLastPage = 0;  //总页数
		state.page = 1;			//当前页数

		let postData = qs.stringify({
			    ...getToken(),
				page			:	state.page,
				searchKey		:   obj.searchKey,
		});
		//获取服务器的数据
		function getData(){
			axios({
				method: 'post',
				url: _this._vm.$url + '/Api/customer/get_customerlist',
				data: postData,
			}).then(function(response) {
				let result = response.data;
                if(result.code > 0){
                    commit(types.GET_CUSLIST,result.data)
				}
				if(obj.loadingAnimation){
					obj.loadingAnimation();
				}
			}).catch(function(error) {
				console.log(error);
			});
		}
		getData();
	},
	loadMore({commit,state},obj){		//加载更多数据
		var _this = this;
        ++ state.page;

        let postData = qs.stringify({
            ...getToken(),
            page			:	state.page,
            searchKey		:   obj.searchKey,
        });

        //获取服务器的数据
        function getData(){
            axios({
                method: 'post',
                url: _this._vm.$url + '/Api/customer/get_customerlist',
                data: postData,
            }).then(function(response) {
                let result = response.data;
                if(result.code > 0){
                    commit(types.GET_CUSLIST,result.data);
				}
                obj.$refs.loadmore.onBottomLoaded();	//单次数据加载完毕
            }).catch(function(error) {
                console.log(error);
            });
        }
        if(state.page < state.cusLastPage){
            getData();
        } else {
            obj.allLoaded = true;			//所有数据加载完毕
            obj.$refs.loadmore.onBottomLoaded();
        }
	}


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
