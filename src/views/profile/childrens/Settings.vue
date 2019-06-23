<template>
  <div :class="['profile__settings', {'vue-loading': ajaxProfile}]">
    <v-layout wrap>
      <v-flex xs12 md4 class="profile__settings_info">
        <v-card class="card" dark>
          <div class="card__header">
            <div class="avatar">
              <img
              v-if="profile.avatar.src"
              :src="profile.avatar.src"
              :alt="profile.avatar.title"
              height="200px"
              width="200px"
              class="img"
              contain
            />
            <v-icon color="primary" v-else>face</v-icon>
              </div>  
            <h2 class="card__name">{{userName}}</h2>
          </div>

          <v-list class="card__body">
            <v-list-tile v-for="(user, index) in accountMiniData" :key="index">
               <TextInput
                :label="user.label"
                :placeholder="profile[user.placeholder]"
                disabled="disabled"
                :prependiIcon="user.icon"
                :mask="user.mask"
                :value="profile[user.value]"
               ></TextInput>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex xs12 md8 class="settings">
        <div v-if="profile.accountPlus" style="text-align: right">Вітаємо! Ви повністю заповнили свій обліковий запис</div>
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
              label="Підтвердити"
              :value="profile[user.value]"
              @onInput="onInput(index, $event)"
              />
          </div>
          <v-btn color="primary" @click="updateProfile">{{updateProfileText}}</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
    <AnimationAjax/>
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
import AnimationAjax from "@/components/sub-components/AnimationAjax";

export default {
  name: "ProfileSettings",

  components: { 
    TextInput, 
    Checkbox, 
    SliderInput, 
    Password, 
    FileInput, 
    AnimationAjax 
  },

  data() {
    return {
      valid: false,
      accountFullData: [
        {
          label: "Ім'я",
          placeholder: "Ваше ім'я",
          value: 'firstName',
          rules: textValidate
        },
        {
          label: "Прізвище",
          placeholder: "Прізвище",
          value: "lastName",
          rules: textValidate
        },
        {
          label: "Ваше фото",
          value: 'avatar.src',
          uniqueField: "avatar"
        },
        {
          label: "Вік",
          value: 'age',
          placeholder: "age",
        },
        {
          label: "Поштова адреса",
          placeholder: "Поштова адреса",
          value: "email",
          rules: emailValidate
        },
        {
          label: "Пароль",
          placeholder: "Пароль",
          value: "password",
          uniqueField: "password"
        },
        {
          label: "Мобільний телефон",
          placeholder: "(000)-000-0-000",
          value: "phone",
          mask: "phone",
        },
        {
          label: "Адреса",
          placeholder: "Адреса",
          value: "address",
        },
        {
          label: "Ви впевнені?",
          placeholder: "",
          value: "agree",
          uniqueField: "checkbox"
        }
      ],
      accountMiniData: [
        {
          label: "Ваша почтова адреса",
          placeholder: "johndove@gmail.com",
          value: "email",
          icon: 'mail'
        },
        {
          label: "Ваш мобільний телефон",
          placeholder: "(000)-000-0-000",
          value: "phone",
          icon: 'phone',
          mask: "phone",
        },
        {
          label: "Ваша адреса",
          placeholder: "Марс",
          value: "address",
          icon: 'location_on'
        }
      ],
      ajaxProfile: false,
    };
  },

  computed: {
    ...mapState({
      profile: state => state.profile
    }),
    ...mapGetters("profile", {
      userName: "userFullName"
    }),

    updateProfileText(){
      return !!localStorage.getItem('checkout')  ? 'Оновити профіль та перейти до оплати': 'Оновити профіль'
    }
  },
  methods: {
    updateProfile() {
      if(this.$refs.form.validate()){
        let { avatar, ...rest} = this.profile;
        this.ajaxProfile = true;

       axios
        .put("/auth/me", rest)
        .then(response => {
          this.ajaxProfile = false;
          this.$store.dispatch("profile/setProfileData", response.data);
          // console.log(response.data.accountPlus);
          // console.log(!!localStorage.getItem('checkout'));
          // console.log(response.data.accountPlus && !!localStorage.getItem('checkout') );
          if(response.data.accountPlus && (!!localStorage.getItem('checkout')) ){
            localStorage.removeItem('checkout');
            this.$router.push({ name: "checkout" });
            
          }

        })
        .catch(error => {
          console.log(error);
          // this.$emit('errors', error.response.data);
        });
        if(!!avatar.file){
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

  
  mounted(){
    this.ajaxProfile = true;
    axios
      .get(`/auth/me`)
      .then((response) => {
        this.ajaxProfile = false;
        this.$store.dispatch('profile/setProfileData', response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
    }
};
</script>