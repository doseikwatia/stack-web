<template>
  <v-layout row justify-center   align-center>
    <v-flex xs3>
      <v-form v-model="valid">
        <v-text-field v-model="email"
          :rules="emailRules"
          label="Email"
          hint="A valid email address"
          required
          prepend-icon="account_box" ></v-text-field>
        <v-btn @click="submit">reset credentials</v-btn>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "Forgot",
  data() {
    return {
      email: "",
      valid: false,
      emailRules: [
        v => {
          return !!v || "E-mail is required";
        },
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "E-mail must be valid"
      ],
    };
  },
  methods: {
    submit() {
      this.$store.dispatch('forgot',{username:this.email})
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
