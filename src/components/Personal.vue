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
				<li><span>无</span>其他</li>	
			</ul>	
		</div>
	</transition>
</template>

<script>
	import {mapGetters} from 'vuex'
	import 'animate.css/animate.css'
	
	export default{
		data(){
			return {
				
			}
		},
		components:{
	
		},
		methods:{
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