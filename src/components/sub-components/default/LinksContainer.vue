<template>
  <div>
    <div class="products-card__item links">
      <slot></slot>  
      <ul class="links__container">
        <li v-for="(link, index) in links" :key="index" class="links__item">
          {{index+1}}.
          <a :href="link">{{link}}</a>
          <v-icon @click="removeLink(index)">delete</v-icon>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "linksContainer",

  props:{
    links:{
      type: Array
    },
    indexBody:{
      type: Number
    },
    productsBody:{
      type: Array
    }
  },


  data(){
    return{
      
    }
  },

  methods:{
    removeLink(index) {
      console.log(this.indexBody);
      console.log(this.productsBody);
      this.productsBody[this.indexBody].links.splice(index, 1);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>