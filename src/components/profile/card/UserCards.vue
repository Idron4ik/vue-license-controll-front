<template>
  <div class="table">
      <v-dialog v-model="dialog" max-width="500px" class="dashboard__modal">
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="editedItem.title" label="Заголовок"/>
                </v-flex>
                <v-flex xs12>
                  <v-textarea v-model="editedItem.description" label="Опис"/>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Відмінити</v-btn>
            <v-btn color="primary" @click="save">Відправити</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    <div 
      class="dashboard-step"
      v-if="productsBody.length && loadedproducts"
    >
      <v-toolbar flat light>
        <v-toolbar-title>Ваші продукти</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="primary" class="mb-2" @click="dialog = true"> 
          <v-icon color="white">add</v-icon>Створити новий продукт
        </v-btn>
      </v-toolbar>

      <!-- Start Mobile -->
      <ActionsCards 
        :productsBody="productsBody" 
        :productsHeaders="productsHeaders"
      />
      <!-- End Mobile -->
    </div>
    <div v-else class="dashboard-products no_products"> 
      <div class="label">Ви ще не створили свій продукт</div>
      <br>
      <v-btn color="primary" class="mb-2" @click="dialog = true"> 
        <v-icon color="white">add</v-icon>Створити продукт</v-btn>
      </div> 

  </div>
</template>

<script>
import { mapState } from "vuex";
import ActionsCards from "./additional/ActionsCards";
export default {
  name: "UserCard",

  components: {
    ActionsCards
  },

  props:{
    loadedproducts:{
      type: Boolean,
      default: false,
    }
  },

  data() {
    return {
      dialog: false,
      isMobile: false,
      editedIndex: true,
      editedItem: {
        title: "",
        description: ""
      }
    };
  },

  computed: {
    ...mapState({
      productsBody: state => state.products.productsBody,
      productsHeaders: state => state.products.productsHeaders
    }),
    formTitle() {
      return this.editedIndex ? "Додати свій продукт" : "Редагувати продукт";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      this.$store.dispatch("products/addProductsItem", this.editedItem);
      this.close();
    }
  },
};
</script>
