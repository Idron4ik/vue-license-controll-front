<template>
    <v-layout align-center justify-center fill-height>
      <div class="user">
        <h1 class="user__title">{{textHeader}}</h1>
        <Sigin v-if="activeTab" />
        <Login v-else/>
        <a
            href="#"
            @click="switchForm"
            class="user__footer"
        >
            {{textFooter}}
        </a>
      </div>
    </v-layout>
</template>

<script>
import axios from "axios";
import { mapState } from 'vuex';
import Login from '@/components/auth/Login';
import Sigin from '@/components/auth/Sigin';

import { emailValidate,  textValidate} from '@/utils/validate';

export default {
  name: "RegisterForm",

  components:{
    Login,
    Sigin
  },

  data() {
    return {
      showPassword: false,
      activeTab: false
    };
  },

  computed: {
      textHeader() {
          return this.activeTab ? "Sigin" : "Login";
      },
    textFooter() {
      return this.activeTab ? "Already a Member? Login" : "Sign";
    }
  },

  methods: {
    switchForm(e) {
      e.preventDefault();
      this.activeTab = !this.activeTab;
    }
  },
};
</script>
