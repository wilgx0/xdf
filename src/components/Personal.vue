<template>
	<transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
		<div class='content personal' v-show='personalShow'>
			<mt-header title="个人资料" fixed >
				<mt-button icon="back" slot='left' @click='hide_personal'>返回</mt-button>
			</mt-header>
			<ul class='app-list'>
				<li><span>{{userData.username}}</span>账号</li>
				<li><span>{{userData.placename}}</span>渠道名称</li>
				<li><span>{{userData.placetel}}</span>联系电话</li>
				<li><span>{{userData.address}}</span>联系地址</li>
				<li><span>{{userData.iban}}</span>银行账号</li>
				<li><span>{{userData.bank}}</span>银行信息</li>

				<template v-if='userData.placetype == 1'>
					<li><span>{{userData.idnum}}</span>身份证号</li>
				</template>
				<template v-if='userData.placetype == 2'>
					<li><span>{{userData.charter}}</span>营业执照</li>
					<li><span>{{userData.legal}}</span>法人代表</li>
					<li><span>{{userData.linkman}}</span>联系人</li>
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