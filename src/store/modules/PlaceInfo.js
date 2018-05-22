import types from '../types.js'
import axios from 'axios'
import qs from 'qs'
import {getToken} from '../../common.js'

var formData = {
	placename:'',			//渠道名称			
	placetel:'',			//联系电话
	placetype:'',			//类型
	idnum:'',				//身份证号	(个人)
	iban:'',				//银行账号	(个人)
	bank:'',				//银行信息	(个人)	
	charter:'',				//营业执照	(公司)
	legal:'',				//法人		(公司)
	address:'',				//地址		(公司)
	
}
const state ={
	...formData,
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
	},
	user_audit({commit,state},callback){				//用户审核
		var _this = this;
		let postData = qs.stringify({
			...getToken(),
			placename	:state.placename,			//渠道名称			
			placetel	:state.placetel,			//联系电话
			placetype	:state.placetype,			//类型
			idnum		:state.idnum,				//身份证号	(个人)
			iban		:state.iban,				//银行账号	(个人)
			bank		:state.bank,				//银行信息	(个人)	
			charter		:state.charter,				//营业执照	(公司)
			legal		:state.legal,				//法人		(公司)
			address		:state.address,				//地址		(公司)
		})
		function getData(url){
			axios({
				method: 'post',
				url: _this._vm.$url + url,
				data: postData,
			}).then(function(response) {
				let result = response.data;
				if(result.code > 0){
					callback(result);
				}
			}).catch(function(error) {
				console.log(error);
			});
		}
		getData('/Api/Place/user_audit');
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
