<template>
  <v-container fluid grid-list-md class="status__table">
    <v-bottom-sheet v-model="isOpenModel">
      <v-combobox
        v-model="keywords"
        label="Введіть ключові слова"
        chips
        clearable
        solo
        multiple
        append-icon="mail"
        @click:append="addKeywords"
      >
        <template v-slot:selection="data">
          <v-chip :selected="data.selected" close class="keywords" @input="remove(keywords, data.item)">
            <strong>{{ data.item }}</strong>
          </v-chip>
        </template>
      </v-combobox>
    </v-bottom-sheet>
     <div 
      class="dashboard-products no_products"
      v-if="!productsBody.length"
    >
      <div class="label">Користувач, ще не створив продукти</div>
    </div>
    <div v-else :class="['products__container', {'vue-loading': ajaxStatusCards}]">
      <div class="paginations" 
          v-if="productsBody.length > pagination.rowsPerPage">
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
          <v-flex xs12 sm6 md4 lg4>
            <StatusCard
              :countStep="6"
              :activeStep="
                (props.item.status === 'PENDING') ? (1) : 
                (props.item.status === 'REJECTED') ? (6) : 
                (props.item.status === 'SCRIPT_WORKING') ? (2) : 
                (props.item.status === 'WAITING_FOR_RESULTS_REVIEW') ? (3) :
                (props.item.status === 'WAITING_FOR_PAYMENT') ? (4) :
                (props.item.status === 'PAYED') ? (5) : 0
              "
            >
           
              <template #step-1>
                <div
                  :class="[
                  'products-card__container',
                  {'error-border': props.item.status === 'REJECTED'},
                  {'waiting': props.item.status === 'SCRIPT_WORKING'}
                ]"
                >
                  <ul class="products-card__items">
                    <DefaultCardData 
                      :header="productsHeaders"
                      :itemElem="props.item"
                    />
                    <li
                      class="products-card__item"
                      v-for="(item, index) in productsHeaders"
                      :key="index"
                      v-if="index !== 0 && index !== 1"
                    >
                      <div class="value">
                        <template
                          v-if="item.text.toLowerCase() === 'keywords' && props.item[item.text.toLowerCase()].length > 0"
                          class="align-end"
                        >
                          <v-chip 
                            v-for="(label, index) in props.item[item.text.toLowerCase()]"
                            :key="index"
                            color="primary" 
                            text-color="white"
                          >
                            <v-icon left>label</v-icon>{{label}}
                          </v-chip>

                          <div class="parse">
                            <h3 class="parse__title">Глубина пошуку</h3>
                            <Range
                              class="parse__range"
                              :step="2"
                              :min="3"
                              :max="10"
                              :value="props.item.linksCount"
                              @range="props.item.linksCount = $event"
                            />
                          </div>
                        
                        </template>

                        <template v-if="item.text.toLowerCase() === 'actions'" class="actions">
                          <v-btn
                            color="success"
                            :disabled="!props.item.keywords.length > 0"
                            @click="approve(props.item, props.item.index)"
                          >Надіслати на опрацювання</v-btn>
                          <v-btn color="error" @click="rejected(props.item, props.item.index)">Відмінити</v-btn>
                          <v-btn
                            color="purple"
                            dark
                            @click="openModal(props.item.keywords, props.item.index)"
                          >Додати ключові слова</v-btn>
                        </template>
                      </div>
                    </li>
                  </ul>
                </div>
              </template>

              <template #step-2>
                <div class="products-card__container">
                  <ul class="products-card__items">
                   <DefaultCardData 
                      :header="productsHeaders" 
                      :itemElem="props.item"
                    />
                    <li class="products-card__item">
                      <h2>Очікуйте, поки закінчить роботу парсер</h2>
                    </li>
                  </ul>
                </div>
              </template>

              <template #step-3>
                <div class="products-card__container">
                  <ul class="products-card__items">
                   <DefaultCardData 
                      :header="productsHeaders" 
                      :itemElem="props.item"
                    />

                    <li class="products-card__item links">
                      <LinksContainer :links="props.item.links" :indexBody="props.item.index" :productsBody="productsBody"/>
                      <v-btn @click="sendLinks(props.item, props.item.index)">підтвердити</v-btn>
                    </li>
                  </ul>
                </div>
              </template>

              <template #step-4>
                <div class="products-card__container">
                  <ul class="products-card__items">
                    <DefaultCardData 
                      :header="productsHeaders" 
                      :itemElem="props.item"
                    />
                    <li class="products-card__item">
                      <h2>Очікується, поки клієнт оплатить</h2>
                    </li>
                  </ul>
                </div>
              </template>
              
              <template #step-5>
                <div class="products-card__container">
                  <ul class="products-card__items">
                    <DefaultCardData 
                      :header="productsHeaders" 
                      :itemElem="props.item"
                    />
                    <li class="products-card__item">
                      <h2>Клієнт оплатив</h2>
                    </li>
                    <li class="products-card__item user__documents">
                      <h3 class="title">Документи, що прикріпив користувач</h3>
                      <ul 
                        class="user__documents-links"
                        v-for="(link, index) in props.item.documents"
                        :key="index"
                      >
                        <li><a class="link" :href="link" >{{link}}</a></li>    
                      </ul>
                      
                    </li>

                  </ul>
                </div>
              </template>

              <template #step-6>
                <div class="products-card__container">
                  <ul class="products-card__items">
                    <DefaultCardData 
                      :header="productsHeaders" 
                      :itemElem="props.item"
                    />
                  </ul>
                </div>
              </template>
              
            </StatusCard>
          </v-flex>
        </template>
        
      </v-data-iterator>

      <AnimationAjax/>
    </div>

  </v-container>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import StatusCard from "@/components/sub-components/default/StatusCard";
import LinksContainer from "@/components/sub-components/default/LinksContainer";
import DefaultCardData from "@/components/sub-components/default/DefaultCardData";
import AnimationAjax from "@/components/sub-components/AnimationAjax";
import Range from "@/components/sub-components/SliderInput"
export default {
  name: "AdminCards",

  components: { 
    StatusCard, 
    AnimationAjax,
    LinksContainer,
    DefaultCardData,
    Range
  },

  data() {
    return {
      selected: [],
      ajaxStatusCards: false,
      isOpenModel: false,
      selected: [],
      keywords: [],
      index: null,
      rangeParser: null,
      pagination: {
        rowsPerPage: 4
      },
    };
  },

  computed: {
    ...mapState({
      productsBody: state => state.productsAdmin.productsBody,
      productsHeaders: state => state.productsAdmin.productsHeaders
    }),
    pages () {
        if (this.pagination.rowsPerPage == null ||
          this.productsBody.length == null
        ) return 0

        return Math.ceil(this.productsBody.length / this.pagination.rowsPerPage)
      },
    activePage(){
      // return 
    }
    
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
      this.ajaxStatusCards = true;
      axios
        .put(`/admin/products/${item.id}`, {
          status: "SCRIPT_WORKING",
          keywords: item.keywords,
          ownerId: item.ownerId,
          linksCount: item.linksCount,
        })
        .then(response => {
          this.$store.dispatch("productsAdmin/updateProduct", {
            product: response.data,
            index
          });
          this.ajaxStatusCards = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    rejected(item, index) {
      this.ajaxStatusCards = true;
      axios
        .put(`/admin/products/${item.id}`, {
          status: "REJECTED",
          ownerId: item.ownerId
        })
        .then(response => {
          this.$store.dispatch("productsAdmin/updateProduct", {
            product: response.data,
            index
          });
          this.ajaxStatusCards = false;

        })
        .catch(function(error) {
          console.log(error);
        });
    },

    sendLinks(item, index) {
      this.ajaxStatusCards = true;

      axios
        .put(`/admin/products/${item.id}`, {
          status: "WAITING_FOR_PAYMENT",
          links: this.productsBody[index].links,
          ownerId: item.ownerId
        })
        .then(response => {
          this.$store.dispatch("productsAdmin/updateProduct", {
            product: response.data,
            index
          });
          this.ajaxStatusCards = false;

          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>