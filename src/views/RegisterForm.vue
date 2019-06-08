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
import Login from '@/components/registrationForm/Login';
import Sigin from '@/components/registrationForm/Sigin';

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

<style lang="scss" scoped>
.user {
  width: 100%;
  max-width: 780px;
  border: 1px solid white;
  padding: 28px;
  border-radius: 18px;
  background-color: rgba(0, 0, 0, 0.2);

  &__sign {
  }

  &__login {
  }
}
</style>
