import React from 'react';

export default React.createContext({
  cart: [],
  merch: [],
  filterList: [],
  isUserAuthenticated: false,
  handleCart : (id) => {},
  handleFilterList: (id) => {},
  getMerch : _ => {}
});