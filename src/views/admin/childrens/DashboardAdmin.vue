<template>
<div>
    <AdminTable/>
</div>
</template>

<script>
import AdminTable from '@/components/admin/table/AdminTable';


import axios from "axios";
import { mapActions } from "vuex";
  export default {
    name: 'profileIndex',
    
    components: {AdminTable},

  }
</script>

<style lang="scss" scoped>
.center {
  padding: 25px;
  margin: 0 auto;
}
</style>