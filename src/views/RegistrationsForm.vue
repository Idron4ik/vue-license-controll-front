<template>
    <v-layout align-center justify-center fill-height>
      <div :class="['user', {'errors-border': !!msgErrors}]">
        <h1 class="user__title">{{textHeader}}</h1>
        <Sigin v-if="activeTab" @errors="msgErrors = $event"/>
        <Login v-else @errors="msgErrors = $event"/>
        <a
            href="#"
            @click="switchForm"
            class="user__footer"
        >
            {{textFooter}}
        </a>
        <ValidateErrors :msg="msgErrors" classes="user__errors"/>
      </div>
    </v-layout>
</template>

<script>
import axios from "axios";
import { mapState } from 'vuex';
import Login from '@/components/auth/Login';
import Sigin from '@/components/auth/Sigin';
import ValidateErrors from "@/components/sub-components/ValidateErrors";
import { emailValidate,  textValidate} from '@/utils/validate';


export default {
  name: "RegisterForm",

  components:{
    Login,
    Sigin,
    ValidateErrors
  },

  data() {
    return {
      msgErrors: "",
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
    this.msgErrors = "";

    }
  },
};
</script>
