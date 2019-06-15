<template>
  <div class="tabs">
    <div
      class="step"
      v-for="step in countStep" :key="step"
    >
      <slot name="default"></slot>  
      <template 
        v-if="activeStep"
      >
        <slot 
        v-if="activeStep === step"
        :name="`step-${step}`"
      ></slot>
      </template>
      <slot 
        v-else
        :name="`step-${step}`"
      ></slot>
    </div>
    <!-- <header> -->
      <!-- <slot name="header"></slot> -->
    <!-- </header> -->
    <!-- <main> -->
      <!-- <slot></slot> -->
    <!-- </main> -->
    <!-- <footer> -->
      <!-- <slot name="footer"></slot> -->
    <!-- </footer> -->
  </div>
</template>

<script>
export default {
  name: "statusCard",

  props:{
    countStep:{
      type: Number,
      default: 3
    },
    activeStep:{
      type: Number,
    }
  }
};
</script>

<style lang="scss" scoped>
</style>