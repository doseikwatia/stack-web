import Vue from 'vue'
import Router from 'vue-router'
import AuthSubRoutes from '@/components/auth'
import Auth from '@/components/auth/Auth'
import Home from '@/components/Home'
import TaskList from '@/components/stack/TaskList'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/auth',
      name: 'Auth',
      component: Auth,
      children: AuthSubRoutes,
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      children:[
        {
          name:'TaskList',
          path:':projectID',
          component:TaskList
        }
      ]
    }
  ]
})
