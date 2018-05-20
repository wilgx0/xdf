<template>
	<transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
		<div class='content' v-show='placeInfoShow'>	
			<mt-header title="渠道用户资料审核" fixed >
				<mt-button icon="back" slot='left' @click='hide_placeinfo'>返回</mt-button>
			</mt-header>
			<div class='main'>
				<p>
					<mt-field label="渠道名称" placeholder="请输入渠道名称" ></mt-field>
			
					<mt-field label="联系方式" placeholder="请输入联系方式" ></mt-field>				   
				</p>	
				<p style='padding-top: 15px;text-align:left;margin-bottom:10px;'>
					 <mt-radio
				      class="page-part"
				      title="请选择渠道类型"
				      v-model="placetype"
				      :options="options" />
				</p>
				<p v-if='placetype == 1'>
					<mt-field label="省份证号" placeholder="省份证号" ></mt-field>		
					<mt-field label="银行开户账号" placeholder="银行开户账号" ></mt-field>	
					<mt-field label="开户行信息" placeholder="开户行信息" ></mt-field>
				</p>
				<p v-else-if='placetype == 2'>
					<mt-field label="营业执照" placeholder="营业执照" ></mt-field>		
					<mt-field label="法人姓名" placeholder="法人姓名" ></mt-field>	
					<mt-field label="联系地址" placeholder="联系地址" ></mt-field>
					<mt-field label="电话" placeholder="电话" ></mt-field>	
				</p>
			
				<p class='btn'>
					<mt-button type="primary" size="large" >提    交</mt-button>
				</p>
			</div>
		</div>
	</transition>
</template>

<script>
	import 'animate.css/animate.css'
	import {mapGetters} from 'vuex'
	
	//渠道信息
	export default{
		created(){
			this.options = [
		      {
		        label: '公司',
		        value: '1'
		      },
		      {
		        label: '个人',
		        value: '2'
		      }
		    ];
		},
		data(){
			return {
				 placetype: '',   //渠道类型
			}
		},
		computed:{
			...mapGetters(['placeInfoShow'])
		},
		methods:{
			hide_placeinfo(){
				this.$store.dispatch('hide_placeinfo')
			}
		}
	}
</script>

<style>
</style>