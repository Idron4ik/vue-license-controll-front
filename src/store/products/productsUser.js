import axios from "axios";

export const products = {
  namespaced: true,

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
        status: 'approved',
        id: 1,
      },
      {
        title: "Ice cream sandwich",
        description: 'Lorem ipsum dolor',
        status: 'pending',
        id: 1,
      },
      {
        title: "Eclair",
        description: 'Lorem ipsum dolor',
        status: 'rejected',
        id: 1,
      },
      {
        title: "Cupcake",
        description: 'Lorem ipsum dolor',
        status: 'pending',
        id: 1,
      },
      {
        title: "Gingerbread",
        description: 'Lorem ipsum dolor',
        status: 'pending',
        id: 1,
      },
      {
        title: "Jelly bean",
        description: 'Lorem ipsum dolor',
        status: 'pending',
        id: 1,
      },
      {
        title: "Lollipop",
        description: 'Lorem ipsum dolor',
        status: 'pending',
        id: 1,

      },
      {
        title: "Honeycomb",
        description: 'Lorem ipsum dolor',
        status: 'pending',
        id: 1,

      },
      {
        title: "Donut",
        description: 'Lorem ipsum dolor',
        status: 'pending',
        id: 1,
      },
      {
        title: "KitKat",
        description: 'Lorem ipsum dolor',
        status: 'rejected',
        id: 1,
      }
    ]
   },

   getters:{},

   mutations: {
    setProducts(state, products){
      state.productsBody = products;
    },

    addProductsItem(state, product){
      state.productsBody.unshift(product);
    },
    
    deleteProductsItem(state, index){
      state.productsBody.splice(index, 1);
    },
   },

   actions:{

    setProducts({commit}, products){
      let productsResult = products.map((item)=>{
        let {
          description,
          title,
          status,
          _id: id
        } = item;
  
          return {
            description,
            title,
            status,
            id
          };
      });

      commit('setProducts', productsResult);

    },



    addProductsItem({commit}, product){
      axios
        .post(`/products`, 
        {
          title: product.title,
          description: product.description
        },
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem('jwt')}`
          }
        })
        .then(response => {
            //Add refresh page
          commit('addProductsItem', response.data);
          
        })
        .catch(function(error) {
          console.log(error);
        });

    },


    deleteProductsItem({state, commit}, {id, index}){
      axios
        .delete(`/products/${id}`, 
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem('jwt')}`
          }
        })
        .then(response => {
          //Add refresh page
          commit('deleteProductsItem', index);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    
   }
};