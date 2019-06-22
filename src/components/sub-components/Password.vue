<template>
   <v-text-field
      :append-icon="show ? 'visibility' : 'visibility_off'"
      :rules="rules"
      :type="show ? 'text' : 'password'"
      :label="label"
      :placeholde="placeholder"
      :value="value"
      @click:append="show = !show"
      color="primary"
      @input="$emit('onInput', $event)"
    ></v-text-field>
</template>

<script>
  export default {
    name: 'password',

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
      appendIcon:{
        type: String
      }
    },

    data(){
      return{
        show: false,
      }
    }
  }
</script>