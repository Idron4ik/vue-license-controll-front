<template>
    <HomePage :categories="categories" indexPage="admin" />
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
          title: "Панель управління",
          link: "dashboardAdmin"
        },
        {
          icon: "mail",
          title: "Підтримка",
          link: "inboxAdmin"
        },
        {
          icon: "power_settings_new",
          title: "Вихід",
          link: "logout"
        }
      ]
    }
  }
};
</script>