<template>
	<transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
		<div class='content discountsub' v-show='discountSubShow'>
			<mt-header title="返佣明细" fixed>
				<mt-button icon="back" slot='left' @click='hide_discountsub'>返回</mt-button>
			</mt-header>
			
			<div class="page-loadmore">
				<div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
					<mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
						<ul class="page-loadmore-list">
							<li v-for="item in discountsublist" class="page-loadmore-listitem"><span>{{ item.amount }}</span>{{ timestampToTime(item.createtime) }}</li>
						</ul>
						<div slot="bottom" class="mint-loadmore-bottom">
							<span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
							<span v-show="bottomStatus === 'loading'">
            					<mt-spinner type="snake" class='snake'></mt-spinner>
          					</span>
						</div>
					</mt-loadmore>
				</div>
			</div>
			
		</div>
	</transition>
</template>

<script>
	import { mapGetters } from 'vuex'
	
	function timestampToTime(timestamp) {
		var Y,M,D,h,m,s;
        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        Y = date.getFullYear() + '-';
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        D = date.getDate() + ' ';
        h = date.getHours() + ':';
        m = date.getMinutes() + ':';
        s = date.getSeconds();
        return Y+M+D+h+m+s;
    }
	
	export default {
		data() {
			return {
				allLoaded: false,
				bottomStatus: '',
				wrapperHeight: 0
			}
		},
		computed: {
			...mapGetters(['discountSubShow', 'discountsublist']),
		},
		methods: {
			timestampToTime,	//时间戳转换日期格式函数
			hide_discountsub() {
				this.$store.dispatch('hide_discountsub')
			},
			handleBottomChange(status) {
				this.bottomStatus = status;
			},			
			loadBottom() {
				this.$store.dispatch('get_discountsub_more',this)
			},
		},
		created() {
	
		},
		mounted() {
		  this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
		},
		watch:{
			discountSubShow(val){
				if(val == true){
					this.allLoaded = false;
				}
			}
		}
	}
</script>

<style lang='less'>
	.discountsub{
		.page-loadmore-listitem{
			& span {
				float:right;
			} 
		}
	}
</style>