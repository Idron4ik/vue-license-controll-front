<template>
  <div class="user__login">
    <v-form ref="form" v-model="valid" lazy-validation>

      <TextInput
        :label="login[0].label"
        :rules="login[0].rules"
        :placeholder="login[0].placeholder"
        :value="login[0].value"
        @onInput="onInput(0, $event)"
      />

      <Password
        :label="login[1].label"
        :rules="login[1].rules"
        :placeholder="login[1].placeholder"
        :value="login[1].value"
        @onInput="onInput(1, $event)"
      />

      <v-btn
        :disabled="!valid"
        color="transparent"
        class="user__btn"
        @click="loginAction"
      >
        Log In
      </v-btn>

    </v-form>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import { emailValidate, textValidate } from "@/utils/validate";
import TextInput from "@/components/sub-components/TextInput";
import Password from "@/components/sub-components/Password";

export default {
  name: "Login",

  components:{
    TextInput, Password
  },

  data() {
    return {
      login:[
        {
          label: "Email address",
          placeholder: "email",
          rules: emailValidate,
          value:'haker.kolya@gmai.com'
        },
        {
          label: "Password",
          placeholder: "password",
          uniqueField: "password",
          value:'haker123'
        },
      ],
      valid: true,
    };
  },
  computed: {
    ...mapState({
      token: state => state.profile.token
    })
  },
  methods: {
    loginAction() {
      let token = localStorage.getItem("jwt");

      if (this.$refs.form.validate()) {
        let loginForm = {
          email: this.login[0].value,
          password: this.login[1].value
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
        .catch(error => {
          this.$emit('errors', error.response.data);
        });
      }
    },
    onInput(index, value){
      this.login[index].value = value;
      this.$emit('errors', '');
    },
  }
};
</script>

<style lang="scss" scoped>
</style>
