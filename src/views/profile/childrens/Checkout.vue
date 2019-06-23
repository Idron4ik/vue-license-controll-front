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
          <v-card height="200px" class="checkout-card">
            <h3 class="checkout-card__title">Для продовження вам потрібно пройти, повну реєстрацію профіля</h3><br>
            <v-btn color="primary" @click="goSetting">пройти повну реєстрацію профіля</v-btn>
          </v-card>
        </v-form>
        <v-form v-if="n===1" :ref="'form' + n" v-model="item.valid" lazy-validation>
          <v-card class="checkout-card">
            <h3 class="checkout-card__title">Вам потрібно подати наступні файли</h3>
            <div class="inputs__container">
              <FileInput
                v-for="(input, index) in countInputFile"
                :key="index"
                label="Документ, що затверджує право."
                @file="fileData.push($event)"
                :rules="vrequired"
              />
               <v-btn 
                color="primary" 
                dark
                @click="countInputFile.push({})"
              >
                <v-icon dark right>add</v-icon>
                Додати документ
              </v-btn>
           
            </div>
            <v-textarea label="Additional information" v-model="additionalInformation"/>
          </v-card>
        </v-form>

        <v-form v-if="n===2" :ref="'form' + n" v-model="item.valid" lazy-validation>
           <v-card class="checkout-card w100">
            <h3 class="checkout-card__title">Вам потрібно оплатити {{productCheckout.price}}</h3>
            <TextInput
              disabled="disabled"
              label="Price"
              placeholder="price"
              :value="productCheckout.price"
              @onInput="price = $event"
              appendIcon="euro_symbol"
            />
             <TextInput
              label="Номер вашої карти"
              :rules="textValidate"
              placeholder="credit-card"
              :value="card"
              mask="credit-card"
              @onInput="card = $event"
              appendIcon="credit_card"

            />

            <v-menu
              v-model="datePicker"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="date"
                  label="Закінчення дії вашої карти"
                  append-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
            </v-menu>
           
           <Password label="Ваш cvv" placeholder="Ваш cvv"/>
          </v-card>
        </v-form>

        <v-form v-if="n === 3" :ref="'form' + n" v-model="item.valid" lazy-validation>
           <v-card class="checkout-card" >
            <h3 class="checkout-card__title">Дякуємо за все! Менеджер перестане танцювати, і відпише вам на пошту. Чекайте результатів на пошту</h3>
          </v-card>
        </v-form>
      </v-stepper-content>

      <template v-if="!success">
        <v-btn color="primary" @click="nextStep(activeStep)" :disabled="canNext">{{btnNextText}}</v-btn>
        <v-btn color="primary" @click="prevStep(activeStep)" v-if="!canPrev" :disabled="canPrev">Попередній</v-btn>
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
import Password from "@/components/sub-components/Password";
import AnimationAjax from "@/components/sub-components/AnimationAjax";
import { setTimeout } from 'timers';
import axios from "axios";


export default {
  name: "Checkout",

  components: { 
    FileInput, 
    TextInput,
    AnimationAjax,
    Password
  },
  data() {
    return {
      loadingPay: false,
      success: false,
      vrequired,
      textValidate,
      activeStep: 1,
      stepStart: 1,
      datePicker: false,
      date: new Date().toISOString().substr(0, 10),
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
          tooltip: "Результат, можна отримати на пошті"
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
      return this.activeStep === this.header.length - 1 ? "Оплатити" : "Продовжити";
    },
    productCheckout(){
      return JSON.parse(localStorage.getItem('productCheckout'));
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
      localStorage.setItem('checkout', true);
      this.$router.push({ name: "settings" });
    },

    sendData(){
      let fd = new FormData();

      this.fileData.forEach((item, index)=>{
        fd.append('documents', this.fileData[index].file);
      });
      fd.append('card', this.card);
      fd.append('price', this.price);
      fd.append('additional', this.additionalInformation);
      fd.append('status', 'PAYED');
      this.loadingPay= true;
      axios
        .put(`/products/${this.productCheckout.id}`, fd)
        .then((response) => {
          this.activeStep = this.header.length;
          this.success = true;
          this.loadingPay= false;
          localStorage.removeItem('productCheckout');

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