<template>
  <div>
    <div class="text-xs-center">

    </div>
    <div class="table__desktop" v-if="!isMobile">
      <v-toolbar flat color="white">
        <v-toolbar-title>Product list</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-data-table
        :headers="productsHeaders"
        :items="productsBody"
        item-key="id"
        v-model="selected"
        select-all
      >
        <template v-slot:items="props">
          <tr>
            <td>
              <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
            </td>
            <td>{{ props.item.title }}</td>
            <td class>{{ props.item.description }}</td>
            <td class >
                <v-chip label v-for="(label, index) in props.item.keywords" :key="index">
                  {{label}}
                </v-chip>
            </td>
            <td class>
              <v-btn color="success" @click="approve(props.item)">aзprove</v-btn>
              <v-btn color="error" @click="rejected(props.item)">rejected</v-btn>
              <v-btn color="info" @click="props.expanded = !props.expanded">Add keyword</v-btn>
            </td>
          </tr>
        </template>
        <template v-slot:expand="props">
        <v-flex xs12>
          <v-combobox
            v-model="props.item.keywords"
            label="Your favorite hobbies"
            chips
            clearable
            solo
            multiple
          >
            <template v-slot:selection="data">
              <v-chip
                :selected="data.selected"
                close
                @input="remove(props.item.keywords, data.item)"
              >
                <strong>{{ data.item }}</strong>&nbsp;
              </v-chip>
            </template>
          </v-combobox>
        </v-flex>
  
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
                  <v-list-tile v-for="(item, index) in productsHeaders" :key="index" >

                    <v-list-tile-content>{{item.text}}:</v-list-tile-content>

                    <template v-if="item.text.toLowerCase() === 'status' ">
                      {{props.item}}
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
                    >
                    {{ props.item[item.text.toLowerCase()] }}
                    </v-list-tile-content>
                    
                    <v-list-tile-content
                      v-if="item.text.toLowerCase() === 'actions'"
                      class="align-end"
                    >
                      <v-btn color="success" @click="approve(props.item)">aзprove</v-btn>
                      <v-btn color="error" @click="rejected(props.item)">rejected</v-btn>
                      <!-- <v-btn color="info">Add keyword</v-btn> -->
                      <v-bottom-sheet>
                        <template v-slot:activator>
                          <v-btn color="purple" dark>Click me</v-btn>
                        </template>
                          <v-combobox
                            v-model="props.item.keywords"
                            label="Your favorite hobbies"
                            chips
                            clearable
                            solo
                            multiple
                          >
                            <template v-slot:selection="data">
                              <v-chip
                                :selected="data.selected"
                                close
                                @input="remove(props.item.keywords, data.item)"
                              >
                                <strong>{{ data.item }}</strong>&nbsp;
                              </v-chip>
                            </template>
                          </v-combobox>
                      </v-bottom-sheet>

                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
          </template>
        </v-data-iterator>
      </v-container>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "profileIndexAdmin",

  data() {
    return {
      isMobile: false,
      selected: [],
      expand: false,
    };
  },

  computed: {
    ...mapState({
      productsBody: state => state.productsAdmin.productsBody,
      productsHeaders: state => state.productsAdmin.productsHeaders
    })
  },

  methods: {
    remove(keywords, word) {
      keywords.splice(keywords.indexOf(word), 1);
    },

    approve(item) {
      axios
        .put(`/admin/products/${item.id}`,{
          status: 'APPROVED',
          keywords: item.keywords
        }, {
          headers: {
            Authorization: `JWT ${localStorage.getItem("jwt")}`
          }
        })
        .then(response => {
            console.log(123);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    rejected(item) {
      axios
        .put(`/admin/products/${item.id}`,{
          status: 'REJECTED',
        }, {
          headers: {
            Authorization: `JWT ${localStorage.getItem("jwt")}`
          }
        })
        .then(response => {
            console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted() {
    this.isMobile = window.screen.width < 900;

    axios
      .get(`/admin/products`, {
        headers: {
          Authorization: `JWT ${localStorage.getItem("jwt")}`
        }
      })
      .then(response => {
        //Add refresh page
        this.$store.dispatch("productsAdmin/setProducts", response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>

<style lang="scss" scoped>
</style>