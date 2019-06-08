import axios from "axios";

export default {
  namespaced: true,
  state: {
    productsHeaders: [
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
    productsBody: []
   },

   getters:{},

   mutations: {
    setProducts(state, products){
      state.productsBody = products;
    }
   },

   actions:{
    setProducts({commit}, products){
      console.log(products);
      let productsResult = products.map((item)=>{
        let {
          description,
          title,
          status,
          ownerId,
          _id: id,
          keywords
        } = item;
  
          return {
            description,
            title,
            status,
            ownerId,
            id,
            keywords
          };
      });

      commit('setProducts', productsResult);

    },

   }
};