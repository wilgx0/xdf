<template>
  <div id="app">
		<mt-header fixed title="新东方"></mt-header>
		<div class='app-member'>
			<p><span>></span>客户名称</p>
		</div>
		
		<div class='app-audit' v-if='!userStatus'>
			<mt-button type="primary" @click='show_placeinfo'>渠道用户资料审核</mt-button>
		</div>
		
		<ul class='app-list' v-if='userStatus'>
			<li @click='show_cusinfo'><span>></span>提交客户信息</li>
			<li ><span>></span>我的客户</li>
			<li><span>></span>我的返佣</li>
			<li><span>></span>查看单条返佣记录</li>
			<li><span>></span>退出登录</li>
			<CustomerInfo></CustomerInfo>		
		</ul>		
		
		<Login></Login>
		<Index></Index>
		<PlaceInfo></PlaceInfo>
  </div>
</template>

<script>
//	test
	import Login from './components/HelloWorld.vue';					//登录界面
	import Index from './components/Index.vue'								//加载遮罩
	import CustomerInfo from './components/CustomerInfo.vue'	//提交客户信息
  import PlaceInfo from './components/PlaceInfo.vue'				//渠道用户资料审核
	
	var storage = window.sessionStorage;
	
	export default {
		data(){
			return {
				userStatus:false,
			}
		},
		methods:{
			show_cusinfo(){
				this.$store.dispatch('show_cusinfo')
			},
			show_placeinfo(){
				this.$store.dispatch('show_placeinfo')
			}
		},
		watch:{
		
		},
		created() {
			//检查是否登录
			var _this = this;
			var token = storage.getItem('XX-Token');
			var device = storage.getItem('XX-Device-Type');
			let postData = _this.$qs.stringify({
					Token			: 	token,
					DeviceType:		device,
			});
			if(token != null && device != null) {
				_this.$http({
					method: 'post',
					url: _this.$url + '/Api/place/getUserId',
					data: postData,
				}).then(function(response) {
						//console.log(response);
						var result = response.data;
						//console.log(result);
						if(result.code > 0){		//登陆状态
							//判断用户资料是否已通过审核
							if(result.data.status != 0){
								_this.userStatus = true;
							}
							_this.$store.dispatch('hide_index');
							_this.$store.dispatch('hide_login');
						} else { 
							_this.$store.dispatch('hide_index');
							_this.$store.dispatch('show_login');
						}
				}).catch(function(error) {
					console.log(error);
				});
			} else {
				//用户未登陆
				_this.$store.dispatch('hide_index');
				_this.$store.dispatch('show_login');
			}
		},
	  components:{
	  	Login,
	  	Index,
	  	CustomerInfo,
	  	PlaceInfo,
	
	  },
	  
	}
	
</script>

<style>
body{
	background-color:#f0f0f0;
}	
#app {

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
 	text-align: center;
  color: #2c3e50;

}
.main{
	padding: 50px 20px;
}
.btn {
	padding: 10px 20px;
}
.content {
	width: 100%;
	height: 100%;
	background-color: #fff;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 999;
	overflow: auto;
}
.app-list{
	padding-left: 0;
	background-color:#fff;
	position:relative;
}
.app-list > li{
	list-style: none;
	height:50px;
  border-bottom: 1px solid #d9d9d9;
  line-height: 50px;
  padding:0 20px;
  text-align: left;
}
.app-list > li:first-child{
	border-top: 1px solid #d9d9d9;
}
.app-list > li > span{
	float :right;
	color:#d9d9d9;
}
.app-member{
	margin-top:40px;
	height:147px;
	background-color: #26a2ff;
	color:#fff;
}

.app-member > p {
	text-align: left;
  padding: 0 23px 0 20px;
  height: 147px;
  line-height: 147px;
}
.app-member  > p > span{
 
	float:right;
}
.app-audit{
    width: 100%;
    height: 400px;
}
.app-audit button{
	margin-top:50px;
}
</style>
