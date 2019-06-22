<template>
  <v-checkbox
    :value="value"
    :label="label"
    :rules="rules"
    required
    color="primary"
    @change="$emit('onInput', $event)"
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
      default: () => [v => !!v || 'Ви повинні підтвердити, щоб продовжити!']
    },
    value:{
      type: Boolean,
      default: false
    }
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