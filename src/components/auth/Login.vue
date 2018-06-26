<template>
  <v-layout row justify-center   align-center>
    <v-flex xs3>
      <v-form v-model="valid">
        <v-text-field v-model="email"
          :rules="emailRules"
          label="Username"
          hint="A valid email address"
          required
          prepend-icon="account_box" ></v-text-field>
        <v-text-field
          v-model="password"
          prepend-icon="lock"
          :append-icon="e1 ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (e1 = !e1)"
          :type="e1 ? 'password' : 'text'"
          name="input-10-1"
          label="Password"
          hint="At least 8 characters"
          min="8"
          required
        ></v-text-field>
        <v-btn @click="clear">reset</v-btn>
        <v-btn @click="submit">login</v-btn>
        <v-btn :to="{name:'RegisterUser'}">Register</v-btn>
        <v-btn :to="{name:'ForgotPassword'}">Forgot Password</v-btn>
        <v-btn @click="loginWithGoogle">google in</v-btn>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      e1: true,
      valid: false,
      emailRules: [
        v => {
          return !!v || "E-mail is required";
        },
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
      ],
    };
  },
  methods: {
    submit() {
      this.$store.dispatch('loginWithUsernameAndPassword',{username:this.email,password:this.password})
    },
    clear() {
      this.email='';
      this.password='';
    },
    loginWithGoogle(){
      this.$store.dispatch('loginWithGoogle')
    }
  },
  computed:{
    ...mapGetters({
      loggedIn:'isloggedIn'
    }),
  },
  watch:{
    loggedIn:function(newStatus, oldStatus){
      if (newStatus){
        this.$router.push({name:'Home'})
      }
    }
  },
  beforeRouteEnter(to,from,next){
    next(cmpt=>{
    if (to.name == "Logout"){
      cmpt.$store.dispatch('signout')
    }
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
