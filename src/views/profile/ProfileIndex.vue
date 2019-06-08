<template>
  <v-flex xs10 class="center">
    <Table/>
  </v-flex>
    
</template>

<script>
import Table from '@/components/Table';
import axios from "axios";
import { mapActions } from "vuex";
  export default {
    name: 'profileIndex',
    
    components: {Table},

    mounted(){
      
      let token = localStorage.getItem('jwt') ;
      axios
        .get(`/products`,
        {
          headers: {
          "Authorization" : `JWT ${token}` 
        }
       })
        .then((response) => {
          this.$store.dispatch('products/setProducts', response.data);
          // this.$store.dispatch('profile/setProfileData', response.data);
        })
        .catch(function(error) {
          console.log(error);
        });

      // UserDATA

      // axios
      //   .get(`/auth/me`,
      //   {
      //     headers: {
      //     "Authorization" : `JWT ${token}` 
      //   }
      //  })
      //   .then((response) => {
      //     this.$store.dispatch('products/setProducts', response.data);
      //     // this.$store.dispatch('profile/setProfileData', response.data);
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });

    }
  }
</script>

<style lang="scss" scoped>
.center {
  padding: 25px;
  margin: 0 auto;
}
</style>