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
      { text: "Keywords", value: "keywords", sortable: false },
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
          keywords,
          links
        } = item;
  
          return {
            description,
            title,
            status,
            ownerId,
            id,
            keywords,
            links
          };
      });

      commit('setProducts', productsResult);

    },

    updateProduct({commit}, product){
      console.log(product);
    }

   }
};