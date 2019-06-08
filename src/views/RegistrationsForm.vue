<template>
    <v-layout align-center justify-center fill-height>
      <div class="user">
        <Sigin v-if="activeTab" />
        <Login v-else/>
        <v-btn color="success" @click="switchForm">{{switchFormText}}</v-btn>
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
    switchFormText() {
      return this.activeTab ? "Login" : "Sign";
    }
  },

  methods: {
    switchForm() {
      this.activeTab = !this.activeTab;
    }
  },
};
</script>