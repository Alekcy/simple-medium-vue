import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userIsAuth: false,
    user: null,
  },
  mutations: {
    setUserIsAuth(state, isAuth) {
      state.userIsAuth = isAuth
    },
    setUser(state, user) {
      state.user = user
    },
  },
  actions: {
    login ({ commit }, payload) {
      commit('setUserIsAuth', true)
      commit('setUser', payload)
    },
    logout ({ commit }) {
      commit('setUserIsAuth', false)
      commit('setUser', null)
    },
  },
  modules: {
  }
})
