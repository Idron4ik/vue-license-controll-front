<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
 props: {
    productsBody: {
      type: Array
    },
    productsHeaders: {
      type: Array
    }
  },

methods: {
    // editItem(item) {
    //   this.editedIndex = false;
    //   this.editedItem = Object.assign({}, item);
    //   this.dialog = true;
    // },

    deleteItem(item, index) {
      if (confirm("Are you sure you want to delete this item?")) {
        this.$store.dispatch("products/deleteProductsItem", {id: item.id, index});
      }
    },
  },
};
</script>  