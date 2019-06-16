export default {
  setProducts(state, products){
    state.productsBody = products;
  },
  setCartProducts(state, products){
    state.approved = products;
  },


  addProductsItem(state, product){
    state.productsBody.unshift(product);
  },
  
  deleteProductsItem(state, index){
    state.productsBody.splice(index, 1);
  },
};
