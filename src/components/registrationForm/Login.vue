<template>
  <div class="user__login">
    Login Form
    {{token}}
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field label="Email" :rules="emailValidate" v-model="mail"></v-text-field>

      <v-text-field
        v-model="password"
        :append-icon="showPassword ? 'visibility' : 'visibility_off'"
        :type="showPassword ? 'text' : 'password'"
        label="Password"
        @click:append="showPassword = !showPassword"
      ></v-text-field>

      <v-btn :disabled="!valid" color="success" @click="login">Log In</v-btn>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import { emailValidate, textValidate } from "@/utils/validate";
export default {
  name: "Login",

  data(){
    return{
      valid: true,
      mail: "haker.kolya@gmai.com",
      gender: {},
      emailValidate,
      textValidate,
      showPassword: false,
      password: "haker123",
    }
  },
  computed: {
    ...mapState({
      token: state => state.profile.token
    })
  },
  methods: {
    login() {
      if (this.$refs.form.validate()) {
        let loginForm = {
          email: this.mail,
          password: this.password,
          token: this.token
        };

        axios
          .post("/auth/login", {
            ...loginForm
          })
          .then(response => {
            this.$store.dispatch("setProfileData", response.data);
            this.$router.push("/profile");
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>