<template>
<div>
    <AdminCards/>
</div>
</template>

<script>
import AdminCards from '@/components/admin/card/AdminCards';


import axios from "axios";
import { mapActions } from "vuex";
  export default {
    name: 'profileIndex',
    
    components: {AdminCards},

  mounted() {

    axios
      .get(`/admin/products`)
      .then(response => {
        //Add refresh page
        this.$store.dispatch("productsAdmin/setProducts", response.data);
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