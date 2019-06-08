<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Product list</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-data-table :headers="headers" :items="desserts" item-key="title"  v-model="selected" select-all>
      <template v-slot:items="props">
        <tr >
          <td>
            <v-checkbox
              v-model="props.selected"
              primary
              hide-details
            ></v-checkbox>
          </td>
          <td>{{ props.item.title }}</td>
          <td class="">{{ props.item.description }}</td>
          <td class="" >{{keywordItems}}</td>
          <td class=""> 
            <v-btn color="success">aзprove</v-btn>
            <v-btn color="error">rejected</v-btn>
            <v-btn color="info" @click="props.expanded = !props.expanded" >Open keyword</v-btn>
          </td>
          <!-- <td class="text-xs-right">{{ props.item.protein }}</td> -->
          <!-- <td @click="props.expanded = !props.expanded" class="text-xs-right">{{ props.item.open }}</td> -->
        </tr>
      </template>
      <template v-slot:expand="props">
        <v-flex xs12>
          <v-combobox
            v-model="keywordItems"
            label="Your favorite hobbies"
            append-icon="save"
            solo
            multiple
          >
            <template v-slot:selection="data">
              <v-chip :selected="data.selected" close @input="remove(data.item)">
                <strong>{{ data.item }}</strong>&nbsp;
              </v-chip>
            </template>
          </v-combobox>

           <v-btn color="info" @click="saveKeywords">Save</v-btn>
        </v-flex>
      </template>
    </v-data-table>


    <v-container fluid grid-list-md>
    <v-data-iterator
      :items="desserts"
      row
      wrap
    >
      <template v-slot:item="props">
        <v-flex
          xs12
          sm6
          md4
          lg3
        >
          <v-card>
            <v-card-title><h4>Table</h4></v-card-title>
            <v-divider></v-divider>
            <v-list dense>
              <v-list-tile>
                <v-list-tile-content>Description:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.description }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Title:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.title }}</v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </template>
    </v-data-iterator>
  </v-container>

    
  </div>
</template>
<script>
export default {
  name: "profileIndexAdmin",

  data() {
    return {
      selected: [],
      expand: false,
      headers: [
        {
          text: "Title",
          align: "left",
          sortable: false,
          value: "title"
        },
        { text: "Description", value: "description" },
        { text: "Keyword", value: "keyword", sortable: false },
        { text: "Actions", value: "actions" },
      ],
      desserts: [
        {
          title: "Ice cream sandwich",
          description: 'Lorem upsum dolor.',
          keyword: "",
          status: 'approve'
        },
        {
          title: "Eclair",
          description: 'Lorem upsum dolor.',
          keyword: "",
          status: 'approve'
        },
        {
          title: "Cupcake",
          description: 'Lorem upsum dolor.',
          keyword: "",
          status: 'approve'
        },
        {
          title: "Gingerbread",
          description: 'Lorem upsum dolor.',
          keyword: "",
          status: 'approve'
        },
        {
          name: "Jelly bean",
          description: 'Lorem upsum dolor.',
          keyword: "",
          status: 'approve'
        },
        {
          title: "Lollipop",
          description: 'Lorem upsum dolor.',
          keyword: "",
          status: 'approve'
        },
        {
          title: "Honeycomb",
          description: 'Lorem upsum dolor.',
          keyword: "",
          status: 'approve'
        },
        {
          title: "Donut",
          description: 'Lorem upsum dolor.',
          keyword: "",
          status: 'approve'
        },
        {
          title: "KitKat",
          description: 'Lorem upsum dolor.',
          keyword: "",
          status: 'approve'
        }
      ],
      keywordItems: [],

    };
  },
  methods: {
      remove (item) {
        this.keywordItems.splice(this.keywordItems.indexOf(item), 1)
        this.keywordItems = [...this.keywordItems]
      },
      saveKeywords(){
        console.log(this.keywordItems);
      }
    }
};
</script>

<style lang="scss" scoped>
</style>