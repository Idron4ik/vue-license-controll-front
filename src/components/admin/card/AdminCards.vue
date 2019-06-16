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
  },

  mounted() {

    axios
      .get(`/admin/products`, {
        headers: {
          Authorization: `JWT ${localStorage.getItem("jwt")}`
        }
      })
      .then(response => {
        //Add refresh page
        this.$store.dispatch("productsAdmin/setProducts", response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>