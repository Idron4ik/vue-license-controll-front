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
