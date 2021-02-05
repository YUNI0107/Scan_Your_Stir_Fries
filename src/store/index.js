import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lang: 'en',
  },
  mutations: {
    langChange(state,playload){
      state.lang = playload;
    }
  },
  actions: {
  },
  modules: {
  }
})
