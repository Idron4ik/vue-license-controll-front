<template>
  <v-checkbox
    v-model="agree"
    :label="label"
    :rules="rules"
    required
  ></v-checkbox>
</template>

<script>
export default {
  name: "checkbox",

  props:{
    label: {
      type: String
    },
    rules:{
      type: Array,
      default: () => [v => !!v || 'You must agree to continue!']
    },
  },

  data(){
    return {
      agree: false,
    }
  }
};
</script>

<style lang="scss" scoped>
</style>