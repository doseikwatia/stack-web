<template>
  <v-layout row justify-center   align-center>
    <v-flex xs3>
      <v-form>
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
          :rules="passwordRules"
          name="input-10-1"
          label="Password"
          hint="At least 8 characters"
          min="8"
          required
        ></v-text-field>
        <v-text-field
          v-model="confirmpassword"
          prepend-icon="lock"
          :append-icon="e2 ? 'visibility' : 'visibility_off'"
          :append-icon-cb="() => (e2 = !e2)"
          :type="e2 ? 'password' : 'text'"
          :rules="confirmpasswordRules"
          name="input-10-1"
          label="Confirm password"
          hint="At least 8 characters"
          min="8"
          required
        ></v-text-field>
        <v-btn @click="clear">reset</v-btn>
        <v-btn @click="submit">register</v-btn>
        <v-btn :to="{name:'Login'}">back</v-btn>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
      confirmpassword:"",
      e1: true,
      e2: true,
      valid: false,
      emailRules: [
        v => {
          return !!v || "E-mail is required";
        },
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
      ],
      passwordRules:[
        v=>/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(v) || "Password must be strong enough"
      ],
      confirmpasswordRules:[
        v=>this.password==v || "Must match password",
      ],
    };
  },
  methods: {
    submit() {
      this.$store.dispatch('register',{username:this.email,password:this.password})
      this.$router.push({name:'Login'})
    },
    clear() {
      this.email='';
      this.password='';
      this.confirmpassword='';
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
