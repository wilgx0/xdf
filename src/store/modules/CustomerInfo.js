import types from '../types.js'
import axios from 'axios'
import qs from 'qs'
import {getToken} from '../../common.js'
import { Toast, MessageBox ,Indicator} from 'mint-ui'

var formData = {
	cusName:'',					//客户名称
	cusTel:'',					//客户电话
	cusWx:'',					//客户微信号
	cusCountry:'',				//意向国家
	cusClass:'',				//意向年级
	cusRemark:'',				//备注
	id:'',						//id
    cusstate:0,					//客户状态
    signstate:'',               //签约状态
}

var formData_copy = JSON.parse(JSON.stringify(formData))

const state={
	...formData,
	cusinfoShow:false,
}

const getters = {
	cusinfoShow(state){
		return state.cusinfoShow
	},

}

const actions = {
	show_cusinfo({commit},id=''){		
		if(id){			//如果id有值表示属于修改,需根据id获取客户数据
			var _this = this;
			let postData = qs.stringify({
				...getToken(),
				id,
			})
			function getData(){
				axios({
					method: 'post',
					url: _this._vm.$url + '/Api/Customer/get_customerOne',
					data: postData,
				}).then(function(response) {
					let result = response.data;
					if(result.code > 0){
						//console.log(result);
						commit(types.SET_CUSFORMDATA,result.data)
					}
				}).catch(function(error) {
					console.log(error);
				});
			}
			getData();
		}
		commit(types.SHOW_CUSINFO);
	},
	hide_cusinfo({commit}){
		commit(types.HIDE_CUSINFO);
	},
	save_cusinfo({commit,state},callback){
		var _this = this;

		let tmpData = {
            cusName		:state.cusName,					//客户名称
            cusTel		:state.cusTel,					//客户电话
            cusWx		:state.cusWx,					//客户微信号
            cusCountry	:state.cusCountry,				//意向国家
            cusClass	:state.cusClass,				//意向年级
            cusRemark	:state.cusRemark,				//备注
            id			:state.id,						//id,
        };
        // if(!state.id){ //新增数据的操作，添加签约状态字段
        //     tmpData.signstate = state.signstate
        // }
		let postData = qs.stringify({
			...getToken(),
            ...tmpData,
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
		if(state.id){			//修改
			getData('/Api/Customer/edit_customer');
		} else {				//新增
			getData('/Api/Customer/add_customer');
		}
		
	},
    set_signstate({commit,state},val){                          //更新签约状态
        var _this = this;
        let postData = qs.stringify({
            signstate		:val,					    //客户名称
            id			    :state.id,						         //id

        })
        function getData(url){
            axios({
                method: 'post',
                headers:{
                    ...getToken(),
                },
                url: _this._vm.$url + url,
                data: postData,
            }).then(function(response) {
                let result = response.data;
                //console.log(result);
                Toast(result.msg);
            }).catch(function(error) {
                console.log(error);
            });
        }
        getData('/Api/Customer/set_signstate');
    }
}

const mutations = {
	[types.SHOW_CUSINFO](state) {
		state.cusinfoShow = true;
	},
	[types.HIDE_CUSINFO](state) {
		Object.assign(state,formData_copy);	//清空表单
		state.cusinfoShow = false;
	},
	[types.SET_CUSFORMDATA](state,data){

		state.cusName = data.name;			
		state.cusTel = data.tel;				
		state.cusWx = data.wx;				
		state.cusCountry = data.country;				
		state.cusClass = data.class;			
		state.cusRemark = data.remark;			
		state.id = data.id;
		state.cusstate = data.cusstate;
		state.signstate = data.signstate;
        // console.log(data);
        // console.log(state);
	},
}

export default {
	state,
	getters,
	actions,
	mutations,
}