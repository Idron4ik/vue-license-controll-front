<template>
  <v-layout>
    <v-flex>
      <Navigation :miniNavigation="showMiniNavigation"/>
    </v-flex>

    <v-flex xs12>
      <v-layout wrap>
        <v-flex xs12>
          <Toolbar @toogle-navigation="toogleNavigation"/>
        </v-flex>
        
        <v-flex xs12>
          <div class="profile">
            <Table v-if="true"/>
            <Inbox v-else/>
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
      showMiniNavigation: true,
    };
  },

  methods: {
   toogleNavigation(){
     this.showMiniNavigation = !this.showMiniNavigation; 
   },
  }
};
</script>

<style lang="scss" scoped>
</style>