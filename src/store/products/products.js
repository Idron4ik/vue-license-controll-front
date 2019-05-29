export const products = {
  state: {
    productsHeaders: [
      {
        text: "Title",
        align: "left",
        sortable: false,
        value: "title"
      },
      { text: "Description", value: "description" },
      { text: "Actions", value: "name", sortable: false }
    ],
    productsBody: [
      {
        title: "Frozen Yogurt",
        description: 'Lorem ipsum dolor',

      },
      {
        title: "Ice cream sandwich",
        description: 'Lorem ipsum dolor',

      },
      {
        title: "Eclair",
        description: 'Lorem ipsum dolor',

      },
      {
        title: "Cupcake",
        description: 'Lorem ipsum dolor',

      },
      {
        title: "Gingerbread",
        description: 'Lorem ipsum dolor',

      },
      {
        title: "Jelly bean",
        description: 'Lorem ipsum dolor',

      },
      {
        title: "Lollipop",
        description: 'Lorem ipsum dolor',

      },
      {
        title: "Honeycomb",
        description: 'Lorem ipsum dolor',

      },
      {
        title: "Donut",
        description: 'Lorem ipsum dolor',
      },
      {
        title: "KitKat",
        description: 'Lorem ipsum dolor',
      }
    ]
   },

   getters:{},

   mutations: {
    addProductsItem(state, product){
      state.productsBody.push(product);
    },
    deleteProductsItem({state, commit}, index){
      state.productsBody.splice(index, 1);
    },
   },

   actions:{
    addProductsItem({state, commit}, product){
      commit('addProductsItem', product);
    },
    deleteProductsItem({state, commit}, index){
      commit('addProductsItem', index);
    },
    
   }
};