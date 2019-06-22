<template>
   <div>
    <v-toolbar :color="pageTitle.color" flat>
      <v-btn icon light @click="showMenu = !showMenu">
      <!-- <v-btn icon light @click="turnBack"> -->
        <!-- <v-icon color="grey darken-2">{{homePage ? 'menu' : 'arrow_back'}}</v-icon> -->
        <v-icon color="grey darken-2">menu</v-icon>
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
    <v-navigation-drawer
      v-model="showMenu"
      absolute
      temporary
    >
      <v-list class="pa-1">
        <v-list-tile avatar >
          <v-list-tile-avatar>
            <v-icon>lock</v-icon>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>Vue License Control</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile
          v-for="(category, index) in categories" 
          :key="index"
          @click="switchContent(category.link)"
        >
          <v-list-tile-action>
            <v-icon>{{ category.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ category.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

    </v-navigation-drawer>
    <div class="main">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import Toolbar from "@/components/profile/Toolbar";

export default {
  name: "homePage",
  
  components: {Toolbar},

  props:{
    categories:{
      type: Array
    },
    indexPage:{
      type: String
    }
  },

  data() {
    return {
      showMenu: false,
      items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'About', icon: 'question_answer' }
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
      return this.$route.name === this.indexPage;
    }
  },

  methods: {
    turnBack(){
       this.$router.push({ name: this.indexPage });
    },
    switchContent(link) {
      if(link === 'logout'){
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
        this.$router.push('/');

        return
      }
      this.$router.push({ name: link });
    }
  }
};
</script>
