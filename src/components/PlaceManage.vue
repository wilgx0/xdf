<template>
	<div class='main'>
		<p>
			<mt-button type="primary" size="large">查看个人资料</mt-button>
		</p>
		
		<p>
			<mt-button type="primary" size="large">查看审核信息</mt-button>	
		</p>
		
		<p>
			<mt-button type="primary" size="large">查看已返佣总金额</mt-button>	
		</p>
		
		<p>
			<mt-button type="primary" size="large">查看单条返佣记录</mt-button>	
		</p>
		<p>
			<mt-button type="primary" size="large" @click='show_cuslist'>查看客户状态</mt-button>	
		</p>
		<CustomerList></CustomerList>
	</div>
</template>

<script>
	import CustomerList from './CustomerList.vue'
	export default{
		data(){
			return {
				
			}
		},
		components:{
			CustomerList
		},
		methods:{
			show_cuslist(){
				this.$store.dispatch('show_cuslist')
			}
		}
	}
</script>

<style>
</style>