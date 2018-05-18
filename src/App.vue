<template>
  <div id="app">
  	<mt-header fixed title="新东方"></mt-header>
  	<div >
			<keep-alive>
        <router-view></router-view>
    	</keep-alive>
  	</div>
  	
		<mt-tabbar v-model="selected" fixed>
		  <mt-tab-item id='/placeinfo'>  
  	 		<img slot="icon" src="./assets/100x100.png">	 	
	    	渠道资料	    	
		  </mt-tab-item>
		  <mt-tab-item id='/customerinfo'>
		  	<img slot="icon" src="./assets/100x100.png">	
			   客户信息
		  </mt-tab-item>
		  <mt-tab-item id='/placemanage'> 
		  	<img slot="icon" src="./assets/100x100.png">
		        账号管理  
		  </mt-tab-item>
		  <mt-tab-item id='/adminmanage'>  
	  		<img slot="icon" src="./assets/100x100.png"> 
	  		管理员后台   
		  </mt-tab-item>
		</mt-tabbar>
		
		<Login></Login>
  </div>
</template>

<script>
	import Login from './components/HelloWorld.vue';
	var storage = window.sessionStorage;
	
	export default {
		data(){
			return {
				selected:'/placeinfo',
			}
		},
		methods:{
		
		},
		watch:{
			selected(val, oldVal){
				this.$router.push({path:val});
			}
		},
		created() {
			this.$router.push({path:this.selected});
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
						if(result.code > 0){		//登陆状态
							_this.$store.dispatch('hide_login');
						} else { 
							_this.$store.dispatch('show_login');
						}
				}).catch(function(error) {
					console.log(error);
				});
			} else {
				//用户未登陆
				_this.$store.dispatch('show_login');
			}
		},
	  components:{
	  	Login
	  },
	  
	}
	
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 35%;
}

</style>
