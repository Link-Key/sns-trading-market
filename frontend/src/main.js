// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import moment from 'vue-moment'
import Axios from 'axios'
import WalletManager from './libs/WalletManager'
import Utils from './libs/Utils'

Axios.defaults.baseURL = process.env.API_SERVER_URL;
// Axios.defaults.timeout = 2500;

Vue.config.productionTip = false
Vue.prototype.$axios = Axios
Vue.prototype.$wallet = new WalletManager(store)
Vue.prototype.$utils = Utils

Vue.use(moment)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
