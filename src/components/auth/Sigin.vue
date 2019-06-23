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
          @onInput="onInput(item, $event)"
        />
        <Password
          v-if="item.uniqueField === 'password'"
          :label="item.label"
          :rules="item.rules"
          :placeholder="item.placeholder"
          :value="item.value"
          @onInput="onInput(item, $event)"
        />

      </div>

      <v-btn :disabled="!valid" class="user__btn" color="primary" @click="signAction">Зареєструватись</v-btn>
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
          label: "Ім'я",
          value: '',
          rules: textValidate,
        },
        {
          label: "Прізвище",
          value: '',
          rules: textValidate,
        },
        {
          label: "Пошта",
          value: '',
          rules: emailValidate,
        },
        {
          label: "Пароль",
          value: '',
          uniqueField: "password",
        },
      ],
      valid: true,
      // gender: {},
    };
  },

  computed: {
  },

  methods: {
    onInput(fieldText, value){
      fieldText.value = value;
    },
    signAction() {
      if (this.$refs.form.validate()) {
        let signForm = {
          firstName: this.sign[0].value,
          lastName: this.sign[1].value,
          email: this.sign[2].value,
          password: this.sign[3].value
        };

        axios
          .post("/auth/register", {
            ...signForm
          })
          .then(response => {
            if(response.data.user) localStorage.setItem('user', JSON.stringify(response.data.user));
            if(response.data.token) {
              localStorage.setItem('jwt', response.data.token);
              axios.defaults.headers.common['Authorization'] = `JWT ${localStorage.getItem("jwt")}`;
              this.$router.push(`/profile/dashboard`);
            }
          })
          .catch(error => {
            this.$emit('errors', error.response.data);
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
