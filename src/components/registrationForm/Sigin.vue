<template>
  <div class="user__sign">
    RegisterForm
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field label="First name" :rules="textValidate" :counter="10" v-model="firstName"></v-text-field>

      <v-text-field label="Last name" :rules="textValidate" :counter="10" v-model="lastName"></v-text-field>

      <v-text-field label="Email" :rules="emailValidate" v-model="mail"></v-text-field>

      <v-select :items="genderSelect" v-model="gender" label="Gender"></v-select>

      <v-text-field
        v-model="password"
        :append-icon="showPassword ? 'visibility' : 'visibility_off'"
        :type="showPassword ? 'text' : 'password'"
        label="Password"
        @click:append="showPassword = !showPassword"
      ></v-text-field>
      <v-btn :disabled="!valid" color="success" @click="sign">Sign</v-btn>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import { emailValidate, textValidate } from "@/utils/validate";
  export default {
    name: 'Sign',

    data() {
    return {
      valid: true,
      emailValidate,
      textValidate,
      mail: "haker.kolya@gmai.com",
      firstName: "Kolya",
      lastName: "Sider",
      gender: {},
      password: "haker123",
      genderSelect: ["Male", "Female"],
      showPassword: false,
      activeTab: false
    };
  },

  computed: {
     ...mapState({
    token: state => state.profile.token,
  }),
  },

  methods:{
    sign() {
      if (this.$refs.form.validate()) {
        let signForm = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.mail,
          //  gender: this.gender,
          password: this.password
        };

        axios
          .post("/auth/register", {
            ...signForm
          })
          .then((response) => {
            this.$store.dispatch('setProfileData', response.data);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
  }

  }
</script>

<style lang="scss" scoped>

</style>