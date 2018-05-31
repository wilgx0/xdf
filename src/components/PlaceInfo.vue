<template>
	<transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
		<div class='content placeinfo' v-show='placeInfoShow'>	
			<mt-header title="渠道用户资料审核" fixed >
				<mt-button icon="back" slot='left' @click='hide_placeinfo'>返回</mt-button>
			</mt-header>
			<div class='main'>
				<p>
					<mt-field label="渠道名称" placeholder="请输入渠道名称" v-model='placename'  v-validate="'required|max:20'" name='渠道名称'></mt-field>	
					<mt-field label="联系电话" placeholder="请输入联系方式" v-model='placetel'  v-validate="'required|phone'" name='联系电话'></mt-field>				   
				</p>	
				<p style='padding-top: 15px;text-align:left;margin-bottom:10px;'>
					 <mt-radio
				      class="page-part"
				      title="请选择渠道类型"
				      v-model="placetype"
				      v-validate="'required'"
				      name = '渠道类型'
				      :options="options" />
				</p>
				<p v-if='placetype == 1'>
					<mt-field label="身份证号" placeholder="身份证号" v-model= 'idnum' v-validate="'required|idCard'" name='身份证号' ></mt-field>
					<mt-field label="银行开户账号" placeholder="银行开户账号" v-model='iban' v-validate="'required|max:20'" name='银行开户账号' ></mt-field>	
					<mt-field label="开户行信息" placeholder="开户行信息" v-model='bank' v-validate="'required|max:20'" name='开户行信息' ></mt-field>
				</p>
				<p v-else-if='placetype == 2'>
					<mt-field label="营业执照" placeholder="营业执照" v-model='charter' v-validate="'required|max:20'" name='营业执照' ></mt-field>		
					<mt-field label="法人姓名" placeholder="法人姓名" v-model='legal' v-validate="'required|max:20'" name='法人姓名' ></mt-field>	
					<mt-field label="联系地址" placeholder="联系地址" v-model='address' v-validate="'required|max:20'" name='联系地址'></mt-field>
				</p>
			
				<p class='btn'>
					<mt-button type="primary" size="large" @click='user_audit'>提    交</mt-button>
				</p>
				
				<span v-show="errors.any()" v-cloak :class='["error",errorStyle]'> 
	  				<p v-for="(v,i) in errors.all()">{{v}}</p>
	  			</span>
			</div>
		</div>
	</transition>
</template>

<script>
	import 'animate.css/animate.css'
	import {mapGetters} from 'vuex'
	import { Toast, MessageBox ,Indicator} from 'mint-ui'
	
	//渠道信息
	export default{
		created(){
			this.options = [
		      {
		        label: '个人',
		        value: '1'
		      },
		      {
		        label: '公司',
		        value: '2'
		      }
		    ];
		},
		data(){
			return {
				errorStyle:'',	
			}
		},
		methods:{
			hide_placeinfo(){
				this.$store.dispatch('hide_placeinfo')
			},
			user_audit(){				//用户审核
				var _this = this;	
				_this.$validator.validateAll().then((result) => {
					if(result){	
						this.$store.dispatch('user_audit',function(ret){
							Toast(ret.msg);	
							_this.$store.dispatch('hide_placeinfo')
						})			
					}
				})
				
			}
		},
		computed:{
			...mapGetters(['placeInfoShow']),
			placename:{				//渠道名称
				set(value){
					this.$store.state.PlaceInfo.placename = value
				},
				get(){
					return this.$store.state.PlaceInfo.placename
				}
			},
			placetel:{				//联系电话
				set(value){
					this.$store.state.PlaceInfo.placetel = value
				},
				get(){
					return this.$store.state.PlaceInfo.placetel
				}
			},
			placetype:{					//渠道类型
				set(value){
					this.$store.state.PlaceInfo.placetype = value
				},
				get(){
					return this.$store.state.PlaceInfo.placetype
				}
			},
			idnum:{								//省份证号
				set(value){
					this.$store.state.PlaceInfo.idnum = value
				},
				get(){
					return this.$store.state.PlaceInfo.idnum
				}
			},
			iban:{								//银行开户账号
				set(value){
					this.$store.state.PlaceInfo.iban = value
				},
				get(){
					return this.$store.state.PlaceInfo.iban
				}
			},
			bank:{								//开户行信息
				set(value){
					this.$store.state.PlaceInfo.bank = value
				},
				get(){
					return this.$store.state.PlaceInfo.bank
				}
			},
			charter:{							//营业执照
				set(value){
					this.$store.state.PlaceInfo.charter = value
				},
				get(){
					return this.$store.state.PlaceInfo.charter
				}
			},
			legal:{								//法人姓名
				set(value){
					this.$store.state.PlaceInfo.legal = value
				},
				get(){
					return this.$store.state.PlaceInfo.legal
				}
			},
			address:{								//联系地址
				set(value){
					this.$store.state.PlaceInfo.address = value
				},
				get(){
					return this.$store.state.PlaceInfo.address
				}
			},
		},
		
	}
</script>

<style lang='less'>
	
	.placeinfo{
		.error {
			color: red;
		}	
		.error > p {
			margin-top: 10px;
			text-align: center;
		}
		.hide{
			display:none;
		}
	}
</style>