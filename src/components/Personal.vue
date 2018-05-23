<template>
	<transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
		<div class='content personal' v-show='personalShow'>
			<mt-header title="个人资料" fixed >
				<mt-button icon="back" slot='left' @click='hide_personal'>返回</mt-button>
			</mt-header>
			<ul class='app-list'>
				<li><span>{{userData.username}}</span>账号</li>
				<li><span>{{userData.placename}}</span>渠道名称</li>
				<li><span>{{userData.placetel}}</span>联系方式</li>	
				<template v-if='userData.placetype == 1'>
					<li><span>{{getFieldsByJsonstr(userData.placedetails,'idnum')}}</span>身份证号</li>
					<li><span>{{getFieldsByJsonstr(userData.placedetails,'iban')}}</span>银行开户账号</li>
					<li><span>{{getFieldsByJsonstr(userData.placedetails,'bank')}}</span>开户行信息</li>	
				</template>
				<template v-if='userData.placetype == 2'>
					<li><span>{{getFieldsByJsonstr(userData.placedetails,'charter')}}</span>营业执照</li>
					<li><span>{{getFieldsByJsonstr(userData.placedetails,'legal')}}</span>法人姓名</li>
					<li><span>{{getFieldsByJsonstr(userData.placedetails,'address')}}</span>联系地址</li>	
				</template>
			</ul>	
		</div>
	</transition>
</template>

<script>
	import {mapGetters} from 'vuex'
	import 'animate.css/animate.css'
	import {getFieldsByJsonstr} from '../common.js'
	
	export default{
		created(){
			
		},
		data(){
			return {
				
			}
		},
		components:{
	
		},
		methods:{
			getFieldsByJsonstr,
			hide_personal(){
				this.$store.dispatch('hide_personal')
			}
		},
		computed:{
			...mapGetters(['personalShow','userData']),
		}
	}
</script>

<style lang='less'>
	.personal{
		background-color: #f0f0f0;
		.app-list{
			margin-top:40px;
			& span {
				color:#888;
			}
		}
	}
</style>