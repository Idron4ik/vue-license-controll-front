<template>
  <div>

    <v-toolbar :color="pageTitle.color" flat>
      <v-btn icon light @click="turnBack">
        <v-icon color="grey darken-2">{{homePage ? 'menu' : 'arrow_back'}}</v-icon>
      </v-btn>

      <v-toolbar-title class="grey--text text--darken-4">{{pageTitle.title}}</v-toolbar-title>

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
          icon: "view_agenda",
          title: "Approved Products",
          link: "approvedProducts"
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
    };
  },

  computed:{
    pageTitle(){
      switch(this.$route.name){
        case 'home': return { title: 'Home', color: 'orange' };
        case 'settings': return { title: 'Account Settings', color: 'teal'};
        case 'admin': return { title: 'Admin Dashboard', color: 'purple'};
        case 'approvedProducts': return { title: 'Approved Products', color: 'pink'};
        case 'inbox': return { title: 'Inbox', color: 'cyan'};
        default: return { title: 'Dashboard', color: 'light-blue'};
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
      console.log(link);
      this.$router.push({ name: link });
    }
  }
};
</script>
