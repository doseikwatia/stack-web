<template>
  <div>
    <router-view/>
      <v-card height="200px">
    <v-bottom-nav
      :value="true"
      :active.sync="e2"
      :color="color"
      absolute
      shift
    >
      <v-btn dark href="/#/auth/register">
          <span>Register</span>
          <v-icon>add</v-icon>
      </v-btn>
      <v-btn dark href="/#/auth/login">
          <span>Login</span>
          <v-icon>perm_identity</v-icon>
      </v-btn>
      <v-btn dark href="/#/auth/forgot">
          <span>Recover</span>
          <v-icon>undo</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-card>
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
  }
}
</script>
