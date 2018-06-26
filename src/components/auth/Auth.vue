<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
import Login from './Login.vue'
import Register from './Register.vue'
import Forgot from './Forgot.vue'

const Routes = [{
    path: 'login',
    component: Login
  },
  {
    path: 'register',
    component: Register
  },
  {
    path: 'forgot',
    component: Forgot
  }
]


export default{
  routes(){
    return Routes;
  },
  data(){
    return{}
  },
  computed:{
    currentPath(){
      console.log(this.$router.path)
      return this.$router.path
    }
  }
}
</script>
