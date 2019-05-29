<template>
    <v-layout align-center justify-center fill-height>
      <RegisterForm></RegisterForm> 
    </v-layout>
  <!-- <v-btn>
    <v-icon>email</v-icon>
    <span>Click me</span>
  </v-btn> -->
</template>

<script>
import HelloWorld from "@/components/HelloWorld";
import RegisterForm from "@/components/RegisterForm";

export default {
  components: {
    HelloWorld,
    RegisterForm
  }
};
</script>
