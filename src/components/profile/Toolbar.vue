<template>
  <v-toolbar dark color="primary">
    <v-toolbar-side-icon @click.stop="$emit('toogle-navigation')"></v-toolbar-side-icon>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>search</v-icon>
    </v-btn>

    <v-badge overlap color="red">
      <template v-slot:badge>5</template>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
    </v-badge>

    <v-badge color="red" overlap>
      <template v-slot:badge>
        <span>!</span>
      </template>
      <v-btn icon>
        <v-icon>mail</v-icon>
      </v-btn>
    </v-badge>

    <div class="text-xs-center">
      <v-menu
        dark
        nudge-bottom="52"
        transition="slide-x-transition"
        bottom
        right
        :close-on-content-click="false"
      >
        <template v-slot:activator="{ on }">
          <v-list-tile-avatar v-on="on">
            <img :src="avatar.src" :alt="avatar.title">
          </v-list-tile-avatar>
        </template>

        <v-card>
          <v-list>
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img :src="avatar.src" :alt="avatar.title">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{userName}}</v-list-tile-title>
                <v-list-tile-sub-title>{{userMail}}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-icon>{{accontPlus}}</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
          <v-divider />
          <v-list>
            <div v-for="(item, index) in navList" :key="index">
              <v-list-tile @click="navigation(item.method)">
                <v-list-tile-avatar>
                  <v-icon>{{item.icon}}</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-title>{{item.title}}</v-list-tile-title>
              </v-list-tile>
              <v-divider 
                v-if="index === 3 || index === 2 ">
              </v-divider>
            </div>
          </v-list>
        </v-card>
      </v-menu>
    </div>
  </v-toolbar>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "Toolbar",

  data() {
    return {
      switchTable: true,
      navList: [
        {
          icon: "account_box",
          title: "My Profile",
          method: ""
        },
        {
          icon: "account_balance_wallet",
          title: "My Balance",
          method: ""
        },
        {
          icon: "mail",
          title: "Inbox",
          method: ""
        },
        {
          icon: "settings",
          title: "Account Settings",
          method: "settings"
        },
        {
          icon: "power_settings_new",
          title: "Logout",
          method: "logout"
        }
      ]
    };
  },
  computed: {
    ...mapState({
      avatar: state => state.profile.avatar,
      userMail: state => state.profile.email
    }),
    ...mapGetters("profile", {
      userName: "userFullName",
      accontPlus: "accontPlus"
    })
  },
  methods: {
    navigation(component) {
      console.log(component);
      if(component === 'logout') return this.$router.push('/');
      this.$router.push(`/profile/123/${component}`);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>