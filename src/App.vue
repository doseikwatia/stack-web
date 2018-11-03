<template>
  <v-app>
    <div id="app">
      <v-alert :value="$store.getters.errorMessage"  color="error"  icon="error"  >
        {{$store.getters.errorMessage}}
      </v-alert>
      <router-view/>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>

</style>
