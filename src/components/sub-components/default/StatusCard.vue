<template>
  <div class="tabs">
    <div class="status__container">
      <slot name="default"></slot>  
      <template v-if="activeStep">
        <div 
          class="status" v-for="step in countStep" 
          :key="step" 
          v-if="activeStep === step"
        >
          
          <slot :name="`step-${step}`"></slot>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "statusCard",

  props: {
    countStep: {
      type: Number,
      default: 3
    },
    activeStep: {
      type: Number
    }
  }
};
</script>