import React from 'react';

export default React.createContext({
  cart: [],
  merch: [],
  filterList: [],
  isUserAuthenticated: false,
  handleCart : (prod) => {},
  changeItemQuantity: (q, el) => {},
  handleFilterList: (id) => {},
  getMerch : _ => {}
});