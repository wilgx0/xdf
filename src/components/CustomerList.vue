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
			          <li v-for="item in cusList" class="page-loadmore-listitem">{{ item.name }}</li>
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
	
	export default{
		created(){
			this.first = true;
			this.$store.dispatch('get_cuslist',this);
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
		      }
		},
		
	    mounted() {
	      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
	    },
	}
</script>

<style>
.snake{
	display: block;
	padding-left: 45%;
}
.page-loadmore-list{
	padding:0px;
	margin-top:40px;
}
.page-loadmore-list > li{
	list-style:none;
	height: 55px;
	line-height: 55px;
    border-top: 1px solid rgb(238, 238, 238);
	
}
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

</style>