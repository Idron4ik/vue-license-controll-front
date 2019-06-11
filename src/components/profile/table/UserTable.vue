<template>
  <div class="table">
    <v-toolbar flat dark>
        <v-toolbar-title>Your products</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px" dark>
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Add new Product</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.title" label="Title"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.description" label="Description"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>

    <!-- Start Desktop -->
    <div class="table__desktop" v-if="!isMobile">
      <TableDesktop :productsBody="productsBody" :productsHeaders="productsHeaders"></TableDesktop>
    </div>
    <!-- End Desktop -->

    <!-- Start Mobile -->
    <div class="table__mobile" v-else>
      <TableMobile :productsBody="productsBody" :productsHeaders="productsHeaders"></TableMobile>
    </div>
    <!-- End Mobile -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import TableMobile from './additional/TableMobile'
import TableDesktop from './additional/TableDesktop'
export default {
  name: "AbstructTable",

  components: {
    TableMobile,
    TableDesktop
  },
  data() {
    return {
      dialog: false,
      isMobile: false,
      editedIndex: true,
      editedItem: {
        title: "",
        description: ""
      },
    }
  },

  computed: {
    ...mapState({
      productsBody: state => state.products.productsBody,
      productsHeaders: state => state.products.productsHeaders
    }),
    formTitle() {
      return this.editedIndex ? "Add new product" : "Edit new product";
    },
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

  
  mounted() {
    this.isMobile = window.screen.width < 960;
  }
};
</script>
