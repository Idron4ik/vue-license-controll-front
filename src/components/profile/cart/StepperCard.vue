<template>
  <v-stepper :value="activeStep">
    <v-stepper-header>
      <div v-for="(item, n) in header" :key="`${n}-stepper`">
        <v-stepper-step :complete="completeStep > n+1" :step="n+1" edit-icon="create">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <div flat color="primary" dark v-on="on">{{item.title}}</div>
            </template>
            <span>{{item.tooltip}}</span>
          </v-tooltip>
        </v-stepper-step>
        <v-divider></v-divider>
      </div>
    </v-stepper-header>

    <v-stepper-items :class="{'vue-loading': loadingPay}">
      <v-stepper-content v-for="(item, n) in header" :key="`${n}-content`" :step="n+1">
        <v-form v-if="n===0" :ref="'form' + n" v-model="item.valid" lazy-validation>
          <v-card class="mb-5">
            <h3 class>Для продовження вам потрібно пройти, повну реєстрацію профіля</h3> <br>
            <v-btn color="primary" @click="goSetting">пройти повну реєстрацію профіля</v-btn>
          </v-card>
        </v-form>

        <v-form v-if="n===1" :ref="'form' + n" v-model="item.valid" lazy-validation>
          <v-card class="mb-5" color="grey lighten-1">
            <p>Щоб продовжити, вам потрібно подати наступні документи</p>
            <div class="inputs__container">
               <v-btn 
                color="primary" 
                dark
                @click="countInputFile.push({})"
              >
                <v-icon dark right>add</v-icon>
                Додати документ
              </v-btn>
              <FileInput
                v-for="(input, index) in countInputFile"
                :key="index"
                label="Документ, який затверджує ваші права."
                @file="fileData.push($event)"
                :rules="vrequired"
              />
            </div>
            <v-textarea label="Додаткова інформація" v-model="additionalInformation"/>
          </v-card>
        </v-form>

        <v-form v-if="n===2" :ref="'form' + n" v-model="item.valid" lazy-validation>
          <v-card class="mb-5" color="grey lighten-1">
             <TextInput
              label="Номер карти"
              :rules="textValidate"
              placeholder="credit-card"
              :value="card"
              mask="credit-card"
              @onInput="card = $event"
            />
           <TextInput
              label="Ціна"
              :rules="textValidate"
              placeholder="price"
              :value="price"
              @onInput="price = $event"
            />
          </v-card>
        </v-form>

        <v-form v-if="n === 3" :ref="'form' + n" v-model="item.valid" lazy-validation>
          <v-card class="mb-5" color="grey lighten-1" height="200px">
            <p>Дякую за все. Ви отримуєте результати на вашу пошту.</p>
          </v-card>
        </v-form>
      </v-stepper-content>

      <template v-if="!success">
        <v-btn color="primary" @click="nextStep(activeStep)" :disabled="canNext">{{btnNextText}}</v-btn>
        <v-btn color="primary" @click="prevStep(activeStep)" v-if="!canPrev" :disabled="canPrev">попередній</v-btn>
      </template>

      <AnimationAjax/>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import { vrequired, textValidate } from "@/utils/validate";
import { mapState, mapGetters, mapActions } from "vuex";
import FileInput from "@/components/sub-components/FileInput";
import TextInput from "@/components/sub-components/TextInput";
import AnimationAjax from "@/components/sub-components/AnimationAjax";
import { setTimeout } from 'timers';
import axios from "axios";


export default {
  name: "StepperCard",

  components: { 
    FileInput, 
    TextInput,
    AnimationAjax
  },

  props:{
    productId:{
      type: [String, Number] 
    },
    
    needToPay:{
      type: [String, Number] 
    }
  },

  data() {
    return {
      loadingPay: false,
      success: false,
      vrequired,
      textValidate,
      activeStep: 1,
      stepStart: 1,
      header: [
        {
          title: "Реєстрація",
          tooltip: "Реєстрація користувача"
        },
        {
          title: "Завантаження документів",
          tooltip: "Ви повинні завантажити документи, що підтверджують ваше право на вололодіння"
        },
        {
          title: "Оплата",
          tooltip: "Вам оплатити"
        },
        {
          title: "Результат",
          tooltip: "Результат, можна отримати в пошті"
        }
      ],
      fileData: [],
      additionalInformation: "",
      card: "",
      price: "",
      id: "",
      countInputFile: [{}]
    };
  },

  computed: {
    ...mapState({
      accountPlus: state => state.profile.accountPlus
    }),
    completeStep() {
      return this.activeStep;
    },
    canNext() {
      return this.activeStep >= this.header.length || !this.accountPlus;
    },
    canPrev() {
      return this.activeStep <= this.stepStart;
    },

    btnNextText() {
      return this.activeStep === this.header.length - 1 ? "pay" : "Continue";
    }
  },

  methods: {
    nextStep(n) {
      if (this.$refs[`form${n - 1}`][0].validate() && this.accountPlus) {
        if (n < 3) {
          if (n === this.header.length) {
            this.activeStep = this.header.length;
          } else this.activeStep = n + 1;
        } else this.sendData();
      }
    },
    prevStep(n) {
      if (n === 0) {
        this.activeStep = 1;
      } else {
        this.activeStep = n - 1;
      }
    },

    goSetting() {
      this.$router.push({ name: "settings" });
    },

    sendData(){
      let fd = new FormData();
      // fd.append('documents', this.fileData[0].file);
      // fd.append('documents', this.fileData[1].file);
      this.fileData.forEach((item, index)=>{
        console.log(index);
      fd.append('documents', this.fileData[index].file);

      });
      fd.append('card', this.card);
      fd.append('price', this.price);
      fd.append('additional', this.additionalInformation);
      fd.append('status', 'PAYED');
      this.loadingPay= true;
      axios
        .put(`/products/${this.productId}`, fd)
        .then((response) => {
          this.activeStep = this.header.length;
          this.success = true;
          this.loadingPay= false;

        })
        .catch(function(error) {
          console.log(error);
        });
        
    }
  },
  mounted() {
        this.ajaxProfile = true;
    axios
      .get(`/auth/me`)
      .then((response) => {
        this.ajaxProfile = false;
        this.$store.dispatch('profile/setProfileData', response.data);
           if (this.accountPlus) {
            this.activeStep = 2;
            this.stepStart = 2;
          };
      })
      .catch(function(error) {
        console.log(error);
      });
    this.header.forEach(item => {
      item.valid = false;
    });
 

  }
};
</script>

<style lang="scss" scoped>
</style>