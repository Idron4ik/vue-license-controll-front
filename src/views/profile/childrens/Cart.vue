<template>
  <div class="cart">
    <div 
      class="cart__select"
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
      class="cart__stepper"
      v-else
    >
      <h2>Your products - {{radioGroup.title}}</h2>
      <Stepper :productId="radioGroup.id" :needToPay="radioGroup.price"/>
    </div>


  </div>
</template>

<script>
  import axios from "axios";
  import Stepper from '../../../components/profile/cart/StepperCard';
  import { mapState, mapGetters, mapActions } from "vuex";

  export default {
    name: 'Cart',

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
    },

    mounted(){
      if(this.$route.params.title){
        this.step = false;
        this.radioGroup = this.$route.params;
      }

      let token = localStorage.getItem('jwt') ;
      axios
        .get(`/products?status=WAITING_FOR_PAYMENT`,
        {
          headers: {
          "Authorization" : `JWT ${token}` 
        }
       })
        .then((response) => {
          console.log(response.data);
          this.$store.dispatch('products/setCartProducts', response.data);

        })
        .catch(function(error) {
          console.log(error);
        });
    }

  }
</script>

<style lang="scss" scoped>

</style>