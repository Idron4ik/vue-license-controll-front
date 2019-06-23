import Vue from 'vue';
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
      { text: "Status", value: "status" },
      { text: "Actions", value: "actions" },
    ],
    productsBody: []
   },

   getters:{},

   mutations: {
    setProducts(state, products){
      state.productsBody = products;
    },
    updateProduct(state, {product, index}){
      let obj = {...state.productsBody[index], ...product,}
      Vue.set(state.productsBody, index, obj)
    }
   },

   actions:{
    setProducts({commit}, products){
      let productsResult = products.map((item, index)=>{
        let {
          description,
          title,
          status,
          ownerId,
          _id: id,
          keywords,
          links,
          documents
        } = item;
  
          return {
            description,
            title,
            status,
            ownerId,
            id,
            keywords,
            links,
            index,
            documents,
            linksCount: 5
          };
      });

      commit('setProducts', productsResult);

    },

    updateProduct({commit}, product){
      commit('updateProduct', product);
    }

   }
};