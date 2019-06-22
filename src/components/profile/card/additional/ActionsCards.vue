<template>
  <v-container fluid grid-list-md class="status__table">

    <div :class="['products__container', {'vue-loading': ajaxStatusCards}]">
       <div class="paginations" v-if="productsBody.length > pagination.rowsPerPage">
        <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
    </div>
      <v-data-iterator 
        content-tag="v-layout" 
        :items="productsBody" 
        row 
        wrap
        hide-actions
        :pagination.sync="pagination"
      >
        <template v-slot:item="props">
          <v-flex xs12 sm6 md4 lg3>
            <StatusCard
              :countStep="3"
              :activeStep="
                (props.item.status === 'PENDING') ? (1) : 
                (props.item.status === 'REJECTED') ? (1) : 
                (props.item.status === 'SCRIPT_WORKING') ? (1) : 
                (props.item.status === 'WAITING_FOR_RESULTS_REVIEW') ? (1) :
                (props.item.status === 'WAITING_FOR_PAYMENT') ? (2) :
                (props.item.status === 'PAYED') ? (3) : 0
              "
            >
              <template #step-1>
                <div class="products-card__container">
                  <ul class="products-card__items">
                    <DefaultCardData :header="productsHeaders" :itemElem="props.item"/>
                  </ul>
                </div>
              </template>
              <template #step-2>
                <div class="products-card__container">
                  <ul class="products-card__items">
                    <DefaultCardData :header="productsHeaders" :itemElem="props.item"/>
                    <LinksContainer :links="props.item.links" :indexBody="props.item.index" :productsBody="productsBody"/>
                    <li class="products-card__item">
                      <h2>Для продовження ви повинні оплатити</h2>
                      <v-btn @click="goPay(props.item)">Оплатити</v-btn>
                    </li>
                  </ul>
                </div>
              </template>
              <template #step-3>
                <div class="products-card__container">
                  <ul class="products-card__items">
                    <DefaultCardData :header="productsHeaders" :itemElem="props.item"/>

                    <li class="products-card__item">
                      <h2>Дякуємо вам за покупку</h2>
                    </li>
                  </ul>
                </div>
              </template>
            </StatusCard>
          </v-flex>
        </template>
      </v-data-iterator>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import StatusCard from "@/components/sub-components/default/StatusCard";
import DefaultCardData from "@/components/sub-components/default/DefaultCardData";
import LinksContainer from "@/components/sub-components/default/LinksContainer";


export default {
  name: "tableMobile",

  props: {
    productsBody: {
      type: Array
    },
    productsHeaders: {
      type: Array
    }
  },

  components: {
    StatusCard,
    LinksContainer,
    DefaultCardData
  },

  data() {
    return {
      editedIndex: true,
      defaultItem: {
        title: "",
        description: "",
        status: "PENDING"
      },
      ajaxStatusCards: false,
      pagination: {
        rowsPerPage: 4
      },
    };
  },

  computed:{
  pages () {
    if (this.pagination.rowsPerPage == null ||
      this.productsBody.length == null
    ) return 0

    return Math.ceil(this.productsBody.length / this.pagination.rowsPerPage)
}
  },

  methods: {
    deleteItem(item, index) {
      if (confirm("Are you sure you want to delete this item?")) {
        this.ajaxStatusCards = true;
        axios
          .delete(`/products/${item.id}`)
          .then(response => {
              this.ajaxStatusCards = false;
              this.$store.dispatch("products/deleteProductsItem", index);
            })
            .catch(function(error) {
              console.log(error);
          });
      }
    },

    goPay(item){
      console.log(item);
      this.ajaxStatusCards = true;

      axios
        .put(`/products/${item.id}`, {
          status: "WAITING_FOR_PAYMENT",
          links: this.productsBody[item.index].links,
          ownerId: item.ownerId
        })
        .then(response => {
          this.$store.dispatch("productsAdmin/updateProduct", {
            product: response.data,
            index: item.index
          });
          this.ajaxStatusCards = false;

          this.$router.push({ name: "checkout", params: item });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
