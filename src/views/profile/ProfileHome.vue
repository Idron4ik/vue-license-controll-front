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
          title: "Панель управління",
          link: "dashboard",
        },
        {
          icon: "mail",
          title: "Підтримка",
          link: "inbox",
        },
        {
          icon: "settings",
          title: "Налаштування облікового запису",
          link: "settings",
        },
        
        {
          icon: "power_settings_new",
          title: "Вихід",
          link: "logout"
        }
      ]
    }
  },
};
</script>