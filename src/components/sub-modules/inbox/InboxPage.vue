<template>
    <div :class="['inbox__container', {'vue-loading': loading}]">

      <v-card>
        <v-list
          three-line
          v-if="activeMessageBox"
        >
          <template v-for="(item, index) in items">
            <v-list-tile
              :key="item._id"
              avatar
              @click="messageClick(item._id)"
            >
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.description"></v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-icon :color="true ? 'main' : 'grey'">chat_bubble</v-icon>
              </v-list-tile-action>
            </v-list-tile>
              <v-divider/>

          </template>
        </v-list>
        <Message 
          v-else
          :id="id"
          :messages="messages"
          :url="`/${url}/${this.id}/messages`"
          @back="activeMessageBox = true"
          @add-message="messages.push($event);"
        />

      </v-card>

      <AnimationAjax/>
    </div>
</template>

<script>
  import axios from "axios";
  import Message from './Message'
  import AnimationAjax from "@/components/sub-components/AnimationAjax";

  export default {
    name: 'InboxPage',
    
    components: {
      Message,
      AnimationAjax
    },

    props:{
      items: {
        type: Array
      },
      url:{
        type: String
      },
      loading:{
        type: Boolean,
        default: false
      }
    },

    data(){
      return {
        activeMessageBox: true,
        id: null,
        messages: []
      }
    },

    methods:{
      messageClick(id){
        console.log(id);
        axios
        .get(`/products/${id}/messages`)
        .then(response => {
          this.messages = response.data;
          this.id = id;
          this.activeMessageBox = false
        })
        .catch(error => {
          console.log(error);
        });
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>