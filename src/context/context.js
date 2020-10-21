import React from 'react';

export default React.createContext({
  user: [],
  cart: [],
  cartError: false,
  merch: [],
  filterList: [],
  isUserAuthenticated: false,
  getUser: _ => {},
  handleCart : (prod) => {},
  changeItemQuantity: (q, el) => {},
  handleFilterList: (id) => {},
  getMerch : _ => {}
});