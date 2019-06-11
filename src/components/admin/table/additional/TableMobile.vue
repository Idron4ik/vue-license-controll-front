<template>
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
                >{{ props.item[item.text.toLowerCase()] }}</v-list-tile-content>

                <v-list-tile-content v-if="item.text.toLowerCase() === 'actions'" class="align-end">
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
</template>

<script>
import Script from './ScriptTable'
export default {
  name: "adminTableMobile",
  
  extends: Script,

  data() {
    return {
      selected: [],
    };
  },
  
};
</script>