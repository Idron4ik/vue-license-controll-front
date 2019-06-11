<template>
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
        <td class>
          <v-chip label v-for="(label, index) in props.item.keywords" :key="index">{{label}}</v-chip>
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
            <v-chip :selected="data.selected" close @input="remove(props.item.keywords, data.item)">
              <strong>{{ data.item }}</strong>&nbsp;
            </v-chip>
          </template>
        </v-combobox>
      </v-flex>
    </template>
  </v-data-table>
</template>

<script>
import Script from './ScriptTable'

export default {
  name: "adminTableDesktop",

  extends: Script,

   data() {
    return {
      selected: [],
    };
  },
};
</script>