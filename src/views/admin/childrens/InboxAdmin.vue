<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <InboxPage :items="items" url="admin/products"/>
    </v-flex>
  </v-layout>
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
        items: []
      }
    },

    mounted(){
      axios
        .get("/admin/products?status=PAYED")
        .then(response => {
          this.items = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
</script>