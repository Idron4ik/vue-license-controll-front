<template>
  <div>
      <HomePage :categories="categories" indexPage="admin" />
  </div>

</template>
<script>
import axios from "axios";
import { mapState } from "vuex";
import HomePage from '@/components/HomePage';
export default {
  name: "profileIndexAdmin",

  components: {
    HomePage
  },

  data(){
    return {
      categories: [
        {
          icon: "dashboard",
          title: "Dashboard",
          link: "dashboardAdmin"
        },
        {
          icon: "view_agenda",
          title: "Approved Products",
          link: "approvedProductsAdmin"
        },
        {
          icon: "mail",
          title: "Inbox",
          link: "inboxAdmin"
        },
        {
          icon: "power_settings_new",
          title: "Log out",
          link: "logout"
        }
      ]
    }
  }
};
</script>