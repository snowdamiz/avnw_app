import React from 'react';

export default React.createContext({
  user: [],
  photographers: [],
  curPhotographer: null,
  curGallery: [],
  cart: [],
  shootLocation: [],
  cartError: false,
  merch: [],
  services: [],
  filterList: [],
  isUserAuthenticated: false,
  getUser: _ => {},
  handleCart : (prod) => {},
  handleShootLocation: (el) => {},
  changeItemQuantity: (q, el) => {},
  handleFilterList: (id) => {},
  getMerch : _ => {},
  setCurPhotographer: (el) => {},
  setCurGallery: (el) => {},
});