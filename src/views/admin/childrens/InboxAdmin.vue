<template>
  <InboxPage :items="items" url="admin/products" :loading='loadedMes'/>
</template>

<script>
import axios from "axios";
import InboxPage from '@/components/sub-modules/inbox/InboxPage';
export default {
    name: "inboxUser",

    components: {
      InboxPage
    },

    data () {
      return {
        items: [],
        loadedMes: false,
      }
    },

    mounted(){
      this.loadedMes = true;
      axios
        .get("/admin/products?status=PAYED")
        .then(response => {
            this.loadedMes = false;
            this.items = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
</script>