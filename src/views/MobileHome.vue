<template>
  <div>

    <v-toolbar color="white" flat>
      <v-btn icon light @click="turnBack">
        <v-icon color="grey darken-2">{{homePage ? 'menu' : 'arrow_back'}}</v-icon>
      </v-btn>

      <v-toolbar-title class="grey--text text--darken-4">{{pageTitle}}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon light>
        <v-icon color="grey darken-2">search</v-icon>
      </v-btn>
    </v-toolbar>

    <ul class="category" v-if="homePage">
      <li class="category__item" v-for="(category, index) in categories" :key="index">
        <div class="category__title" @click="switchContent(category.link)">
          <v-icon large color="main" class="category__icon">{{category.icon}}</v-icon>
          {{category.title}}
        </div>
      </li>
    </ul>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Toolbar from "@/components/profile/Toolbar";

export default {
  name: "mobileHome",
  components: {Toolbar},

  data() {
    return {
      categories: [
        {
          icon: "dashboard",
          title: "Dashboard",
          link: "dashboard"
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
    };
  },

  computed:{
    pageTitle(){
      switch(this.$route.name){
        case 'home': return 'Home';
        case 'settings': return 'Account Settings';
        case 'admin': return 'Admin Dashboard';
        default: return 'Dashboard'
      }
    },

    homePage(){
      return this.$route.name === 'home';
    }
  },

  methods: {
    turnBack(){
       this.$router.push({ name: 'home' });
    },
    switchContent(link) {
      this.$router.push({ name: link });
    }
  }
};
</script>
