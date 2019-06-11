<template>
  <div class="profile__settings">
    <v-layout wrap>
      <v-flex xs12 md4 class="profile__settings_info">
        <v-card class="card" dark>
          <div class="card__header">
            <v-img
              class="avatar"
              :src="profile.avatar.src"
              :alt="profile.avatar.title"
              height="200px"
              width="200px"
              contain
            ></v-img>
            <h2 class="card__name">{{userName}}</h2>
          </div>

          <v-list class="card__body" dark>
            <v-list-tile v-for="(user, index) in accountMiniData" :key="index">

               <TextInput
                :label="user.label"
                :placeholder="profile[user.placeholder]"
                disabled
               ></TextInput>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex xs12 md8 class="settings">
        <v-form ref="form" v-model="valid" lazy-validation>
          <div v-for="(user, index) in accountFullData" :key="index">
            <TextInput
              v-if="user.uniqueField != 'age' && user.uniqueField != 'checkbox'  && user.uniqueField != 'password'"
              :mask="user.mask"
              :label="user.label"
              :rules="user.rules"
              :value="user.value"
              :placeholder="profile[user.placeholder]"
            ></TextInput>

            <Password
              v-if="user.uniqueField === 'password'"
              :label="user.label"
              :rules="user.rules"
              :value="user.value"
              :placeholder="profile[user.placeholder]"
            ></Password>
            <SliderInput v-if="user.uniqueField === 'age'" label="Age" :min="18" :max="36"></SliderInput>
            <Checkbox v-if="user.uniqueField === 'checkbox'" label="Do you agree?"></Checkbox>
          </div>

          <v-btn color="info" @click="updateProfile">Update Profile</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </div>
</template>


<script>
import { mapState, mapGetters } from "vuex";
import { emailValidate, textValidate } from "@/utils/validate";
import TextInput from "@/components/sub-components/TextInput";
import Checkbox from "@/components/sub-components/Checkbox";
import SliderInput from "@/components/sub-components/SliderInput";
import Password from "@/components/sub-components/Password";

export default {
  name: "ProfileSettings",

  components: { TextInput, Checkbox, SliderInput, Password },

  data() {
    return {
      valid: false,
      accountFullData: [
        {
          label: "First name",
          placeholder: "firstName",
          rules: textValidate
        },
        {
          label: "Last name",
          placeholder: "lastName",
          rules: textValidate
        },
        {
          label: "Age",
          placeholder: "age",
          uniqueField: "age"
        },
        {
          label: "Email address",
          placeholder: "email",
          rules: emailValidate
        },
        {
          label: "Password",
          placeholder: "password",
          uniqueField: "password"
        },
        {
          label: "Phone",
          placeholder: "",
          rules: textValidate,
          mask: "phone",
        },
        {
          label: "Address",
          placeholder: "address",
          rules: textValidate
        },
        {
          label: "Do you agree?",
          placeholder: "",
          uniqueField: "checkbox"
        }
      ],
      accountMiniData: [
        {
          label: "Email address",
          placeholder: "email"
        },
        {
          label: "Phone",
          placeholder: "phone"
        },
        {
          label: "Address",
          placeholder: "address"
        }
      ]
    };
  },

  computed: {
    ...mapState({
      profile: state => state.profile
    }),
    ...mapGetters("profile", {
      userName: "userFullName"
    })
  },
  methods: {
    updateProfile() {
      this.$refs.form.validate();
    }
  }

  //   beforeRouteLeave (to, from, next) {
  //   const answer = window.confirm('Вы хотите уйти? У вас есть несохранённые изменения!')
  //   if (answer) {
  //     next()
  //   } else {
  //     next(false)
  //   }
  // }
};
</script>