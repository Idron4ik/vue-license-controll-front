<template>
  <div :class="['dashboard', {'vue-loading': loading}]">
      <UserCards :loadedproducts="!loading"/>
      <AnimationAjax/>
  </div>
    
</template>

<script>
import UserCards from '@/components/profile/card/UserCards';
import AnimationAjax from "@/components/sub-components/AnimationAjax";


import axios from "axios";
import { mapActions } from "vuex";
  export default {
    name: 'profileIndex',
    
    components: {
      UserCards,
      AnimationAjax
    },

    data(){
      return {
        loading: true
      }
    },

    mounted(){
      this.loading = true;
      
      axios
        .get(`/products`)
        .then((response) => {
          this.$store.dispatch('products/setProducts', response.data);
          this.loading = false;

          // this.$store.dispatch('profile/setProfileData', response.data);
        })
        .catch(function(error) {
          console.log(error);
        });

      // UserDATA

      // axios
      //   .get(`/auth/me`)
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