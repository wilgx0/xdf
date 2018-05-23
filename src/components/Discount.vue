<template>
	<transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
		<div class='content discount' v-show='discountShow'>
			<mt-header title="我的返佣" fixed>
				<mt-button icon="back" slot='left' @click='hide_discount'>返回</mt-button>
			</mt-header>
			<div class="page-loadmore">
		
				<div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
					<mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
						<ul class="page-loadmore-list">
							<li v-for="item in discountlist" class="page-loadmore-listitem" @click='show_discountsub(item.customerid)'>
								<div>
									<span>
										{{item.amount}}元		
										<img src="../../static/img/right.png" alt="" />
									</span>
									<span>
									{{item.name}}
									</span>
								</div>
								<div style='clear: both;width:0px;height:0px'></div>
								<div class='invoice'>
									<div >
										<p><em>快递单号:</em>{{getFieldsByJsonstr(item.invoice,'expressOdd')}}</p>
										<p><em>快递名称:</em>{{getFieldsByJsonstr(item.invoice,'expressName')}}</p>
									</div>
									<div>
										<mt-button size="small" type="primary" @click.stop='show_invoice(item.customerid)'>发票信息</mt-button>
									</div>			
								</div>
								<div style='clear: both;width:0px;height:0px'></div>
							</li>
						</ul>
						<div slot="bottom" class="mint-loadmore-bottom">
							<span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
							<span v-show="bottomStatus === 'loading'">
		            			<mt-spinner type="snake"  class='snake'></mt-spinner>
		         			</span>
						</div>
					</mt-loadmore>
				</div>
			</div>
			<DiscountSub></DiscountSub>
			<EditInvoice></EditInvoice>
		</div>
	</transition>
</template>

<script>
	import 'animate.css/animate.css'
	import { mapGetters } from 'vuex'
	import DiscountSub from './DiscountSub.vue'
	import EditInvoice from './EditInvoice.vue'
	import {getFieldsByJsonstr} from '../common.js'
	import {Indicator} from 'mint-ui'
	
	
	export default {
	    created() {
	    
	    },
		mounted() {
		  this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
		},
		watch:{
			discountShow(val){
				if(val == true){
					this.allLoaded = false;
				  	this.first = true;
				  	Indicator.open('加载中...');
	  				this.$store.dispatch('get_discountlist',this);
				}
			},
		},
		data() {
			return {
		        allLoaded: false,
		        bottomStatus: '',
		        wrapperHeight: 0,
		        first:false,			//是否第一次加载
			}
		},
		methods: {
			loadingAnimation(){
				Indicator.close();
			},
			getFieldsByJsonstr,
			show_discountsub(id){			//显示佣金明细列表
				this.$store.dispatch('show_discountsub',id)
			},
			hide_discount() {
				this.$store.dispatch('hide_discount')
			},
			handleBottomChange(status) {
				this.bottomStatus = status;
			},
		
			loadBottom() {
			    this.first = false;
				this.$store.dispatch('get_discountlist',this);	
			},
			show_invoice(id){
				this.$store.dispatch('show_invoice',id)
			},
		},
		computed: {
			...mapGetters(['discountShow','discountlist'])
		},
		components:{
			DiscountSub,
			EditInvoice,
		},
	}
</script>

<style lang='less'>
	.discount{
		.page-loadmore-listitem{
			height: 85px;
		    text-align: left;
		    padding: 0 20px;
		    div{
		    	height:49%;
		    	line-height: 49%;
		    	&:first-child{
		    		span{
		    			height:40px;
						line-height:40px; 
		    			&:first-child {
							float:right;
							color: #888;
							button{
								height: 29px;
							}
						} 
		    		}
		    		
		    	}
		    	
		    	&.invoice{
					font-size:14px;
					div{
						float:right;
						text-align: right;
						height:100%;
						width: 48%;
						em{
							font-style:normal;
							color:#888;
						}
					}
					div:first-child{
						float:left;
						text-align: left;
						p{
							height:20px;
							line-height: 20px;
						}
					}
				}
		    	
		    	
		    }
			
			
		}
	}
</style>