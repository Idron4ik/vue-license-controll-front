<template>
  <v-slider
    color="primary"
    :label="label"
    :min="min"
    :max="max"
    :value="value"
    thumb-label="always"
    :step="step"
    @input="onInput"
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
    },
    step:{
      type: Number
    }
  },

  methods:{
    onInput(e){
      this.$emit('range', e)

    }
  }
};
</script>

<style lang="scss" scoped>
</style>