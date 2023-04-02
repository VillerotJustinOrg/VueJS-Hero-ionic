import Vue from 'vue'
import Vuex from 'vuex'

import data from './data'
import auth from './auth'
import errors from './error'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    data,
    auth,
    errors
  }
})
