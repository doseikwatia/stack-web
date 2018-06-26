<template>
  <div>
    <router-view/>
  </div>
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
