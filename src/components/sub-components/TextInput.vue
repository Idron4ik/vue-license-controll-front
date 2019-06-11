<template>
  <v-text-field
    :label="label"
    :rules="rules"
    :mask="mask"
    :value="value"
    :placeholder="placeholder"
    color="main"
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
   
  },
   data(){
      return {
        emailValidate,
        textValidate,
      }
    }
};
</script>

<style lang="scss" scoped>
</style>