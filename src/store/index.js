import Vue from 'vue'
import Vuex from 'vuex'
import $ from 'jquery'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authtoken: '',
    userid: '',
    projects: []
  },
  mutations: {
    updateToken(state, payload) {
      state.authtoken = payload.token
    },
    updateProjects(state, payload) {
      state.projects = payload.projects
    }
  },
  getters: {
    authToken(state) {
      return state.authToken
    }
  },
  actions: {
    login(context, payload) {
      $.post('/api/v1/auth/login', payload, (response) => {
        context.commit('updateToken', JSON.parse(response))
      })
    },
    forgot(context, payload) {
      if (context.authToken === '') {
        return
      }
      $.post('/api/v1/auth/forgot', payload, (response) => {
        context.commit('updateToken', JSON.parse(response))
      })
    },
    register(context, payload) {
      $.post('/api/v1/auth/register', payload, (response) => {
        context.commit('updateToken', JSON.parse(response))
      })
    },
    loadProjects(context) {
      $.get('/api/v1/projects/', {
        userid: this.userid
      }, (response) => {
        context.commit('updateProjects', JSON.parse(response))
      })
    }
  }
})
