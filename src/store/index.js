import Vue from 'vue'
import Vuex from 'vuex'
// import { fetch, http } from '@/assets/js/http'
Vue.use(Vuex)

const state = {
  area: null
}

const actions = {
  getArea ({commit, state}) {
    let currentarea = 'beijing'
    commit('setArea', currentarea)
  }
}

const mutations = {
  setArea (state, area) {
    state.area = area
  }
}

const getters = {
  area (state) {
    return state.area
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
