<template>
  <v-app class="backimage">
    <Navbar/>
    <router-view></router-view>
    
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  name: 'App',

  components: {
    Navbar,
    
  },

  data: () => ({
    //
  }),
};
</script>
<style scoped>


</style>