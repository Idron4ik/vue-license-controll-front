export const products = {
  state: {
    productsHeaders: [
      {
        text: "Title",
        align: "left",
        value: "title",
        sortable: false
      },
      { text: "Description", value: "description", sortable: false },
      { text: "Status", value: "status" },
      { text: "Actions", value: "name", sortable: false },
    ],
    productsBody: [
      {
        title: "Frozen Yogurt",
        description: 'Lorem ipsum dolor',
        status: 'approved'

      },
      {
        title: "Ice cream sandwich",
        description: 'Lorem ipsum dolor',
        status: 'pending'
      },
      {
        title: "Eclair",
        description: 'Lorem ipsum dolor',
        status: 'rejected'
      },
      {
        title: "Cupcake",
        description: 'Lorem ipsum dolor',
        status: 'pending'
      },
      {
        title: "Gingerbread",
        description: 'Lorem ipsum dolor',
        status: 'pending'
      },
      {
        title: "Jelly bean",
        description: 'Lorem ipsum dolor',
        status: 'pending'
      },
      {
        title: "Lollipop",
        description: 'Lorem ipsum dolor',
        status: 'pending'

      },
      {
        title: "Honeycomb",
        description: 'Lorem ipsum dolor',
        status: 'pending'

      },
      {
        title: "Donut",
        description: 'Lorem ipsum dolor',
        status: 'pending'
      },
      {
        title: "KitKat",
        description: 'Lorem ipsum dolor',
        status: 'rejected'
      }
    ]
   },

   getters:{},

   mutations: {
    addProductsItem(state, product){
      state.productsBody.unshift(product);
    },
    deleteProductsItem(state, index){
      state.productsBody.splice(index, 1);
    },
   },

   actions:{
    addProductsItem({state, commit}, product){
      let productData = {
        ...product,
        status: 'pending'
      }
      commit('addProductsItem', productData);
    },
    deleteProductsItem({state, commit}, index){
      commit('deleteProductsItem', index);
    },
    
   }
};