import axios from "axios";

export default {
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
};
