<template>
    <router-view/>
</template>

<script>
export default{
  name:'Auth',
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
