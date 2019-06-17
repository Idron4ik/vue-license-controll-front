<template>
  <div class="table">
    <div class="table__mobile">
      <ActionsCard 
        :productsBody="productsBody"
        :productsHeaders="productsHeaders"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import ActionsCard from "./additional/ActionsCard";
export default {
  name: "AdminCards",

  components: { ActionsCard },

  data() {
    return {
      selected: [],
      expand: false
    };
  },

  computed: {
    ...mapState({
      productsBody: state => state.productsAdmin.productsBody,
      productsHeaders: state => state.productsAdmin.productsHeaders
    })
  }
};
</script>