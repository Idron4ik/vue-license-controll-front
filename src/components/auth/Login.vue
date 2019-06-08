<template>
  <div class="user__login">
    Login Form
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

  data() {
    return {
      valid: true,
      mail: "haker.kolya@gmai.com",
      gender: {},
      emailValidate,
      textValidate,
      showPassword: false,
      password: "haker123"
    };
  },
  computed: {
    ...mapState({
      token: state => state.profile.token
    })
  },
  methods: {
    login() {
      let token = localStorage.getItem("jwt");

      if (this.$refs.form.validate()) {
        let loginForm = {
          email: this.mail,
          password: this.password
        };

      axios
        .post(
          "/auth/login",
          {
            ...loginForm
          },
          {
            headers: {
              Authorization: `JWT ${token}`
            }
          }
        )
        .then(response => {
          this.$store.dispatch("profile/setProfileData", response.data);
          this.$router.push(`/profile/${token}`);
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