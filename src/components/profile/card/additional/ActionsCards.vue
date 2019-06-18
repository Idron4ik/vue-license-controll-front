<template>
  <v-container fluid grid-list-md class="status__table">

    <div :class="['products__container', {'vue-loading': ajaxStatusCards}]">
      <v-data-iterator content-tag="v-layout" :items="productsBody" row wrap>
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
                    <li
                      class="products-card__item"
                      v-for="(item, index) in productsHeaders"
                      :key="index"
                    >
                      <div class="label">{{item.text}}:</div>
                      <div class="value">
                        <template v-if="item.text.toLowerCase() === 'status' ">
                          <v-chip
                            :color="
                              props.item.status === 'PENDING' ? 'grey' : 
                              (props.item.status === 'REJECTED') ? 'red' : 
                              'red'
                            "
                            :text-color="
                              props.item.status === 'PENDING' ? 'black' : 
                              'white'"
                          >{{ props.item.status }}</v-chip>
                        </template>

                        <template
                          v-if="item.text.toLowerCase() !== 'status' && item.text.toLowerCase() !== 'actions'"
                          class="align-end"
                        >{{ props.item[item.text.toLowerCase()] }}</template>

                        <template v-if="item.text.toLowerCase() === 'actions'" class="align-end">
                          <v-icon small @click="deleteItem(props.item, props.index)">delete</v-icon>
                        </template>
                      </div>
                    </li>
                  </ul>
                </div>
              </template>
              <template #step-2>
                <div class="products-card__container">
                  <ul class="products-card__items">
                    <li class="products-card__item">
                      <div class="label">{{productsHeaders[0].text}}</div>
                      <div class="value">{{props.item.title}}</div>
                    </li>

                    <li class="products-card__item">
                      <div class="label">{{productsHeaders[1].text}}</div>
                      <div class="value">{{props.item.description}}</div>
                    </li>

                    <li class="products-card__item">
                      <h2>Вам потрібно оплатити</h2>
                      <v-btn @click="goPay({id: props.item.id, title: props.item.title})">pay</v-btn>
                    </li>
                  </ul>
                </div>
              </template>
              <template #step-3>
                <div class="products-card__container">
                  <ul class="products-card__items">
                    <li class="products-card__item">
                      <div class="label">{{productsHeaders[0].text}}</div>
                      <div class="value">{{props.item.title}}</div>
                    </li>

                    <li class="products-card__item">
                      <div class="label">{{productsHeaders[1].text}}</div>
                      <div class="value">{{props.item.description}}</div>
                    </li>

                    <li class="products-card__item">
                      <h2>DYAKUEMO ZA POKUPKU</h2>
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
    StatusCard
  },

  data() {
    return {
      isMobile: false,
      editedIndex: true,
      defaultItem: {
        title: "",
        description: "",
        status: "PENDING"
      },
      ajaxStatusCards: false
    };
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

    goPay({id, title}){
      this.$router.push({ name: "cart", params: { id, title } });
    }
  }
};
</script>
