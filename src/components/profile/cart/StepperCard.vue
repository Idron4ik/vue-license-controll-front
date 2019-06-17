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

    <v-stepper-items>
      <v-stepper-content v-for="(item, n) in header" :key="`${n}-content`" :step="n+1">
        <v-form v-if="n===0" :ref="'form' + n" v-model="item.valid" lazy-validation>
          <v-card class="mb-5" color="grey lighten-1" height="200px">
            <p>Для продовження вам потрыбно пройти повну режстрацію в настройках профіля</p>
            <v-btn color="main" @click="goSetting">Account Settings</v-btn>
          </v-card>
        </v-form>

        <v-form v-if="n===1" :ref="'form' + n" v-model="item.valid" lazy-validation>
          <v-card class="mb-5" color="grey lighten-1">
            <p>вам потрыбно подати наступны файли</p>
            <FileInput
              label="Твір в роздрукованому або в електронному вигляді."
              @file="fileData.push($event)"
              :rules="vrequired"
            />
            <FileInput
              label="Твір в роздрукованому або в електронному вигляді."
              @file="fileData.push($event)"
              :rules="vrequired"
            />

            <v-textarea label="Additional information" v-model="additionalInformation"/>
          </v-card>
        </v-form>

        <v-form v-if="n===2" :ref="'form' + n" v-model="item.valid" lazy-validation>
          <v-card class="mb-5" color="grey lighten-1">
            <p>Вам потрібно оплатити {{needToPay}} uhy</p>
             <TextInput
              label="Card number"
              :rules="textValidate"
              placeholder="credit-card"
              :value="card"
              mask="credit-card"
              @onInput="card = $event"
            />
           <TextInput
              label="Price"
              :rules="textValidate"
              placeholder="price"
              :value="price"
              @onInput="price = $event"
            />
          </v-card>
        </v-form>

        <v-form v-if="n === 3" :ref="'form' + n" v-model="item.valid" lazy-validation>
          <v-card class="mb-5" color="grey lighten-1" height="200px">
            <p>Дякую за все чекайте результатыв на пошту</p>
          </v-card>
        </v-form>
      </v-stepper-content>
      <template v-if="!success">
        <v-btn color="primary" @click="nextStep(activeStep)" :disabled="canNext">{{btnNextText}}</v-btn>
        <v-btn color="primary" @click="prevStep(activeStep)" v-if="!canPrev" :disabled="canPrev">prev</v-btn>
      </template>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import { vrequired, textValidate } from "@/utils/validate";
import { mapState, mapGetters, mapActions } from "vuex";
import FileInput from "@/components/sub-components/FileInput";
import TextInput from "@/components/sub-components/TextInput";
import { setTimeout } from 'timers';
import axios from "axios";


export default {
  name: "StepperCard",

  components: { FileInput, TextInput },

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
      success: false,
      vrequired,
      textValidate,
      activeStep: 1,
      stepStart: 1,
      header: [
        {
          title: "Registrations",
          tooltip: "lorem ipsum dplor"
        },
        {
          title: "Load fiels",
          tooltip: "lorem ipsum dplor"
        },
        {
          title: "Pay",
          tooltip: "lorem ipsum dplor"
        },
        {
          title: "Await results",
          tooltip: "lorem ipsum dplor"
        }
      ],
      fileData: [],
      additionalInformation: "",
      card: "",
      price: "",
      id: ""
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
      fd.append('documents', this.fileData[0].file);
      fd.append('documents', this.fileData[1].file);
      fd.append('card', this.card);
      fd.append('price', this.price);
      fd.append('additional', this.additionalInformation);
      fd.append('status', 'PAYED');

      axios
        .put(`/products/${this.productId}`, fd)
        .then((response) => {
          console.log('YEAHHHHHHHHHh');
          // this.$store.dispatch('products/setCartProducts', response.data);
          this.activeStep = this.header.length;
        this.success = true;

        })
        .catch(function(error) {
          console.log(error);
        });
        
    }
  },
  mounted() {
    this.header.forEach(item => {
      item.valid = false;
    });
    if (this.accountPlus) {
      this.activeStep = 2;
      this.stepStart = 2;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>