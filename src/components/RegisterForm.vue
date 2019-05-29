<template>
  <div class="user">
    <div class="user__sign" v-if="activeTab">
      RegisterForm
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field label="First name" :rules="textValidation" :counter="10" v-model="firstName"></v-text-field>

        <v-text-field label="Last name" :rules="textValidation" :counter="10" v-model="lastName"></v-text-field>

        <v-text-field label="Email" :rules="emailValidation" v-model="mail"></v-text-field>

        <v-select :items="genderSelect" v-model="gender" label="Gender"></v-select>

        <v-text-field
          v-model="password"
          :append-icon="showPassword ? 'visibility' : 'visibility_off'"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          @click:append="showPassword = !showPassword"
        ></v-text-field>

        <v-btn :disabled="!valid" color="success" @click="sign">sign</v-btn>
        <v-btn color="success" @click="switchForm">{{switchFormText}}</v-btn>
      </v-form>
    </div>
    <div class="user__login" v-else>
      Login Form
      {{token}}
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field label="Email" :rules="emailValidation" v-model="mail"></v-text-field>

        <v-text-field
          v-model="password"
          :append-icon="showPassword ? 'visibility' : 'visibility_off'"
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          @click:append="showPassword = !showPassword"
        ></v-text-field>

        <v-btn :disabled="!valid" color="success" @click="login">Log In</v-btn>

        <v-btn color="success" @click="switchForm">{{switchFormText}}</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from 'vuex';
export default {
  name: "RegisterForm",

  data() {
    return {
      valid: true,
      emailValidation: [
        value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
      ],
      textValidation: [
        v => (v && v.length >= 3) || "Minimum text length 3 character"
      ],
      mail: "vi.chyb@gmai.com",
      firstName: "john",
      lastName: "Doev",
      gender: {},
      password: "qwerty123",
      genderSelect: ["Male", "Female"],
      showPassword: false,
      userText: ["Registration Info", "Log In"],
      activeTab: false
    };
  },

  computed: {
     ...mapState({
    token: state => state.profile.token,
  }),
    switchFormText() {
      return this.activeTab ? "Login" : "Sign";
    }
  },

  methods: {
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
    login() {
      if (this.$refs.form.validate()) {
        let loginForm = {
          email: this.mail,
          password: this.password,
          token: this.token,
        };

        axios
          .post("/auth/login", {
            ...loginForm
          })
          .then((response) => {
            this.$store.dispatch('setProfileData', response.data);
            this.$router.push("/profile");
          })
          .catch(function(error) {
            console.log(error);
          });

      }
    },
    switchForm() {
      this.activeTab = !this.activeTab;
    }
  },
  mounted() {
    console.log(this.$store.state);
  }
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
