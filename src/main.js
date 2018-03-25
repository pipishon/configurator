// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.


import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import VueHead from 'vue-head'
import store from './store'

Vue.use(Vuex)
Vue.use(VueHead)



/* eslint-disable no-new */

var vm = new Vue({
  store,
  el: '#app',
  template: '<App/>',
  components: { App }
})
export default vm
