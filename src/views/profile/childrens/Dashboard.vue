<template>
<div>
   <UserCards/>
</div>
  <!-- <v-flex xs10 class="center"> -->
 
  <!-- </v-flex> -->
    
</template>

<script>
import UserCards from '@/components/profile/card/UserCards';

import axios from "axios";
import { mapActions } from "vuex";
  export default {
    name: 'profileIndex',
    
    components: {UserCards},

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
          console.log(1);
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