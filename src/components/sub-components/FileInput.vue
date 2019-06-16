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
import { setTimeout } from 'timers';
  export default {
    name: 'fileInput',

    props:{
      label:{
        type: String,
        default: 'Select File'
      },
      rules:{
        type: Array,

      }
    },

    data(){
      return {
        file: '',
        name: ''
      }
    },

    methods: {
      pickFile(){
        this.$refs.file.click ()
      },
      
      handleFileUpload(e){
        // this.file = this.$refs.file.files;
        const files = e.target.files

        let fr = new FileReader ();
        
        fr.readAsDataURL(files[0])
        
        fr.addEventListener('load', () => {
          this.name = files[0].name;

          // console.log(fr.result);
          
          // console.log(files[0]);
          // this.imageFile =  // this is an image file that can be sent to server...
          let fd = new FormData();
            fd.append('file', files[0]);
            console.log(fd);
          // this.$emit('file', {file: this.file});
        }) 
       
      },

        
    }

    
  }
</script>

<style lang="scss" scoped>

</style>