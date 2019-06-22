<template>
   <div class="content__main">
    <v-toolbar color="primary" dark> 
      <v-btn icon @click="showMenu = !showMenu">
        <v-icon>menu</v-icon>
      </v-btn>

      <v-toolbar-title class="white--text">{{pageTitle.title}}</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- <v-btn icon>
        <v-icon color="white--text">search</v-icon>
      </v-btn> -->
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
      class="navbar-menu"
    >
      <v-list class="pa-1 navbar-menu__header">
        <v-list-tile avatar >
          <v-list-tile-avatar>
            <v-icon color="white">lock</v-icon>
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
          :class="{'navbar-active': $route.name === category.link}"
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
        case 'home': return { title: 'Панель управління', color: 'orange' };
        case 'settings': return { title: 'Налаштування облікового запису', color: 'privery'};
        case 'admin': return { title: 'Панель управління Адміністратора', color: 'purple',};
        case 'approvedProducts': return { title: 'Оплачені продукти', };
        case 'inbox': return { title: 'Підтримка', color: 'cyan', };
        default: return { title: 'Панель управління', color: 'light-blue'};
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
