<template>
  <div class="chat">
    <v-card class="card--flex-toolbar">
      <v-toolbar card prominent>
        <v-btn icon>
          <v-icon  @click="$emit('back')">arrow_back</v-icon>
        </v-btn>
        
        <v-spacer></v-spacer>

        <v-toolbar-title class="body-2 grey--text">Служба підтримки</v-toolbar-title>
      </v-toolbar>

      <v-divider></v-divider>

      <v-card-text 
        class="chat__main" 
        style="height: 200px;"
      >
        <div class="message__box">
          <div 
            v-for="(message, index) in messages"
            :key="index"
            :class="['message__item', {
              'message__user' : message.sender === 'USER', 
              'message__admin' : message.sender === 'ADMIN' 
            }]"
          >
            <span class="text">
            {{message.text}}
            </span>
          </div>

        </div>
        
      </v-card-text>
        <v-card-actions class="chat__footer">
          <TextInput
          placeholder="Ваше повідомлення ..."
          :value="textareaText"
          @onInput="writeText($event)"
        />
        <v-btn 
          flat 
          icon
          color="primary" 
          :disabled="textareaText.length === 0"
          @click="sendMessage"
        >
          <v-icon>send</v-icon>
        </v-btn>
        </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import TextInput from "@/components/sub-components/TextInput";


  export default {
    name: 'Message',

    props:{
      messages:{
        type: Array
      },
      id:{
        type: String
      },
      url:{
        type: String
      }
    },

    components: {
      TextInput
    },

    data(){
      return {
        textareaText: ''
      }
    },

    methods:{
      sendMessage(){
        axios
        .post(this.url, {
          'text': this.textareaText
        })
        .then(response => {
          let sender = 'USER'
          if(this.url.includes('admin')){
            console.log(123);
            sender = 'ADMIN'
          }

          this.$emit('add-message', {
            text: this.textareaText,
            sender 
          });
          this.textareaText = '';

        })
        .catch(error => {
          console.log(error);
        });
      },
      writeText(text){
        this.textareaText = text;
        
      }
    },
  }
</script>