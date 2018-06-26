import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/components/auth/Auth'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/auth',
    name: 'Auth',
    component: Auth,
    children: Auth.routes()
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  }
  ]
})
