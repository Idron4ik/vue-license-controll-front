<template>
  <div class="approved-products">
    <div 
      class="approved-products__select"
      v-if="step"
    >
        <h2>Chose your product</h2>
        <v-radio-group v-model="radioGroup">
          <v-radio
            v-for="product in products"
            :key="product.id"
            :label="product.title"
            :value="{id: product.id, title: product.title, price: product.price}"
          />
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
      <h2>Your products - {{radioGroup.title}}</h2>
      <Stepper :productId="radioGroup.id" :needToPay="radioGroup.price"/>
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