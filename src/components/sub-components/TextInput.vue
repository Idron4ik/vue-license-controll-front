<template>
  <v-text-field
    :label="label"
    :rules="rules"
    :mask="mask"
    :value="value"
    :placeholder="placeholder"
    color="primary"
    :disabled="disabled"
    @input="$emit('onInput', $event)"
    :prepend-icon="prependiIcon"
    :append-icon="appendIcon"
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
      type: [String, Number]
    },
    placeholder: {
      type: [String, Number]
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
    },
    prependiIcon:{
      type: String
    },
    appendIcon:{
      type: String
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