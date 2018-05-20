<template>
	<transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
		<div class='content' v-show='registerShow'>
			<mt-header title="注册新用户" fixed >
				<mt-button icon="back" slot='left' @click='hide_register'>返回</mt-button>
			</mt-header>
			<div class='main'>	
				<p>
					
					<mt-field label="用户名" placeholder="请输入用户名" v-model="username" v-validate="'required|max:20'" name='用户名'></mt-field>
					<mt-field label="密码" placeholder="请输入密码" type="password" v-model="pwd" v-validate="'required|max:20'" name='密码'></mt-field>
					<mt-field label="重复密码" placeholder="请再次输入密码" type="password" v-model="rpwd" v-validate="'required|max:20'" name='重复密码'></mt-field>
				</p>
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

	
	export default {
		created(){
			this.defaultData = JSON.parse(JSON.stringify(this.$data));
		},
		data(){
			return {
				username:'',
				pwd:'',
				rpwd:'',
				errorStyle:'',
			}
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
				if(_this.pwd != _this.rpwd){
					Toast('二次输入的密码不一致！');
					return false;
				}
				_this.$validator.validateAll().then((result) => {
					if(result){
						let postData = _this.$qs.stringify({
							username: _this.username,
							pwd:_this.pwd,
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

<style > 

	
	

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