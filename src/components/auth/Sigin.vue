<template>
  <div class="user__sign">
    <v-form ref="form" v-model="valid" lazy-validation>
      
      <div class="form__item"
        v-for="(item, index) in sign"
        :key="index"
      >
        <TextInput
          v-if="item.uniqueField !== 'password'"
          :label="item.label"
          :rules="item.rules"
          :placeholder="item.placeholder"
          :value="item.value"
          @onInput="item.value = $event"
        />
        <Password
          v-if="item.uniqueField === 'password'"
          :label="item.label"
          :rules="item.rules"
          :placeholder="item.placeholder"
          :value="item.value"
          @onInput="item.value = $event"
        />

      </div>

      <!--<v-select-->
      <!--:items="genderSelect"-->
      <!--v-model="gender"-->
      <!--label="Gender"-->
      <!--color="main"-->
      <!--&gt;</v-select>-->

      <!-- <v-text-field
        v-model="password"
        :append-icon="showPassword ? 'visibility' : 'visibility_off'"
        :type="showPassword ? 'text' : 'password'"
        label="Password"
        @click:append="showPassword = !showPassword"
        color="main"
      ></v-text-field> -->

      <v-btn :disabled="!valid" class="user__btn" color="transparent" @click="signAction">Sign</v-btn>
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
  name: "Sign",

  components: {
    TextInput,
    Password
  },

  data() {
    return {
      sign:[
        {
          label: "First name",
          value: '',
          rules: textValidate,
        },
        {
          label: "Last name",
          value: '',
          rules: textValidate,
        },
        {
          label: "Email address",
          value: '',
          rules: emailValidate,
        },
        {
          label: "Password",
          value: '',
          uniqueField: "password",
        },
      ],
      valid: true,
      // gender: {},
    };
  },

  computed: {
    ...mapState({
      token: state => state.profile.token
    })
  },

  methods: {
    signAction() {
      if (this.$refs.form.validate()) {
        let signForm = {
          firstName: this.sign[0].value,
          lastName: this.sign[1].value,
          email: this.sign[2].value,
          //  gender: this.gender,
          password: this.sign[3].value
        };

        axios
          .post("/auth/register", {
            ...signForm
          })
          .then(response => {
            this.$store.dispatch("profile/setProfileData", response.data);
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
