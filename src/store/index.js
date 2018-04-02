import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as mutations from './mutations'

Vue.use(Vuex)


var state = {
  rules: {
  },
  activeRule: {
    selector: '',
    styles: {
      'background-color': '',
      'color': '',
    },
    defaultStyles: {
      'background-color': 'white',
      'color': 'white',
    }
  },
  css: '.test-content { background-color: red; }'
}

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  getters,
  mutations,
  strict: debug
})
