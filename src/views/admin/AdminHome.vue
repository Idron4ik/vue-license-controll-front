<template>
  <div>
      <HomePage :categories="categories" indexPage="admin" />
  </div>

</template>
<script>
import axios from "axios";
import { mapState } from "vuex";
import HomePage from '@/components/sub-modules/HomePage';
export default {
  name: "AdminHome",

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