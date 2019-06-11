<template>
<div>
  <UserTable
  >
  </UserTable>

</div>

</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import UserTable from '@/components/profile/table/UserTable'
export default {
  name: "Table",

  components: {
    UserTable
  }
};
</script>
