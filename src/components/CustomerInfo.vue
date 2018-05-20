<template>
	<transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
		<div class='content'  v-show='cusinfoShow'>
			<mt-header fixed title="新东方">
				<mt-button icon="back" slot='left' @click='hide_cusinfo'>返回</mt-button>
			</mt-header>
			<div class='main'>	
				<p>
					<mt-field label="客户名称" placeholder="请输入客户名称" ></mt-field>
			
					<mt-field label="客户电话" placeholder="请输入客户电话" ></mt-field>	
			
					<mt-field label="微信号" placeholder="请输入微信号" ></mt-field>	
			
					<mt-field label="意向国家" placeholder="请输入意向国家" ></mt-field>	
					
					<mt-field label="备注" placeholder="备注" type="textarea" rows="4"></mt-field>
				</p>
				<p class='btn'>
					<mt-button type="primary" size="large" >提    交</mt-button>
				</p>
			</div>
		</div>
   </transition>
</template>

<script>
	import {mapGetters} from 'vuex'
	
	//客户信息
	export default{
		data(){
			return {
				
			}
		},
		computed:{
			...mapGetters(['cusinfoShow'])
		},
		methods:{
			hide_cusinfo(){
				this.$store.dispatch('hide_cusinfo')
			}
		}
	}
</script>

<style scoped>

</style>