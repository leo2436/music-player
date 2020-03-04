import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


const state = {
  src: '',
}

const getters = {
  src: function (state) {
    return state.src
  },
}

const mutations = {
  pushSrc(state, src) {
    state.src = src
  },
}

export default new Vuex.Store({
  state,
  getters,
  mutations
})