<template>
	<transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
		<div class='content' v-show='cuslistShow'>
			<mt-header title="客户信息" fixed >
				<mt-button icon="back" slot='left' @click='hide_cuslist'>返回</mt-button>
			</mt-header>
			<!--list-->
			  <div class="page-loadmore">

			    <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
			      <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
			        <ul class="page-loadmore-list">
			          <li v-for="item in cusList" class="page-loadmore-listitem" @click='show_cusinfo(item.id)'>{{ item.name }}</li>
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
			<!--list-->
		</div>
	</transition>
</template>

<script>
	import 'animate.css/animate.css'
	import {mapGetters} from 'vuex'
	import { Toast, MessageBox ,Indicator} from 'mint-ui'
	
	export default{
		created(){
				
		},
		data(){
			return {
		        allLoaded: false,
		        bottomStatus: '',
		        wrapperHeight: 0,
		        first:false,			//是否第一次加载
			}
		},
		computed:{
			...mapGetters(['cuslistShow',"cusList"]),
		},
		watch:{
			cuslistShow(val){
				if(val == true){		//显示页面时重新加载数据
					Indicator.open('加载中...');
					this.loadingAnimation = function(){
						Indicator.close();
					}
					this.allLoaded = false;
					this.first = true;
					this.$store.dispatch('get_cuslist',this);
				}
			}
		},
		methods:{
			  handleBottomChange(status) {
		        this.bottomStatus = status;
		      },
		
		      loadBottom() {
				this.first = false;
				this.$store.dispatch('get_cuslist',this);		
		      },
		      hide_cuslist(){
		      	this.$store.dispatch('hide_cuslist')
		      },
		      show_cusinfo(id){
      			
		      	this.$store.dispatch('show_cusinfo',id)
		      }
		},
		
	    mounted() {
	      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
	    },
	}
</script>

<style>


</style>