<template>
  <v-stepper v-model="e1">
    <v-stepper-header >
      <div
        v-for="n in header.length"
        :key="`${n}-stepper`"
      >
        <v-stepper-step :complete="e1 > n" :step="n">{{header[n]}}</v-stepper-step>
        <v-divider></v-divider>
      </div>
      <!-- <v-stepper-step :complete="e1 > 1" step="1">Name of step 1</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">Name of step 2</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">Name of step 3</v-stepper-step> -->
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content
          v-for="n in header.length"
          :key="`${n}-content`"
          :step="n"
        >
          <v-card
            class="mb-5"
            color="grey lighten-1"
            height="200px"
          ></v-card>

          <v-btn
            color="primary"
            @click="nextStep(n)"
          >
            Continue
          </v-btn>

          <v-btn flat>Cancel</v-btn>
        </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
export default {
  name: "Stepper",

  data() {
    return {
      e1: 0,
      header:['Registrations', 'Load fiels', 'Pay', 'Await results']
    };
  },

  methods:{
      nextStep (n) {
        if (n === this.steps) {
          this.e1 = 1
        } else {
          this.e1 = n + 1
        }
      }
  }
};
</script>

<style lang="scss" scoped>
</style>