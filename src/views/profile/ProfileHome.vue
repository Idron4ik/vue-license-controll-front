<template>
      <HomePage :categories="categories" indexPage="home" />
</template>
<script>
import axios from "axios";
import { mapState, mapGetters, mapActions } from "vuex";
import HomePage from '@/components/sub-modules/HomePage';
export default {
  name: "ProfileHome",

  components: {
    HomePage
  },

  data(){
    return {
      categories: [
        {
          icon: "dashboard",
          title: "Dashboard",
          link: "dashboard",
        },
        // {
        //   icon: "shopping_cart",
        //   title: "Cart",
        //   link: "cart"
        // },
        {
          icon: "mail",
          title: "Inbox",
          link: "inbox",
        },
        {
          icon: "settings",
          title: "Settings",
          link: "settings",
        },
        
        {
          icon: "power_settings_new",
          title: "Log out",
          link: "logout"
        }
      ]
    }
  },
};
</script>