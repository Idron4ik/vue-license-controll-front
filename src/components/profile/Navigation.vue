<template>
  <v-navigation-drawer v-model="drawer" :mini-variant="miniNavigation" permanent dark>
    <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>John Leider</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-list class="pt-0" dense>
      <v-divider></v-divider>

      <v-list-tile v-for="item in items" :key="item.title" @click>
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Navigation",

  props:{
    miniNavigation:{
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      drawer: true,
      items: [
        { title: "Dashboard", icon: "dashboard", component: "Dashboard" },
        { title: "Inbox", icon: "mail_outline", component: "Inbox" }
      ],
      right: null
    };
  }
};
</script>

<style lang="scss" scoped>
</style>