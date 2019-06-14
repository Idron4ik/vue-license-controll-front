<template>
  <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
    <v-text-field 
      :label="label" 
      @click='pickFile' 
      v-model='imageName'
      :rules="rules"
      prepend-icon='attach_file'
    />
    <input
      type="file"
      style="display: none"
      ref="image"
      @change="onFilePicked"
    >
  </v-flex>
</template>

<script>
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
        title: "Image Upload",
        imageName: '',
    		imageUrl: '',
		    imageFile: ''
      }
    },

    methods: {
      pickFile () {
          this.$refs.image.click ()
      },
		
      onFilePicked (e) {
        const files = e.target.files
        if(files[0] !== undefined) {
          this.imageName = files[0].name
          if(this.imageName.lastIndexOf('.') <= 0) {
            return
          }
          const fr = new FileReader ()
          fr.readAsDataURL(files[0])
          fr.addEventListener('load', () => {
            this.imageUrl = fr.result
            this.imageFile = files[0]
            this.$emit('file', files[0])
          })
        } else {
          this.imageName = ''
          this.imageFile = ''
          this.imageUrl = ''
        }
      }
    }

    
  }
</script>

<style lang="scss" scoped>

</style>