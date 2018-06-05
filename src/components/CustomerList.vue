<template>
    <transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
        <div class='content customerlist' v-show='cuslistShow'>
            <mt-header title="客户信息" fixed v-show="!searchShow">
                <mt-button icon="back" slot='left' @click='hide_cuslist'>返回</mt-button>
                <mt-button slot='right' @click="show_search">搜索</mt-button>
            </mt-header>
            <!--搜索 s-->
            <div class="mySearch" v-show="searchShow">
                <div>
                    <input type="text" placeholder="请输入要搜索的客户名称或电话" v-model="searchKey">
                </div>
                <div class="search-cancel">
                    <img src="../../static/img/search.png" alt="" @click="search">
                    <span @click="hide_search">取消</span>
                </div>
            </div>
            <!--搜索 e-->
            <!--list-->
            <div class="page-loadmore">
                <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
                    <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange"
                                 :bottom-all-loaded="allLoaded" ref="loadmore">
                        <ul class="page-loadmore-list">
                            <li v-for="item in cusList" class="page-loadmore-listitem" @click='show_cusinfo(item.id)'>
                                <div>
                                    <span>{{ item.name }}</span>
                                    <span><em>{{timestampToTime(item.createtime)}}</em></span>
                                </div>
                                <div>
                                    <span><em>客户状态：</em>{{ cusstateToStr(item.cusstate) }}</span>
                                    <span><em>跟进情况：</em>{{ signstateToStr(item.signstate) }}</span>
                                </div>
                            </li>
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
    import {Toast, MessageBox, Indicator} from 'mint-ui'
    import {timestampToTime} from '../common.js'

    export default {
        data() {
            return {
                searchKey: '',      //要搜索的值
                searchShow: false, // 搜索框的显示
                allLoaded: false,        //数据是否加载完毕
                bottomStatus: '',       //数据加载状态标记
                wrapperHeight: 0,
            }
        },
        computed: {
            ...mapGetters(['cuslistShow', "cusList"]),
        },
        watch: {
            cuslistShow(val) {
                if (val == true) {		//显示页面时重新加载数据
                    Indicator.open('加载中...');
                    this.allLoaded = false;
                    this.$store.dispatch('get_cuslist', this);
                }
            }
        },
        methods: {
            show_search() {
                this.searchShow = true;
            },
            hide_search() {
                Indicator.open('加载中...');
                this.searchKey = '';
                this.searchShow = false;
                this.allLoaded = false;
                this.search();  //需要重新渲染
            },
            search() {                              //搜索
                Indicator.open('加载中...');
                this.allLoaded = false;
                this.$store.dispatch('get_cuslist',this);
            },
            loadingAnimation() {            //隐藏加载动画
                Indicator.close();
            },
            timestampToTime,
            cusstateToStr(val) {
                const state = {
                    0: '暂无',
                    1: '有效',
                    2: '无效',
                    3: '其他',
                }
                return state[val];
            },
            signstateToStr(val) {
                const state = {
                    0: '暂无',
                    1: '已签',
                    2: '未签',
                    3: '洽谈',
                }
                return state[val];
            },
            handleBottomChange(status) {
                this.bottomStatus = status;
            },
            loadBottom() {              //上拉滑动时触发数据加载
                this.$store.dispatch('loadMore',this);
            },
            hide_cuslist() {
                this.$store.dispatch('hide_cuslist')
            },
            show_cusinfo(id) {
                this.$store.dispatch('show_cusinfo', id)
            }
        },
        mounted() {
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
        },
    }
</script>

<style lang='less'>
    .customerlist {
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
        .page-loadmore-list {
            & > li {
                div {
                    height: 100%;
                    width: 48%;
                    display: inline-block;

                    span {
                        height: 48%;
                        width: 90%;
                        display: block;
                        line-height: 26px;
                        font-size: 14px;
                        text-align: right;
                        em {
                            font-style: normal;
                            color: #888;
                        }
                    }
                }
                div:first-child {
                    span {
                        text-align: left;
                        padding-left: 5px;
                    }
                }
            }
        }
    }

</style>