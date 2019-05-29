<template>
  <v-toolbar dark color="primary">
    <v-toolbar-side-icon @click.stop="$emit('toogle-navigation')"></v-toolbar-side-icon>


    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>search</v-icon>
    </v-btn>

    <v-btn icon @click="addProduct">
      <v-icon>add_circle_outline</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mail_outline</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>more_vert</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  name: "Toolbar",

  data(){
    return {
      switchTable: true,

    }
  },
  methods: {
    addProduct(){}
  }
};
</script>

<style lang="scss" scoped>
</style>