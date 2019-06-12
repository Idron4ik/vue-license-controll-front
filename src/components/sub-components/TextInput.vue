<template>
  <v-text-field
    :label="label"
    :rules="rules"
    :mask="mask"
    :value="value"
    :placeholder="placeholder"
    color="main"
    :disabled="disabled"
    @input="$emit('onInput', $event)"
  ></v-text-field>
</template>

<script>
import { emailValidate, textValidate } from "@/utils/validate";

export default {
  name: "inputText",

  props:{
    label: {
      type: String
    },
    value: {
      type: String
    },
    placeholder: {
      type: String
    },
    rules:{
      type: Array,
      default: () => []
    },
    mask:{
      type: String,
      default: ''
    },
    disabled:{
      type: Boolean,
      default: false,
    }
   
  },
   data(){
      return {
        emailValidate,
        textValidate,
      }
    },
};
</script>

<style lang="scss" scoped>
</style>