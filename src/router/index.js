import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import App from '../App.vue'
import PlaceInfo from '../components/PlaceInfo.vue'
import CustomerInfo from '../components/CustomerInfo.vue'
import PlaceManage from '../components/PlaceManage.vue'
import AdminManage from '../components/AdminManage.vue'

Vue.use(Router)

export default new Router({ 
  routes: [
    {
      path: '/',
      component: App
    },
    {
    	path:'/placeinfo',	//渠道资料审核
    	component:PlaceInfo,
    },
    {
    	path:'/customerinfo',	//客户信息
    	component:CustomerInfo,
    },
    {
    	path:'/placemanage',	//用户账号管理
    	component:PlaceManage,
    },
    {
    	path:'/adminmanage',	//管理员管理
    	component:AdminManage,
    },
		{
			path:'*',
			redirect:'/',
		}
  ]
})
