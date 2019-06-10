<template>
  <div>
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
    <div class="table__desktop" v-if="!isMobile">
      <v-data-table
        dark
        :headers="productsHeaders"
        :items="productsBody"
        class="elevation-1"
        v-model="selected"
        select-all
        item-key="id"
      >
        <template v-slot:items="props">
          <td>
            <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
          </td>
          <td>{{ props.item.title }}</td>
          <td class>{{ props.item.description }}</td>
          <td class>
            <v-chip
              :color="props.item.status.toLowerCase() === 'pending' ? 'grey' : (props.item.status.toLowerCase() === 'approved') ? 'green' : 'red'"
              :text-color="props.item.status.toLowerCase() === 'pending' ? 'black' : 'white'"
            >{{ props.item.status }}</v-chip>
          </td>
          <td class>
            <!-- <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon> -->
            <v-icon small @click="deleteItem(props.item)">delete</v-icon>
          </td>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
    </div>
    <div class="table__mobile" v-else>
      <!-- Start Mobile -->
      <!-- :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"-->
      <v-container fluid grid-list-md>
        <v-data-iterator content-tag="v-layout" :items="productsBody" row wrap>
          <template v-slot:item="props">
            <v-flex xs12 sm6 md4 lg3>
              <v-card>
                <v-card-title>
                  <h4>Your product</h4>
                </v-card-title>
                <v-divider></v-divider>
                <v-list dense>
                  <!-- {{productsForMobile}} -->
                  <v-list-tile v-for="(item, index) in productsHeaders" :key="index">
                    <v-list-tile-content>{{item.text}}:</v-list-tile-content>
                    <template v-if="item.text.toLowerCase() === 'status' ">
                      <v-list-tile-content class="align-end">
                        <v-chip
                          :color="props.item[item.text.toLowerCase()] === 'pending' ? 'grey' : (props.item[item.text.toLowerCase()] === 'approved') ? 'green' : 'red'"
                          :text-color="props.item[item.text.toLowerCase()] === 'pending' ? 'black' : 'white'"
                        >{{ props.item.status }}</v-chip>
                      </v-list-tile-content>
                    </template>
                    <v-list-tile-content
                      v-if="item.text.toLowerCase() !== 'status' && item.text.toLowerCase() !== 'actions'"
                      class="align-end"
                    >{{ props.item[item.text.toLowerCase()] }}</v-list-tile-content>
                    <v-list-tile-content
                      v-if="item.text.toLowerCase() === 'actions'"
                      class="align-end"
                    >delete</v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
          </template>
        </v-data-iterator>
      </v-container>
    </div>
    <!-- End Mobile -->
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "Table",
  data() {
    return {
      isMobile: false,
      selected: [],
      dialog: false,
      editedIndex: true,
      editedItem: {
        title: "",
        description: ""
      },
      defaultItem: {
        title: "",
        description: "",
        status: "pending"
      }
    };
  },

  computed: {
    ...mapState({
      productsBody: state => state.products.productsBody,
      productsHeaders: state => state.products.productsHeaders
    }),
    formTitle() {
      return this.editedIndex ? "Add new product" : "Edit new product";
    },

    productsForMobile() {
      console.log(this.productsHeaders);
      console.log(this.productsBody);
      return;
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    editItem(item) {
      this.editedIndex = false;
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      if (confirm("Are you sure you want to delete this item?")) {
        this.$store.dispatch("products/deleteProductsItem", item.id);
      }
    },

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
    this.isMobile = window.screen.width < 900;
  }
};
</script>
