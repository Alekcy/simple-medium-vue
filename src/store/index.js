import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userIsAuth: false,
    userRole: null,
    userName: null,
  },
  mutations: {
    setUserIsAuth(state, isAuth) {
      state.userIsAuth = isAuth
    },
    setUserRole(state, role) {
      state.userRole = role
    },
    setUserName(state, userName) {
      state.userName = userName
    }
  },
  actions: {
    login ({ commit }, payload) {
      commit('setUserIsAuth', true)
      commit('setUserRole', payload.role)
      commit('setUserName', payload.userName)
    },
    logout ({ commit }) {
      commit('setUserIsAuth', false)
      commit('setUserRole', null)
      commit('setUserName', null)
    },
  },
  modules: {
  }
})
