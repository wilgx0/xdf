<template>
	<transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
	  <div class='content' v-show='loginShow'>  	
		  	<mt-header fixed title="新东方"></mt-header>
	  		<div  class='main'>
			  	<h1 class='loging-h1'>用户登录</h1>
			  	<p>
		  		  <mt-field label="用户名" placeholder="请输入用户名" v-model="username" v-validate="'required|max:20'" name='用户名'></mt-field>
				  <mt-field label="密码" placeholder="请输入密码" type="password" v-model="pwd" v-validate="'required|max:20'" name='密码'></mt-field>
			  	</p>
			 
				<p class='btn'>
					<mt-button type="primary" size="large" @click="login">登  录</mt-button>
				</p>			
				<p class='btn'>
					<mt-button type="default" size="large" @click="show_register">注册新用户</mt-button>
				</p>
				
				<span v-show="errors.any()" v-cloak :class='["error",errorStyle]'> 
	  				<p v-for="(v,i) in errors.all()">{{v}}</p>
	  			</span>
			</div>
			<Register></Register>
	  </div>
  </transition>
</template>

<script>
import Register from './Register.vue'
import { Toast, MessageBox,Indicator } from 'mint-ui'
import {mapGetters} from 'vuex'
var storage = window.sessionStorage; 

export default {
  data () {
    return {
    	username:'',
    	pwd:'',
    	errorStyle:'',
    }
  },
  methods:{
  	login(){
			var _this = this;
			_this.$validator.validateAll().then((result) => {
				if(result){
					let postData = _this.$qs.stringify({
						username: _this.username,
						pwd:_this.pwd,
						deviceType : 'mobile'
					});
					Indicator.open('加载中...');
					_this.$http({
						method: 'post',
						url: _this.$url + '/Api/place/login',
						data: postData,
					}).then(function(response) {
						//console.log(response);
						var result = response.data;
						//console.log(result);
						if(result.code > 0){			//登录成功
							storage.setItem('XX-Token', result.data.token);  
							storage.setItem('XX-Device-Type', 'mobile');  
							storage.setItem('user', JSON.stringify(result.data.user)); 
							_this.$store.dispatch('hide_login');
						    //记录登录用户的信息			
							_this.$store.dispatch('set_userdata',result.data.user)
							_this.$store.dispatch('set_placeinfo',result.data.user)
							//检查用户是否已通过审核
							if(result.data.user.status == 1){	
								_this.$store.dispatch('get_discountsum')			//计算佣金总金额
								_this.$store.dispatch('set_userStatus',true)
							}
						} else {		//登陆失败 
							Toast(result.msg);
						}
						Indicator.close();
					}).catch(function(error) {
						Indicator.close();
						Toast(error);
						console.log(error);
					})
				}
			})	
  	},
  	show_register(){
  		this.$store.dispatch('show_register');
  	}
  },
  components:{
  	Register,
  },
	computed:{
		...mapGetters(['loginShow'])
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

	.loging-h1 {
		margin:20px;
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
