<template>
  <div class="table">
    <!-- Start Mobile -->
    <div class="table__mobile">
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
                  <v-list-tile v-for="(item, index) in productsHeaders" :key="index">
                    <v-list-tile-content>{{item.text}}:</v-list-tile-content>

                    <template v-if="item.text.toLowerCase() === 'status' ">
                      <v-list-tile-content class="align-end">
                        <v-chip
                          :color="props.item.status.toLowerCase() === 'pending' ? 'grey' : (props.item.status.toLowerCase() === 'approved') ? 'green' : 'red'"
                          :text-color="props.item.status.toLowerCase() === 'pending' ? 'black' : 'white'"
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
                    >
                      <v-icon small @click="deleteItem(props.item, props.index)">delete</v-icon>
                    </v-list-tile-content>
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
import Script from './ScriptTable'

export default {
  name: "tableMobile",

  extends: Script,

  data() {
    return {
      isMobile: false,
      editedIndex: true,
      defaultItem: {
        title: "",
        description: "",
        status: "pending"
      }
    };
  },
};
</script>
