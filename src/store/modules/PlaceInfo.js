import types from '../types.js'
import axios from 'axios'
import qs from 'qs'
import {getToken,getFieldsByJsonstr} from '../../common.js'

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
	set_placeinfo({commit},data){
		//console.log(data);
		commit(types.SET_PLACEINFO,data);
	},
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
	},
	[types.SET_PLACEINFO](state,data){
		state.placename = data.placename;			//渠道名称			
		state.placetel = data.placetel;								//联系电话
		state.placetype = data.placetype;							//类型
		if(data.placetype == 1){
			state.idnum = getFieldsByJsonstr(data.placedetails,'idnum');			//身份证号	(个人)
			state.iban = getFieldsByJsonstr(data.placedetails,'iban');			//银行账号	(个人)
			state.bank = getFieldsByJsonstr(data.placedetails,'bank');			//银行信息	(个人)	
		} else if(data.placetype == 2){
			state.charter = getFieldsByJsonstr(data.placedetails,'charter');			//营业执照	(公司)
			state.legal = getFieldsByJsonstr(data.placedetails,'legal');		//法人		(公司)
			state.address = getFieldsByJsonstr(data.placedetails,'address');			//地址		(公司)
		}	
		console.log(state);
	},
}

export default {
	state,
	getters,
	actions,
	mutations,
}
