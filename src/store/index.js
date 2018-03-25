import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as mutations from './mutations'

Vue.use(Vuex)

var state = {
  groups: [{
    name: 'group1',
    lines: [
      { name: 'line1'},
      { name: 'line2'},
    ],
    groups: []
  }],
  isPopupVisible: false,
  lineToEdite: {}
}

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  getters,
  mutations,
  strict: debug
})
