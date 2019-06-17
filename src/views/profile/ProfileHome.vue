<template>
  <div>
      <HomePage :categories="categories" indexPage="home" />
  </div>

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
          link: "dashboard"
        },
        {
          icon: "shopping_cart",
          title: "Cart",
          link: "cart"
        },
        {
          icon: "mail",
          title: "Inbox",
          link: "inbox"
        },
        {
          icon: "settings",
          title: "Settings",
          link: "settings"
        },
        
        {
          icon: "power_settings_new",
          title: "Log out",
          link: "logout"
        }
      ]
    }
  },

  mounted(){
    axios
      .get("/auth/me")
      .then(response => {
        this.$store.dispatch("profile/setProfileData", {user: response.data});
      })
      .catch(error => {
        // this.$emit('errors', error.response.data);
      });
  }
};
</script>