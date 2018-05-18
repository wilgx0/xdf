<template>
	<transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
		<div class='content' v-show='cuslistShow'>
			<mt-header title="客户信息">
				<mt-button icon="back" slot='left' @click='hide_cuslist'>返回</mt-button>
			</mt-header>
			<!--list-->
			<div class="page-loadmore">
				<div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
					<mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
						<ul class="page-loadmore-list newslist-item">
							<li v-for="item in cusList" class="page-loadmore-listitem"><a @click.prevent=''>111</a></li>
						</ul>
		
						<div slot="bottom" class="mint-loadmore-bottom">
							<span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
							<span v-show="bottomStatus === 'loading'" >
            					<mt-spinner type="snake" class='newslist-spinner'></mt-spinner>
     					 	</span>
						</div>
					</mt-loadmore>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import 'animate.css/animate.css'
	import {mapGetters} from 'vuex'
	
	export default{
		created(){
			this.$store.dispatch('get_cuslist',this.page);
		},
		data(){
			return {
				page:1,
				allLoaded: false,
				bottomStatus: '',
				wrapperHeight: 0
			}
		},
		computed:{
			...mapGetters(['cuslistShow',"cusList",'cusLastPage']),
		},
		methods:{
			hide_cuslist(){
				this.$store.dispatch('hide_cuslist')
			},
			loadBottom(){
				
			},
			handleBottomChange(){
				
			},
		}
	}
</script>

<style>
	
	@component-namespace page {
		@component loadmore {
			@descendent desc {
				text-align: center;
				color: #666;
				padding-bottom: 5px;
				&:last-of-type {
					border-bottom: solid 1px #eee;
				}
			}
			@descendent listitem {
				height: 50px;
				line-height: 50px;
				border-bottom: solid 1px #eee;
				text-align: center;
				&:first-child {
					border-top: solid 1px #eee;
				}
			}
			@descendent wrapper {
				overflow: scroll;
			}
			.mint-spinner {
				display: inline-block;
				vertical-align: middle;
			}
		}
	}
	
	@component mint-loadmore-bottom {
		span {
			display: inline-block;
			transition: .2s linear;
			vertical-align: middle;
			@when rotate {
				transform: rotate(180deg);
			}
		}
	}
	.page-loadmore {
		margin-top:40px;
	}

</style>