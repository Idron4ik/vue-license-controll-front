<template>
  <v-layout row>
    <v-flex xs12 lg6 offset-lg3>
      <InboxPage :items="items" url="products"  :loading='loadedMes'/>
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
        items: [],
        loadedMes: false,
      }
    },

    mounted(){
      this.loadedMes = true;

      axios
        .get("/products?status=PAYED")
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

<style lang="scss" scoped>

</style>