<template>
	<transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
		<div class='content edit-invoice' v-show='editInvoiceShow'>
			<mt-header title="发票信息" fixed>
				<mt-button icon="back" slot='left' @click='hide_invoice'>返回</mt-button>
			</mt-header>
			<div class='main'>	
				<p>
					<mt-field label="快递单号" placeholder="" v-model='expressOdd'></mt-field>
					<mt-field label="快递名称" placeholder="" v-model='expressName'></mt-field>
				</p>
				<p class='btn'>
					<mt-button type="primary" size="large" @click='edit_invoice'>提    交</mt-button>
				</p>
			
  			</div>
		</div>
	</transition>
</template>

<script>
	import 'animate.css/animate.css'
	import { mapGetters } from 'vuex'
	import { Toast, MessageBox ,Indicator} from 'mint-ui'
	
	export default{
		created(){
	
		},
		data(){
			return {
				
			}
		},
		watch:{
			editInvoiceShow(val){
				if(val == true){
					this.$store.dispatch('get_invoice')
				}
			}
		},
		computed:{
			...mapGetters(['editInvoiceShow']),
			expressOdd:{
				set(value){
					this.$store.state.Discount.expressOdd = value
				},
				get(){
					return this.$store.state.Discount.expressOdd
				}
			},
			expressName:{
				set(value){
					this.$store.state.Discount.expressName = value
				},
				get(){
					return this.$store.state.Discount.expressName
				}
			},
		},
		methods:{
			hide_invoice(){
				this.$store.dispatch('hide_invoice')
			},
			edit_invoice(){
				var _this = this;
				this.$store.dispatch('edit_invoice',function(data){
					//console.log(data);
					Toast(data.msg);
					_this.$store.dispatch('hide_invoice')
				})
			}
		},
	}
	
</script>

<style lang='less'>
	.edit-invoice{
		
	}
</style>