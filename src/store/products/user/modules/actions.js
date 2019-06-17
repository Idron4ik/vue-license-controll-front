import axios from "axios";

export default {
  setProducts({commit}, products){
    console.log(products);
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

  setCartProducts({commit}, products){
    let productsResult = products.map((item)=>{
      let {
        title,
        links,
        _id: id
      } = item;

        return {
          title,
          links,
          id
        };
    });
    commit('setCartProducts', productsResult);
  },




  addProductsItem({commit}, product){
    axios
      .post(`/products`, 
      {
        title: product.title,
        description: product.description
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
      .delete(`/products/${id}`)
      .then(response => {
        //Add refresh page
        commit('deleteProductsItem', index);
      })
      .catch(function(error) {
        console.log(error);
      });
  },
};
