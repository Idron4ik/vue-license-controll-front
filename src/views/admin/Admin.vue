<template>
  <div>
      <AdminTable/>
  </div>

</template>
<script>
import axios from "axios";
import { mapState } from "vuex";
import AdminTable from '@/components/admin/table/AdminTable'
export default {
  name: "profileIndexAdmin",

  components: {
    AdminTable
  }
};
</script>