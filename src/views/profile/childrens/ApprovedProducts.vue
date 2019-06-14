<template>
  <div class="approved-products">
    <div 
      class="approved-products__select"
      v-if="step"
    >
        <h2>Chose your product</h2>
        <v-radio-group v-model="radioGroup">
          <v-radio
            v-for="(products, index) in products"
            :key="index"
            :label="products.title"
            :value="products.title"
          ></v-radio>
        </v-radio-group>
        <v-btn 
          color="success" 
          @click="apply"
          :disabled="!radioGroup"
        >
          Apply
        </v-btn>
    </div>
    <div 
      class="approved-products__stepper"
      v-else
    >
      <h2>Your products - {{radioGroup}}</h2>
      <Stepper/>
    </div>


  </div>
</template>

<script>
  import Stepper from '@/components/Stepper';
  import { mapState, mapGetters, mapActions } from "vuex";

  export default {
    name: 'approvedProducts',

    components: {Stepper},

    data () {
      return {
        step: true,
        radioGroup: null,
      }
    },
    computed:{
      ...mapState({
        products: state => state.products.approved
      }),
    },
    methods:{
      apply(){
        console.log(this.radioGroup);
        this.step = false
      }
    }

  }
</script>

<style lang="scss" scoped>

</style>