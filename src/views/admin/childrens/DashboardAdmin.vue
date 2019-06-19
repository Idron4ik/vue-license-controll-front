<template>
  <div :class="['dashboard', {'vue-loading': loading}]">
      <AdminCards/>
      <AnimationAjax/>
  </div>
</template>

<script>
import AdminCards from '@/components/admin/card/AdminCards';

import axios from "axios";
import { mapActions } from "vuex";
import AnimationAjax from "@/components/sub-components/AnimationAjax";

  export default {
    name: 'dashboardAdmin',
    
    components: {AdminCards, AnimationAjax},

    data(){
      return {
        loading: true
      }
    },

  mounted() {
    this.loading = true;
    axios
      .get(`/admin/products`)
      .then(response => {
        this.$store.dispatch("productsAdmin/setProducts", response.data);
        this.loading = false;
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  }
</script>

<style lang="scss" scoped>
.center {
  padding: 25px;
  margin: 0 auto;
}
</style>