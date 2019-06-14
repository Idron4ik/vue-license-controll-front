<template>
  <v-stepper :value="activeStep">
    <v-stepper-header>
      <div v-for="(item, n) in header" :key="`${n}-stepper`">
        <v-stepper-step :complete="completeStep > n" :step="n+1">
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
      <v-stepper-content v-for="(item, n) in header" :key="`${n}-content`" :step="n">

        <div class="sttepper" v-if="n===0">
          <v-card  class="mb-5" color="grey lighten-1" height="200px">
            <p>Для продовження вам потрыбно пройти повну режстрацію в настройках профіля</p>
            <v-btn color="main">Account Settings</v-btn>
          </v-card>
          <!-- <v-btn color="primary" @click="nextStep(n+1)">Continue</v-btn>
          <v-btn color="primary" @click="prevStep(n-1)" :disabled="canPrev">prev</v-btn> -->
        </div>
        
        <div class="sttepper" v-if="n===1">
          <v-card  class="mb-5" color="grey lighten-1" height="200px">
            <p>вам потрыбно подати наступны файли</p>
            <input type="file">
            <input type="file">
            <input type="file">
            <input type="file">
          </v-card>
          <!-- <v-btn color="primary" @click="nextStep(n+1)">Continue</v-btn>
          <v-btn color="primary" @click="prevStep(n-1)" :disabled="canPrev">prev</v-btn> -->
        </div>

        <div class="sttepper" v-if="n===2">
          <v-card  class="mb-5" color="grey lighten-1" height="200px">
            <p>Вам потрібно оплатити</p>
            <v-btn color="main">Pay</v-btn>
          </v-card>
          <!-- <v-btn color="primary" @click="nextStep(n+1)">Continue</v-btn>
          <v-btn color="primary" @click="prevStep(n-1)" :disabled="canPrev">prev</v-btn> -->
        </div>
        <div class="sttepper" v-if="n===3">
          <v-card  class="mb-5" color="grey lighten-1" height="200px">
            <p>Дякую за все чекайте результатыв на пошту</p>
            <v-btn color="main">Pay</v-btn>
          </v-card>
        </div>
          <v-btn color="primary" @click="nextStep(n)" :disabled="canNext">Continue</v-btn>
          <v-btn color="primary" @click="prevStep(n)" :disabled="canPrev">prev</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "Stepper",

  data() {
    return {
      activeStep: 2,
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
      ]
    };
  },

  computed: {
    ...mapState({
      profile: state => state.profile
    }),
    completeStep(){
      return this.activeStep;
    },
    canNext(){
      return this.activeStep >= this.header.length - 1;
    },
    canPrev(){
      return this.activeStep < 1;
    }
  },

  methods: {
    nextStep(n) {
      if (n === this.header.length) {
        this.activeStep = this.header.length;
      } else {
        this.activeStep = n + 1;
      }
    },
    prevStep(n) {
      if (n === 0) {
        this.activeStep = 1;
      } else {
        this.activeStep = n - 1;
      }
    },

   
  },
   updated(){
      // console.log(123);
      // console.log(this.activeStep);
    },

    mounted(){
      if(this.profile.accountPlus){
        this.activeStep = 0;
      }
    }

};
</script>

<style lang="scss" scoped>
</style>