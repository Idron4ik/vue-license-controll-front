<template>
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
          <v-icon small @click="deleteItem(props.item, props.index)">delete</v-icon>
        </td>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import Script from './ScriptTable'

export default {
  name: "TableDesktop",
  extends: Script,
 
  data() {
    return {
      isMobile: false,
      selected: [],
      editedIndex: true,
      defaultItem: {
        title: "",
        description: "",
        status: "pending"
      }
    };
  }
};
</script>