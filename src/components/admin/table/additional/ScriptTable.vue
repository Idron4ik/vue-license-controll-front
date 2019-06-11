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
    remove(keywords, word) {
      keywords.splice(keywords.indexOf(word), 1);
    },

    approve(item) {
      axios
        .put(
          `/admin/products/${item.id}`,
          {
            status: "APPROVED",
            keywords: item.keywords
          },
          {
            headers: {
              Authorization: `JWT ${localStorage.getItem("jwt")}`
            }
          }
        )
        .then(response => {
          console.log(123);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    
    rejected(item) {
      axios
        .put(
          `/admin/products/${item.id}`,
          {
            status: "REJECTED"
          },
          {
            headers: {
              Authorization: `JWT ${localStorage.getItem("jwt")}`
            }
          }
        )
        .then(response => {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>  