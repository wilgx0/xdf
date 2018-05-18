<template>
	<transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
		<div class='index' v-show='indexShow'>
			<mt-spinner type="triple-bounce" :size="60"></mt-spinner>
		</div>
	</transition>
</template>

<script>
	import 'animate.css/animate.css'
	import {mapGetters} from 'vuex'
	
	export default{
		data(){
			return {
				
			}
		},
		computed:{
			...mapGetters(['indexShow']),
		}
	}
</script>

<style>
	.index {
		width: 100%;
		height: 100%;
		background-color: #fff;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		overflow: auto;
		padding-top:70%;
	}
</style>