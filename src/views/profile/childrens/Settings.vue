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
                disabled="disabled"
               ></TextInput>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex xs12 md8 class="settings">
        <div v-if="profile.accountPlus" style="text-align: right">Congratulations on your account completely filled</div>
        <v-form ref="form" v-model="valid" lazy-validation>
          <div v-for="(user, index) in accountFullData" :key="index">
            <TextInput
              v-if="user.uniqueField != 'checkbox'  && user.uniqueField != 'password' && user.uniqueField  != 'avatar'"
              :mask="user.mask"
              :label="user.label"
              :rules="user.rules"
              :value="profile[user.value]"
              :placeholder="profile[user.placeholder]"
              @onInput="onInput(index, $event)"
            />

            <FileInput
              v-if="user.uniqueField  === 'avatar'"
              :label="user.label"
              @file="onInput(index, $event)"
            />

            <Password
              v-if="user.uniqueField === 'password'"
              :label="user.label"
              :rules="user.rules"
              :value="profile[user.value]"
              :placeholder="profile[user.placeholder]"
              @onInput="onInput(index, $event)"
            />
            <Checkbox 
              v-if="user.uniqueField === 'checkbox'" 
              label="Do you agree?"
              :value="profile[user.value]"
              @onInput="onInput(index, $event)"
              />
          </div>
          <v-btn color="info" @click="updateProfile">Update Profile</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </div>
</template>


<script>
import axios from "axios";
import { mapState, mapGetters, mapActions } from "vuex";
import { emailValidate, textValidate } from "@/utils/validate";
import TextInput from "@/components/sub-components/TextInput";
import Checkbox from "@/components/sub-components/Checkbox";
import SliderInput from "@/components/sub-components/SliderInput";
import Password from "@/components/sub-components/Password";
import FileInput from "@/components/sub-components/FileInput";


export default {
  name: "ProfileSettings",

  components: { TextInput, Checkbox, SliderInput, Password, FileInput },

  data() {
    return {
      valid: false,
      accountFullData: [
        {
          label: "First name",
          placeholder: "firstName",
          value: 'firstName',
          rules: textValidate
        },
        {
          label: "Last name",
          placeholder: "lastName",
          value: "lastName",
          rules: textValidate
        },
        {
          label: "Avatar",
          value: 'avatar.src',
          uniqueField: "avatar"
        },
        {
          label: "Age",
          value: 'age',
          placeholder: "age",
        },
        {
          label: "Email address",
          placeholder: "email",
          value: "email",
          rules: emailValidate
        },
        {
          label: "Password",
          placeholder: "password",
          value: "password",
          uniqueField: "password"
        },
        {
          label: "Phone",
          placeholder: "",
          value: "phone",
          mask: "phone",
        },
        {
          label: "Address",
          placeholder: "address",
          value: "address",
        },
        {
          label: "Do you agree?",
          placeholder: "",
          value: "agree",
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
    }),
  },
  methods: {
    updateProfile() {
      if(this.$refs.form.validate()){
        console.log(this.profile);
        let { avatar, ...rest} = this.profile;

       axios
        .put("/auth/me", rest)
        .then(response => {
          console.log('success');
          this.$store.dispatch("profile/setProfileData", response.data);
        })
        .catch(error => {
          console.log(error);
          // this.$emit('errors', error.response.data);
        });

        let fd = new FormData();
        fd.append('avatar', avatar.file);
        axios
        .put("/auth/me", fd)
        .then(response => {
          this.$store.dispatch("profile/setProfileData", response.data);
        })
        .catch(error => {
          console.log(error);
          // this.$emit('errors', error.response.data);
        });
      }
    },

    normalizeData(index, value){
      console.log(this.accountFullData[index]);
      this.accountFullData[index].value = this.profile[value];
    },
    onInput(index, value){
      this.$store.dispatch('profile/updataProfile', {stateValue: this.accountFullData[index].value ,value});
    },
  },
};
</script>