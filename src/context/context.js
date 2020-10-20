import React from 'react';

export default React.createContext({
  cart: [],
  merch: [],
  filterList: [],
  isUserAuthenticated: false,
  handleCart : (prod) => {},
  handleFilterList: (id) => {},
  getMerch : _ => {}
});