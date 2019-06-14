<template>
  <v-stepper v-model="completeStep">
    <v-stepper-header>
      <div v-for="(item, n) in header" :key="`${n}-stepper`">
        <v-stepper-step :complete="completeStep > n+1" :step="n+1">
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
        <v-card 
          class="mb-5" 
          color="grey lighten-1" 
          height="200px"
        >
          {{n+1}}
        </v-card>

        <v-btn color="primary" @click="nextStep(n+1)">Continue</v-btn>
        <!-- <v-btn flat>Cancel</v-btn> -->
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
      completeStep: 0,
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

computed:{
  ...mapState({
      profile: state => state.profile
    }),
},

  methods: {
    nextStep(n) {
      if (n === this.steps) {
        this.completeStep = 1;
      } else {
        this.completeStep = n + 1;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>