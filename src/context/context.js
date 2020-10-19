import React from 'react';

export default React.createContext({
  cart: [],
  merch: [],
  handleCart : (id) => {},
  getMerch : _ => {}
});