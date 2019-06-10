<template>
  <v-layout fill-height="100%">
    <v-flex >
      <Navigation :miniNavigation="showMiniNavigation"/>
    </v-flex>
    <v-flex xs12>
      <v-layout wrap>
        <v-flex xs12>
          <Toolbar @toogle-navigation="toogleNavigation"/>
          <v-toolbar dark color="#2f343c">
            <v-toolbar-title class="white--text">{{pageTitle}}</v-toolbar-title>
          </v-toolbar>
        </v-flex>

        <v-flex xs12>
          <div class="profile">
            <router-view></router-view>
          </div>
        </v-flex>
      </v-layout>
    </v-flex>

  </v-layout>
</template>

<script>
import Table from "@/components/Table";
import Inbox from "@/components/Inbox";
import Navigation from "@/components/profile/Navigation";
import Toolbar from "@/components/profile/Toolbar";

export default {
  name: "Profile",

  components: { Table, Inbox, Navigation, Toolbar },

  data() {
    return {
      showMiniNavigation: true
    };
  },

  computed:{
    pageTitle(){
      switch(this.$route.name){
        case 'dashboard': return 'Dashboard';
        case 'home': return 'Home';
        case 'settings': return 'Account Settings';
        case 'admin': return 'Admin Dashboard';
        default: return 'Dashboard'
      }
    }
  },

  methods: {
    toogleNavigation() {
      this.showMiniNavigation = !this.showMiniNavigation;
    }
  }
};
</script>

<style lang="scss" scoped>
  .profile{
    padding: 30px;
  }
</style>