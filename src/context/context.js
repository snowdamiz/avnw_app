import React from 'react';

export default React.createContext({
  cart: [],
  merch: [],
  isUserAuthenticated: false,
  handleCart : (id) => {},
  getMerch : _ => {}
});