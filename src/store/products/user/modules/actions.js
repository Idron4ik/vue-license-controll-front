import axios from "axios";

export default {
  setProducts({commit}, products){
    let productsResult = products.map((item, index)=>{
      let {
        description,
        title,
        status,
        links,
        _id: id,
        price
      } = item;

        return {
          description,
          title,
          status,
          links,
          id,
          index,
          price
        };
    });

    commit('setProducts', productsResult);
  },

  setCartProducts({commit}, products){
    let productsResult = products.map((item, index)=>{
      let {
        title,
        links,
        _id: id,
        price
      } = item;

        return {
          title,
          links,
          id,
          index,
          price
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


  deleteProductsItem({state, commit}, index){
    commit('deleteProductsItem', index);
  },
};
