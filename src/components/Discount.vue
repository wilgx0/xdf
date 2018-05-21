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
							<li v-for="item in discountlist" class="page-loadmore-listitem" @click='show_discountsub(item.customerid)'><span>{{item.amount}}元	<img src="../../static/img/right.png" alt="" /></span>{{item.name}}</li>
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
		</div>
	</transition>
</template>

<script>
	import 'animate.css/animate.css'
	import { mapGetters } from 'vuex'
	import DiscountSub from './DiscountSub.vue'
	
	export default {
	    created() {
	      this.first = true;
		  this.$store.dispatch('get_discountlist',this);
	    },
		mounted() {
		  this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
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
		},
		computed: {
			...mapGetters(['discountShow','discountlist'])
		},
		components:{
			DiscountSub
		},
	}
</script>

<style lang='less'>
	.discount{
		.page-loadmore-listitem{
		    text-align: left;
		    padding: 0 20px;
			& span {
				float:right;
			} 
		}
	}
</style>