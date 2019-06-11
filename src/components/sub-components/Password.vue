<template>
   <v-text-field
      v-model="password"
      :append-icon="show ? 'visibility' : 'visibility_off'"
      :rules="rules"
      :type="show ? 'text' : 'password'"
      :label="label"
      :value="value"
      :placeholde="placeholder"
      @click:append="show = !show"
      color="main"
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
    },

    data(){
      return{
        show: false,
        password: ''
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>