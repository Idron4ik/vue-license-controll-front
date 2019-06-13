<template>
  <v-slider
    v-model="age"
    color="main"
    :label="label"
    :min="min"
    :max="max"
    :value="20"
    thumb-label="always"
  ></v-slider>
</template>

<script>
export default {
  name: "sliderInput",
  
  props:{
    label:{
      type: String,
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default:10
    },
    value:{
      type: Number
    }
  },

  data(){
    return{
      age: null
    }
  }
};
</script>

<style lang="scss" scoped>
</style>