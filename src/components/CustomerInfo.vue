<template>
	<transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
		<div class='content cusinfo'  v-show='cusinfoShow'>
			<mt-header fixed title="新东方">
				<mt-button icon="back" slot='left' @click='hide_cusinfo'>返回</mt-button>
			</mt-header>
			<div class='main'>	
				<p>
					<mt-field label="客户名称" placeholder="请输入客户名称" v-model='cusName'  v-validate="'required|max:20'" name='客户名称' :readonly="id?true:false"></mt-field>
			
					<mt-field label="客户电话" placeholder="请输入客户电话" v-model='cusTel'  v-validate="'required|phone'" name='客户电话' :readonly="id?true:false"></mt-field>
			
					<mt-field label="微信号" placeholder="请输入微信号" v-model='cusWx'  v-validate="'max:20'" name='微信号' :readonly="id?true:false"></mt-field>
			
					<mt-field label="意向国家" placeholder="请输入意向国家" v-model='cusCountry'  v-validate="'max:20'" name='意向国家' :readonly="id?true:false"></mt-field>
					
					<mt-field label="年级意向" placeholder="请输入年级意向" v-model='cusClass'  v-validate="'max:20'" name='年级意向' :readonly="id?true:false"></mt-field>
					
					<mt-field label="跟进情况" placeholder="跟进情况" type="textarea" rows="4" v-model='cusRemark'  v-validate="'max:50'" name='跟进情况' ></mt-field>
				</p>

                <!--<p >-->
                    <!--<mt-radio-->
                        <!--class="page-part my-signstate"-->
                        <!--title="跟进情况"-->
                        <!--v-model="signstate"-->
                        <!--:options="signstateOptions"-->
                        <!--@change="set_signstate($event)"-->
                    <!--/>-->
                <!--</p>-->

				<p class='btn'>
                    <mt-button type="primary" size="large" @click='save_cusinfo'>提    交</mt-button>
				</p>
				
				<span v-show="errors.any()" v-cloak :class='["error",errorStyle]'> 
					<p v-for="(v,i) in errors.all()">{{v}}</p>
				</span>
			</div>
		</div>
   </transition>
</template>

<script>
	import {mapGetters} from 'vuex'
	import { Toast, MessageBox ,Indicator} from 'mint-ui'
	//客户信息
	export default{
	    created(){
            // this.signstateOptions = [
            //     {
            //         label: '已签',
            //         value: '1'
            //     },
            //     {
            //         label: '未签',
            //         value: '2'
            //     },
            //     {
            //         label: '洽谈',
            //         value: '3'
            //     },
            // ];
        },
		data(){
			return {
				errorStyle:'',
			}
		},
		computed:{
			...mapGetters(['cusinfoShow']),
            id:{
                set(value){
                    this.$store.state.customerInfo.id = value
                },
                get(){
                    return this.$store.state.customerInfo.id
                }
            },
			cusName:{
				set(value){
					this.$store.state.customerInfo.cusName = value
				},
				get(){
					return this.$store.state.customerInfo.cusName
				}
			},
			cusTel:{
				set(value){
					this.$store.state.customerInfo.cusTel = value
				},
				get(){
					return this.$store.state.customerInfo.cusTel
				}
			},
			cusWx:{
				set(value){
					this.$store.state.customerInfo.cusWx = value
				},
				get(){
					return this.$store.state.customerInfo.cusWx
				}
			},
			cusCountry:{
				set(value){
					this.$store.state.customerInfo.cusCountry = value
				},
				get(){
					return this.$store.state.customerInfo.cusCountry
				}
			},
			cusClass:{
				set(value){
					this.$store.state.customerInfo.cusClass = value
				},
				get(){
					return this.$store.state.customerInfo.cusClass
				}
			},
			cusRemark:{
				set(value){
					this.$store.state.customerInfo.cusRemark = value
				},
				get(){
					return this.$store.state.customerInfo.cusRemark
				}
			},
			cusstate:{
				set(value){
					this.$store.state.customerInfo.cusstate = value
				},
				get(){
					return this.$store.state.customerInfo.cusstate
				}
			},
            signstate:{
                set(value){
                    this.$store.state.customerInfo.signstate = value
                },
                get(){
                    return this.$store.state.customerInfo.signstate
                }
            }
		},
		watch:{
			cusinfoShow:function(val){
				var _this = this;
				_this.errorStyle='hide';
				setTimeout(function(){
					_this.errors.clear();
					_this.errorStyle='';
				},300)
			}

		},
		methods:{
            // set_signstate($event){
            //     if(this.id){
            //         this.$store.dispatch('set_signstate',$event)
            //     }
            //
            // },
			hide_cusinfo(){
				this.$store.dispatch('hide_cusinfo')
			},
			save_cusinfo(){							//修改数据
				var _this = this;
				_this.$validator.validateAll().then((result) => {
					if(result){
						this.$store.dispatch('save_cusinfo',function(ret){		
							Toast(ret.msg);	
							_this.$store.dispatch('hide_cusinfo')
//							_this.errorStyle='hide';
//							setTimeout(function(){
//								_this.errors.clear();
//								_this.errorStyle='';
//							},300)	
						})
					}
				})
				
			}
		}
	}
</script>

<style lang='less'>
	.cusinfo{
		z-index:1000 !important;
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
        .my-signstate{
            text-align:left;
        }
	}
</style>