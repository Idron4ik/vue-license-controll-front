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
                    <li
                      class="products-card__item"
                      v-for="(item, index) in productsHeaders"
                      :key="index"
                    >
                      <!-- <div 
                        class="label"
                      >
                        <v-icon>{{item.icon}}</v-icon>{{item.text}}: 
                      </div>
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
                          <v-icon small @click="deleteItem(props.item, props.item.index)">delete</v-icon>
                        </template>
                      </div> -->
                      <template
                          v-if="item.text.toLowerCase() === 'title'"
                          class="align-end"
                        > 
                          <div class="products-card__title"> 
                            {{ props.item[item.text.toLowerCase()] }}
                          </div>
                      </template>
                      <template
                          v-if="item.text.toLowerCase() === 'description'"
                          class="align-end"
                        > 
                          <div class="products-card__description"> 
                            {{ props.item[item.text.toLowerCase()] }}
                          </div>
                      </template>
                      <template
                          v-if="item.text.toLowerCase() === 'status'"
                          class="align-end"
                        > 
                          <div class="products-card__status"> 
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
                          <div class="products-card__icon">
                            <v-icon large>
                              {{
                                props.item.status === 'PENDING' ? 'cached' : 
                                (props.item.status === 'REJECTED') ? 'block' : 
                                (props.item.status === 'SCRIPT_WORKING') ? 'settings_input_svideo' : 
                                (props.item.status === 'WAITING_FOR_PAYMENT') ? 'check' : 
                                (props.item.status === 'PAYED') ? 'business_center' : false
                              }}
                              </v-icon>
                          </div>

                          </div>
                      </template>
                    </li>
                  </ul>
                </div>
              </template>
              <template #step-2>
                <div class="products-card__container">
                  <ul class="products-card__items">
                    <!-- <DefaultCardData :data="productsHeaders"/> -->
                    <li
                      class="products-card__item"
                      v-for="(item, index) in productsHeaders"
                      :key="index"
                    >
                      <template
                          v-if="item.text.toLowerCase() === 'title'"
                          class="align-end"
                        > 
                          <div class="products-card__title"> 
                            {{ props.item[item.text.toLowerCase()] }}
                          </div>
                      </template>
                      <template
                          v-if="item.text.toLowerCase() === 'description'"
                          class="align-end"
                        > 
                          <div class="products-card__description"> 
                            {{ props.item[item.text.toLowerCase()] }}
                          </div>
                      </template>
                      <template
                          v-if="item.text.toLowerCase() === 'status'"
                          class="align-end"
                        > 
                          <div class="products-card__status"> 
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
                          <div class="products-card__icon">
                            <v-icon large>
                              {{
                                props.item.status === 'PENDING' ? 'cached' : 
                                (props.item.status === 'REJECTED') ? 'block' : 
                                (props.item.status === 'SCRIPT_WORKING') ? 'settings_input_svideo' : 
                                (props.item.status === 'WAITING_FOR_PAYMENT') ? 'check' : 
                                (props.item.status === 'PAYED') ? 'business_center' : false
                              }}
                              </v-icon>
                          </div>

                          </div>
                      </template>
                    </li>
                    <LinksContainer :links="props.item.links" :indexBody="props.item.index" :productsBody="productsBody"/>
                    <li class="products-card__item">
                      <h2>Вам потрібно оплатити</h2>
                      <v-btn @click="goPay(props.item)">pay</v-btn>
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
