<template>
  <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
      <v-text-field 
        :label="label" 
        @click='pickFile' 
        v-model='name'
        :rules="rules"
        prepend-icon='attach_file'
      />
       <input type="file" style="display: none" ref="file" @change="handleFileUpload($event)"/>
  </v-flex>
</template>

<script>
import axios from "axios";

export default {
  name: "fileInput",

  props: {
    label: {
      type: String,
      default: "Select File"
    },
    rules: {
      type: Array
    }
  },

  data() {
    return {
      file: "",
      name: "",
    };
  },

  methods: {
    pickFile() {
      this.$refs.file.click();
    },

    handleFileUpload(e) {
      // this.file = this.$refs.file.files;
      const files = e.target.files;

      let fr = new FileReader();

      fr.readAsDataURL(files[0]);

      fr.addEventListener("load", () => {
        this.name = files[0].name;
        this.$emit("file", { result: fr.result, file: files[0] });
      });
    }
  }
};
</script>