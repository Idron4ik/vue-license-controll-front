<template>
  <div class="table">
    <div class="table__desktop" v-if="!isMobile">
        <TableDesktop 
            :productsBody="productsBody"
            :productsHeaders="productsHeaders"
        ></TableDesktop>
    </div>

    <div class="table__mobile" v-else>
        <TableMobile 
            :productsBody="productsBody"
            :productsHeaders="productsHeaders"
        ></TableMobile>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import TableDesktop from "./additional/TableDesktop";
import TableMobile from "./additional/TableMobile";
export default {
  name: "adminTable",

  components: {TableDesktop, TableMobile },

  data() {
    return {
      isMobile: false,
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
    this.isMobile = window.screen.width < 960;

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