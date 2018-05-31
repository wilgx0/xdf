<template>
	<transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
		<div class='content register' v-show='registerShow'>
			<mt-header title="注册新用户" fixed >
				<mt-button icon="back" slot='left' @click='hide_register'>返回</mt-button>
			</mt-header>
			<div class='main'>	
				<p>
					<mt-field label="用户名" placeholder="请输入用户名" v-model="username" v-validate="'required|max:20'" name='用户名'></mt-field>
					<mt-field label="密码" placeholder="请输入密码" type="password" v-model="pwd" v-validate="'required|max:20'" name='密码'></mt-field>
					<mt-field label="重复密码" placeholder="请再次输入密码" type="password" v-model="rpwd" v-validate="'required|max:20'" name='重复密码'></mt-field>

				</p>

				<!--修改 s-->
				<p style="margin-top:15px;">
					<mt-field label="渠道名称" placeholder="请输入渠道名称" v-model='placename'  v-validate="'required|max:20'" name='渠道名称'></mt-field>
					<mt-field label="联系电话" placeholder="请输入联系方式" v-model='placetel'  v-validate="'required|phone'" name='联系电话'></mt-field>
					<mt-field label="联系地址" placeholder="联系地址" v-model='address' v-validate="'required|max:50'" name='联系地址'></mt-field>
					<mt-field label="开户银行账号" placeholder="银行开户账号" v-model='iban' v-validate="'required|max:20'" name='银行开户账号' ></mt-field>
					<mt-field label="开户银行信息" placeholder="开户行信息" v-model='bank' v-validate="'required|max:20'" name='开户行信息' ></mt-field>
				</p>
				<p style='padding-top: 15px;text-align:left;margin-bottom:15px;'>
					<mt-radio
							class="page-part"
							title="请选择渠道类型"
							v-model="placetype"
							v-validate="'required'"
							name = '渠道类型'
							:options="options" />
				</p>
				<p v-if='placetype == 1'>
					<mt-field label="身份证号" placeholder="身份证号" v-model= 'idnum'  name='身份证号' ></mt-field>

				</p>
				<p v-else-if='placetype == 2'>
					<mt-field label="营业执照" placeholder="营业执照" v-model='charter'  name='营业执照' ></mt-field>
					<mt-field label="法人姓名" placeholder="法人姓名" v-model='legal'  name='法人姓名' ></mt-field>
					<mt-field label="联系人" placeholder="联系人" v-model='linkman'  name='联系人' ></mt-field>
				</p>

				<!--修改 e-->

				<p class='btn'>
					<mt-button type="primary" size="large" @click="register">提    交</mt-button>
				</p>
				<span v-show="errors.any()" v-cloak :class='["error",errorStyle]'> 
	  				<p v-for="(v,i) in errors.all()">{{v}}</p>
	  			</span>
  			</div>
		</div>
	</transition>
</template>

<script>
	import 'animate.css/animate.css'
	import {mapGetters} from 'vuex'
	import { Toast, MessageBox ,Indicator} from 'mint-ui'
    import {myValidate} from '../common.js'


	var postData = {
        username:'',			//登录账号
        pwd:'',					//登录密码
        rpwd:'',

        placename:'',			//渠道名称
        placetel:'',			//渠道联系电话
        placetype:'',			//渠道类型

        address:'',				//联系地址
        iban:'',				//银行账号
        bank:'',				//银行信息


        idnum:'',				//身份证号		(个人)

        charter:'',				//营业执照		(公司)
        legal:'',				//法人代表		(公司)
        linkman:'',				//联系人   		(公司)
	};
	export default {
		created(){
			this.defaultData = JSON.parse(JSON.stringify(this.$data));
            this.options = [
                {
                    label: '个人',
                    value: '1'
                },
                {
                    label: '公司',
                    value: '2'
                }
            ];
		},
		data(){
			return {
                errorStyle:'',			//错误样式
				...postData,
			}
		},
		watch:{

		},
		computed:{
			...mapGetters(['registerShow'])
		},
		methods:{
			hide_register(){		//隐藏用户注册界面
				this.$store.dispatch('hide_register');
			},
			register(){				//用户注册
				var _this = this;
				_this.$validator.validateAll().then((result) => {
					if(result){
					    //数据验证
                        if(_this.pwd != _this.rpwd){
                            Toast('二次输入的密码不一致！'); return;
                        }
                        if(_this.placetype == 1){           //个人
                            if(!myValidate(this.idnum,'isIdCard')){
                               Toast('请正确填写身份证号!'); return;
                            }
                        } else if(_this.placetype == 2){    //公司
                            if(!myValidate(this.charter,'maxLength',20) || !myValidate(this.charter,'required')){
                                Toast('营业执照必填且最大长度20位!');return;
                            }
                            if(!myValidate(this.legal,'maxLength',20) || !myValidate(this.legal,'required')){
                                Toast('法人代表必填且最大长度20位!');return;
                            }
                            if(!myValidate(this.linkman,'maxLength',20) || !myValidate(this.linkman,'required')){
                                Toast('联系人必填且最大长度20位!');return;
                            }
                        }
                        //发送请求
						let postData = _this.$qs.stringify({
							..._this.$data,
						});
						Indicator.open('加载中...');
						_this.$http({
							method: 'post',
							url: _this.$url + '/Api/place/register',
							data: postData,
						}).then(function(response) {
							Indicator.close();
							//console.log(response);
							var result = response.data;
							MessageBox('提示', result.msg);
							if(result.code > 0){   //注册成功，清除表单数据并返回首页							
								_this.$store.dispatch('hide_register');
								Object.assign(_this.$data, _this.defaultData);
								_this.errorStyle='hide';
								setTimeout(function(){	//处理清理表单后触发验证的问题
									_this.errors.clear();
									_this.errorStyle='';
								},300)
							}						
						}).catch(function(error) {
							Indicator.close();
							Toast(error);
							console.log(error);
						})
					}
				})		
			},		
		}
	}
</script>

<style lang="less">
	.register{

	}

	.mint-indicator-wrapper{
		z-index:999;
	}
	
	.error {
		color: red;
	}
	
	.error > p {
		margin-top: 10px;
		text-align: center;
	}
	.hide{
		display:none;
	}
</style>