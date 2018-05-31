// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import '../static/css/reset.css'
//import router from './router'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import axios from 'axios'
import qs from 'qs'
import store from './store/index.js'
import './validate.js'

//Vue.config.productionTip = false
Vue.use(Mint);
Vue.prototype.$http = axios;
Vue.prototype.$qs = qs;
Vue.prototype.$url = 'http://www.xdf.my';
//Vue.prototype.$url = 'http://xdftest.ynyccm.com';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  //router,
  store,
  components: { App },
  template: '<App/>'
})

