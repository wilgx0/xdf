<template>
	<transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
		<div class='content discount' v-show='discountShow'>
			<mt-header title="我的返佣" fixed v-show="!searchShow">
				<mt-button icon="back" slot='left' @click='hide_discount'>返回</mt-button>
				<mt-button slot='right' @click="show_search">搜索</mt-button>
			</mt-header>
			<!--搜索 s-->
			<div class="mySearch" v-show="searchShow">
				<div>
					<input type="text" placeholder="请输入要搜索的名称或电话" v-model="searchKey">
				</div>
				<div class="search-cancel">
					<img src="../../static/img/search.png" alt=""  @click="search">
					<span @click="hide_search">取消</span>
				</div>
			</div>
			<!--搜索 e-->
			<div class="page-loadmore">
				<div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
					<mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
						<ul class="page-loadmore-list">
							<li v-for="item in discountlist" class="page-loadmore-listitem" @click='show_discountsub(item.customerid)'>
								<div class="brokerage-info">
									<span class="brokerage-right" style="width:63%;">
										已返<em style="color:#5FB878;">{{(item.amount||0)|round }}</em>
										未返<em style="color:red;">{{((item.brokerage*item.discountpercent)-item.amount||0)|round }}</em>
										应返<em style="color:#888;">{{ ((item.brokerage*item.discountpercent)||0)|round }}</em>
										<img src="../../static/img/right.png" alt="" />
									</span>

									<span style="width:23%;font-size:14px;">
									{{item.name|substring(5)}}
									</span>

                                    <span tyle="width:12%;">{{item.count||0}}/{{item.discountnum||0}}次</span>
								</div>
								<div style='clear: both;width:0px;height:0px'></div>
								<div class='invoice'>
									<div >
										<p><em>快递单号:</em>{{getFieldsByJsonstr(item.invoice,'expressOdd')|substring(12)}}</p>
										<p><em>快递名称:</em>{{getFieldsByJsonstr(item.invoice,'expressName')|substring(12)}}</p>
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
	import {getFieldsByJsonstr,round,substring} from '../common.js'
	import {Indicator} from 'mint-ui'

	export default {
		mounted() {
		  this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
		},
		watch:{
			discountShow(val){
				if(val == true){
					this.allLoaded = false;
				  	Indicator.open('加载中...');
	  				this.$store.dispatch('get_discountlist',this);
				}
			},
		},
        filters:{
            round: function (value) {
                return round(value);
            },
            substring:function(value,length){
                return substring(value,length);
			}

        },
		data() {
			return {
                searchKey: '',      	//要搜索的值
                searchShow: false,  	// 搜索框的显示
		        allLoaded: false,		//所有数据是否加载完毕
		        bottomStatus: '',		//单次加载是否完毕
		        wrapperHeight: 0,
			}
		},
		methods: {
            hide_search() {
                Indicator.open('加载中...');
                this.searchKey = '';
                this.searchShow = false;
                this.allLoaded = false;
                this.search();  //需要重新渲染
            },
			search(){				//查找
                this.allLoaded = false;
                Indicator.open('加载中...');
                this.$store.dispatch('get_discountlist',this);
			},
            show_search() {				//显示搜索框
                this.searchShow = true;
            },
			loadingAnimation(){			//关闭加载动画
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
		
			loadBottom() {							//上拉加载更多数据
                this.$store.dispatch('loadMoreDisCount',this);
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
		.mySearch {
			width: 100%;
			height: 40px;
			background-color: black;
			position: fixed;
			top: 0px;
			opacity: 0.7;
			display: flex;
			justify-content: center;
			align-items: center;
            z-index: 666;
			div {
				&:first-child {
					flex: 7;
					text-align: right;
					input {
						width: 80%;
						height: 32px;
					}
				}
				&.search-cancel {
					flex: 3;
					text-align: left;
					text-indent: 10px;
					span {
						color: #fff;
						position: relative;
						top: -9px;
						left: 9px;
					}
				}
			}
		}
		.page-loadmore-listitem{
			height: 85px;
		    text-align: left;
		    padding: 0 20px;
            .brokerage-info{
                & > span{
                    display:inline-block;
					font-size:10px;
                    &.brokerage-right{
                        text-align:right;

                    }
                }
            }
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