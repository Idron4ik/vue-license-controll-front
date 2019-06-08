<template>
  <div class="profile__settings">
    <v-layout wrap>
      <v-flex xs3 class="profile__settings_info">
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
              <v-text-field :label="user.label" :placeholder="profile[user.placeholder]" disabled></v-text-field>
            </v-list-tile>

          </v-list>
        </v-card>
      </v-flex>
      <v-flex xs9 class="settings">
        <v-form ref="form" v-model="valid" lazy-validation >

          <div v-for="(user, index) in accountFullData" :key="index">
            <v-text-field
              v-if="user.uniqueField != 'age' && user.uniqueField != 'checkbox'"
              :mask="user.mask"
              :label="user.label" 
              :rules="user.rules"
              :value="user.value"
              :placeholder="profile[user.placeholder]"
            >
            </v-text-field>

            <v-slider
              v-if="user.uniqueField === 'age'"
              v-model="age"
              color="blue"
              label="Age"
              hint="Be honest"
              min="18"
              max="36"
            ></v-slider>

            <v-checkbox
              v-if="user.uniqueField === 'checkbox'"
              v-model="agree"
              label="Do you agree?"
              :rules="[v => !!v || 'You must agree to continue!']"
              required
            ></v-checkbox>

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

export default {
  name: "ProfileSettings",

  data() {
    return {
      valid: false,
      age: '',
      agree: false,
      emailValidate,
      textValidate,
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
          uniqueField: 'age'
        },
        {
          label: "Email address",
          placeholder: "email",
          rules: emailValidate
        },
        {
          label: "Password",
          placeholder: "password"
        },
        {
          label: "Phone",
          placeholder: "phone",
          rules: textValidate,
          mask: 'phone',
          value: '0123456789'
        },
        {
          label: "Address",
          placeholder: "address",
          rules: textValidate
        },
        {
          label: "Do you agree?",
          placeholder: "",
          uniqueField: 'checkbox'
        },
      
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
  methods:{
    updateProfile(){
      this.$refs.form.validate();
    }
  },

  beforeRouteLeave (to, from, next) {
  const answer = window.confirm('Вы хотите уйти? У вас есть несохранённые изменения!')
  if (answer) {
    next()
  } else {
    next(false)
  }
}
};
</script>