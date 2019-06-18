<template>
  <v-container 
    fluid 
    grid-list-md
    class="status__table"
  >
    <v-bottom-sheet v-model="isOpenModel">
      <v-combobox
        v-model="keywords"
        label="Your keywords"
        chips
        clearable
        solo
        multiple
        append-icon="mail"
        @click:append="addKeywords"
      >
        <template v-slot:selection="data">
          <v-chip :selected="data.selected" close @input="remove(keywords, data.item)">
            <strong>{{ data.item }}</strong>
          </v-chip>
        </template>
      </v-combobox>
    </v-bottom-sheet>

    <v-data-iterator content-tag="v-layout" :items="productsBody" row wrap>
      <template v-slot:item="props">
        <v-flex xs12 sm6 md4 lg3>
          <StatusCard
            :countStep="5"
            :activeStep="
              (props.item.status === 'PENDING') ? (1) : 
              (props.item.status === 'REJECTED') ? (1) : 
              (props.item.status === 'SCRIPT_WORKING') ? (2) : 
              (props.item.status === 'WAITING_FOR_RESULTS_REVIEW') ? (3) :
              (props.item.status === 'WAITING_FOR_PAYMENT') ? (4) :
              (props.item.status === 'PAYED') ? (5) : 0
            "
          >
            <template #step-1>
              <div :class="[
                  'products-card__container',
                  {'error-border': props.item.status === 'REJECTED'},
                  {'waiting': props.item.status === 'SCRIPT_WORKING'}
                ]"
              >
                <ul class="products-card__items">
                  <li class="products-card__item" v-for="(item, index) in productsHeaders" :key="index">
                    <div class="label">{{item.text}}:</div>
                    <div class="value">
                      <template
                        v-if="item.text.toLowerCase() !== 'actions'"
                        class="align-end"
                      >
                        {{ props.item[item.text.toLowerCase()] }}
                      </template>

                      <template 
                        v-if="item.text.toLowerCase() === 'actions'"
                        class="actions"  
                      >
                        <v-btn 
                          color="success" 
                          :disabled="!props.item.keywords.length > 0"
                          @click="approve(props.item, props.index)"
                        >
                          send for processing
                        </v-btn>
                        <v-btn color="error" @click="rejected(props.item)">rejected</v-btn>
                        <v-btn
                          color="purple"
                          dark
                          @click="openModal(props.item.keywords, props.index)"
                        >Add keywords</v-btn>
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
                    <h2>Ожидаеться пока Отработает Парсер</h2>
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

                  <li class="products-card__item links">
                    <ul
                      class="links__container"
                    >
                      <li
                        v-for="(link, index) in props.item.links" 
                        :key="index"
                         class="links__item"
                      >
                        
                        {{index+1}}.
                        <a :href="link">{{link}}</a>
                        <v-icon @click="removeLink(props.index ,index)" >delete</v-icon>
                      </li>
                    </ul>
                    <v-btn @click="sendLinks(props.item.id, props.index)">submit</v-btn>
                  </li>
                </ul>
              </div>
            </template>

            <template #step-4>
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
                    <h2>Ожидаеться пока клиен оплатит</h2>
                  </li>
                </ul>
              </div>
            </template>

            <template #step-5>
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
                     <h2>Клиент Оплатил</h2>
                  </li>
                </ul>
              </div>
            </template>
          </StatusCard>
        </v-flex>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import StatusCard from "@/components/sub-components/default/StatusCard";
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "adminTableMobile",

  components: {
    StatusCard
  },

  props: {
    productsBody: {
      type: Array
    },
    productsHeaders: {
      type: Array
    }
  },

  data() {
    return {
      isOpenModel: false,
      selected: [],
      keywords: [],
      index: null,
    };
  },

  methods: {
    openModal(keywords, index) {
      this.index = index;
      this.keywords = keywords;
      this.isOpenModel = true;
    },

    addKeywords() {
      this.productsBody[this.index].keywords = this.keywords;
      this.isOpenModel = false;
      this.index = null;
      this.keywords = [];
    },

    remove(keywords, word) {
      keywords.splice(keywords.indexOf(word), 1);
    },

    approve(item, index) {
      axios
        .put(
          `/admin/products/${item.id}`,
          {
            status: "SCRIPT_WORKING",
            keywords: item.keywords
          },
        )
        .then(response => {
          this.$store.dispatch("productsAdmin/updateProduct", {product: response.data, index});
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
        )
        .then(response => {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    removeLink(id, elemIndex) {
      this.productsBody[id].links.splice(elemIndex, 1);
    },
    sendLinks(id, index) {
      axios
        .put(
          `/admin/products/${id}`,
          {
            status: "WAITING_FOR_PAYMENT",
            links: this.productsBody[index].links
          },
        )
        .then(response => {
          this.$store.dispatch("productsAdmin/updateProduct", {product: response.data, index});
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>