import types from '../types.js'
import axios from 'axios'
import qs from 'qs'
import {getToken} from '../../common.js'

var formData = {		//发票明细表单
	expressOdd:'',		//快递单号
	expressName:'',		//快递名称
	cusid:'',			     //客户id
}

var mainPage = {
	LastPage:0,  			//主页面总页数
	page:1,					//主页面当前页数
	discountlist:[],		//主页面数据列表
}

const state ={
	...formData,
	...mainPage,
	discountShow:false,		//佣金主页面的显示
	discountSubShow:false,	//佣金明细页面的显示
	editInvoiceShow:false,	//发票信息页面的显示
   
    discountsublist:[],		//子页面的数据明细	
	subpage:1,				//子页面当前页
	sublastpage:0,			//子页面的总页数
	subid:0,				//子页面当前id
	discountsum: 0,			//佣金合计数
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
	discountsum(state){
		return state.discountsum;
	},
	editInvoiceShow(state){
		return state.editInvoiceShow
	}
}

const actions = {
	edit_invoice({commit,state},callback){		//修改操作
		var _this = this;
		let postData = qs.stringify({
			...getToken(),
			expressOdd:state.expressOdd,		//快递单号
			expressName:state.expressName,		//快递名称
			cusid:state.cusid,			        //客户id
		})
		function getData(){
			axios({
				method: 'post',
				url: _this._vm.$url + '/Api/Discount/edit_invoice',
				data: postData,
			}).then(function(response) {
				let result = response.data;
				if(callback){
					callback(result);
				}		
			}).catch(function(error) {
				console.log(error);
			});
		}
		getData();
	},
	get_invoice({commit,state}){		//获取发票信息
		var _this = this;
		let postData = qs.stringify({
			...getToken(),
			cusid:state.cusid,
		})
		function getData(){
			axios({
				method: 'post',
				url: _this._vm.$url + '/Api/Discount/get_invoice',
				data: postData,
			}).then(function(response) {
				let result = response.data;
				if(result.code > 0){
					//console.log(result.data);
					commit(types.GET_INVOICE,result.data)
				}
			}).catch(function(error) {
				console.log(error);
			});
		}
		getData();
	},
	show_invoice({commit},id){
		commit(types.SHOW_INVOICE,id)
	},
	hide_invoice({commit}){
		commit(types.HIDE_INVOICE)
	},
	get_discountsum({commit}){			//获取佣金列表合计数
		var _this = this;
		let postData = qs.stringify({
			...getToken(),
		})
		function getData(){
			axios({
				method: 'post',
				url: _this._vm.$url + '/Api/Discount/get_discountsum',
				data: postData,
			}).then(function(response) {
				let result = response.data;
				if(result.code > 0){
					//console.log(result.data);
					commit(types.SET_DISCOUNTSUM,result.data)
				}
			}).catch(function(error) {
				console.log(error);
			});
		}
		getData();
	},
	get_discountsub_more({commit,state},obj){			//子页面加载更多数据
		var _this = this;
		let postData = qs.stringify({
			...getToken(),
			page			:	++state.subpage,
			id				:   state.subid,
		})
		function getData(){
			axios({
				method: 'post',
				url: _this._vm.$url + '/Api/Discount/get_discountsublist',
				data: postData,
			}).then(function(response) {
				let result = response.data;
				if(result.code > 0){
					obj.$refs.loadmore.onBottomLoaded();	
					result.data.id = state.subid
					commit(types.SET_DISCOUNTSUBLIST,result.data)		
				}
			}).catch(function(error) {
				console.log(error);
			});
		}
		if(state.subpage <= state.sublastpage){		//非第一次次加载调用的方法
			getData();
		} else {
			obj.allLoaded = true;
			obj.$refs.loadmore.onBottomLoaded();	
		}
	},
	hide_discountsub({commit}){				//隐藏子页面
		commit(types.HIDE_DISCOUNTSUB)
	},
	show_discountsub({commit,state},id){ 	//显示子页面并加载数据	
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
					result.data.id = id
					commit(types.SET_DISCOUNTSUBLIST,result.data)		
				}
			}).catch(function(error) {
				console.log(error);
			});
		}
		getData();
		commit(types.SHOW_DISCOUNTSUB)
	},
	show_discount({commit}){			//显示客户佣金列表
		commit(types.SHOW_DISCOUNT)
	},
	hide_discount({commit}){			//隐藏佣金列表
		commit(types.HIDE_DISCOUNT)
	},
	get_discountlist({commit,state},obj){			//加载佣金列表数据
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
				//if(result.code > 0){
					//console.log(result);
					commit(types.GET_DISCOUNTLIST,result.data)	
					isFirst()		
					if(obj.loadingAnimation){
						obj.loadingAnimation();
					}
				//}
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
		state = Object.assign(state,mainPage)
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
		state.subpage = 1;
		state.discountSubShow = false;
	},
	[types.SET_DISCOUNTSUBLIST](state,data){
		state.subid = data.id;
		state.discountsublist = state.discountsublist.concat(data.list);
		state.sublastpage = data.pageCount;
	},
	[types.SET_DISCOUNTSUM](state,data){
		state.discountsum = data;
	},
	[types.SHOW_INVOICE](state,id){
		state.cusid = id
		state.editInvoiceShow = true;
	},
	[types.HIDE_INVOICE](state){
		state = Object.assign(state,formData)
		state.editInvoiceShow = false;
	},
	[types.GET_INVOICE](state,data){
		if(!data){
			return;
		}
		data = JSON.parse(data);
		if(data.expressOdd && data.expressName){	
			state.expressOdd = data.expressOdd;
			state.expressName = data.expressName;
		}
	}
}

export default {
	state,
	getters,
	actions,
	mutations,
}
