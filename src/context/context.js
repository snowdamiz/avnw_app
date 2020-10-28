import React from 'react';

export default React.createContext({
  user: [],
  photographers: [],
  curPhotographer: null,
  curGallery: [],
  cart: [],
  cartError: false,
  merch: [],
  filterList: [],
  isUserAuthenticated: false,
  getUser: _ => {},
  handleCart : (prod) => {},
  changeItemQuantity: (q, el) => {},
  handleFilterList: (id) => {},
  getMerch : _ => {},
  setCurPhotographer: (el) => {},
  setCurGallery: (el) => {},
});