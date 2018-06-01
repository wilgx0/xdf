<template>
  <div id="app">
		<mt-header fixed title="新东方"></mt-header>
		<div class='app-member'>
			<p @click='show_personal'>
				<span><img src="../static/img/right.png" alt="" /></span>
				<ul class='app-member-username'>
					<li>{{userData.username}}</li>
				  	<li style="font-size:12px;">{{userData.placetel}}</li>
				</ul>
			</p>
		</div>
		
		<div class='app-audit' v-if='!userStatus'>
				<p>
					<mt-button type="primary" @click='show_placeinfo'>渠道用户资料审核</mt-button>
				</p>
				<p>
					<mt-button type="primary" @click='loginOut' style='width:169px;'>退出登录</mt-button>	
				</p>
				
		</div>
		
		<ul class='app-list' v-if='userStatus'>
			<li @click='show_cusinfo'><span><img src="../static/img/right.png" alt="" /></span>提交客户信息</li>
			<li @click='show_cuslist'><span><img src="../static/img/right.png" alt="" /></span>我的客户</li>
			<li @click='show_discount'><span style='color:red;'>{{discountsum}}元	<img src="../static/img/right.png" alt="" /></span>我的返佣</li>
			<li @click='loginOut'><span><img src="../static/img/right.png" alt="" /></span>退出登录</li>
			<CustomerInfo></CustomerInfo>		
			<CustomerList></CustomerList>
			<Discount></Discount>
		</ul>		
		
		<Login></Login>
		<Index></Index>
		<PlaceInfo></PlaceInfo>
		<Personal></Personal>
  </div>
</template>

<script>
//	test
	import Login from './components/HelloWorld.vue'						//登录界面
	import Index from './components/Index.vue'								//加载遮罩
	import CustomerInfo from './components/CustomerInfo.vue'	//提交客户信息
  import PlaceInfo from './components/PlaceInfo.vue'				//渠道用户资料审核
	import {mapGetters} from 'vuex'
	import CustomerList from './components/CustomerList.vue'	//客户列表
	import Personal from './components/Personal.vue'					// 个人资料
	import Discount from './components/Discount.vue'					//返佣记录
	
	var storage = window.sessionStorage;
	
	export default {
		data(){
			return {
			}
		},
		methods:{
			loginOut(){			//退出登录
				storage.clear();
				location.reload(); 
			},
			show_cuslist(){													//显示客户信息列表
				this.$store.dispatch('show_cuslist')
			},
			show_cusinfo(){													//显示客户信息提交表单
				this.$store.dispatch('show_cusinfo')
			},
			show_placeinfo(){
				this.$store.dispatch('show_placeinfo')
			},
			show_personal(){		//显示个人资料界面
				//console.log('test')
				this.$store.dispatch('show_personal')
			},
			show_discount(){	//显示返佣列表
				this.$store.dispatch('show_discount')
			},
			isLogin(){			//检查用户是否登录			
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
						url: _this.$url + '/Api/place/getUser',
						data: postData,
					}).then(function(response) {
							var result = response.data;
							if(result.code > 0){		//登陆状态
								//记录登录用户的信息
								_this.$store.dispatch('set_userdata',result.data)
                                _this.$store.dispatch('set_placeinfo',result.data)
								//判断用户资料是否已通过审核
								if(result.data.status != 0){						
									//_this.userStatus = true;
									_this.$store.dispatch('set_userStatus',true)	//用户状态为已审核通过
									_this.$store.dispatch('get_discountsum')			//计算佣金总金额
								}
								_this.$store.dispatch('hide_index');
								_this.$store.dispatch('hide_login');
							} else { 				//尚未登录
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
		},
		computed:{
			...mapGetters(['userData','userStatus','discountsum']),
		},
		created() {
			this.isLogin();		//检查用户是否登录
			
		},
	  components:{
	  	Login,
	  	Index,
	  	CustomerInfo,
	  	PlaceInfo,
			CustomerList,
			Personal,
			Discount,
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
	margin-top:40px;
}
.btn {
	padding: 10px 20px;
}

/*隐藏组件的样式*/
.content {
	width: 100%;
	height: 100%;
	background-color: #f0f0f0;
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
	height:120px;
	background-color: #fff;
	position:relative;
}

.app-member > p {
	text-align: left;
  padding: 0 23px 0 20px;
  height: 120px;
  line-height: 120px;
}
.app-member  > p > span{
	float:right;
}
.app-member-username{
	height: 100%;
	position:absolute;
  top: -10px;
  left: 20px;
}
.app-member-username > li:first-child{
	color:#2c3e50;
}
.app-member-username > li{
	color:#888;
	height: 26px;
}
.app-audit{
    width: 100%;
    height: 400px;
}
.app-audit button{
	margin-top:50px;
}
.app-audit p {
	height:50px;
}
/*数据列表的样式 s*/
.snake{
	display: block;
	padding-left: 45%;
}
.page-loadmore-list{
	padding:0px;
	margin-top:40px;
}
.page-loadmore-list > li{
	list-style:none;
	height: 55px;
	line-height: 55px;
  border-top: 1px solid rgb(238, 238, 238);
	
}
@component-namespace page {
    @component loadmore {
      @descendent desc {
        text-align: center;
        color: #666;
        padding-bottom: 5px;
        &:last-of-type {
          border-bottom: solid 1px #eee;
        }
      }

      @descendent listitem {
        height: 50px;
        line-height: 50px;
        border-bottom: solid 1px #eee;
        text-align: center;
        &:first-child {
          border-top: solid 1px #eee;
        }
      }

      @descendent wrapper {
        overflow: scroll;
      }

      .mint-spinner {
        display: inline-block;
        vertical-align: middle;
      }
    }
}

@component mint-loadmore-bottom {
	span {
	  display: inline-block;
	  transition: .2s linear;
	  vertical-align: middle;
	
	  @when rotate {
	    transform: rotate(180deg);
	  }
	}
}
/*数据列表的样式 e*/


</style>
