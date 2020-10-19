import React from 'react';
import Context from './context';
import { merch, user } from '../../dummydb.js';

export default class GlobalState extends React.Component{
  state = {
    cart: [],
    merch: [],
    filterList: [],
    isUserAuthenticated: false,
  }

  componentDidMount() {
    let getMerchCategories = [];
    let getMerch = merch;
    this.setState({ merch: getMerch });

    for (let i = 0; i < getMerch.length; i++) {
      getMerchCategories.push(getMerch[i].category);
    }

    this.setState({ filterList: getMerchCategories });
  };
 
  handleCart = (id) => {
    let cart = this.state.cart;
    let cartLength = this.state.cart.length;
    let isAlreadyInCart = false;

    if(cartLength > 0) {
      for (let i = 0; i < cartLength; i++) {
        if (cart[i] === id) {
          isAlreadyInCart = true;
          break;
        }
      }

      if (isAlreadyInCart) {
        let removeItemCart = [...cart];
        removeItemCart.splice(cart.indexOf(id), 1);
        this.setState({ cart: removeItemCart });
      } else {
        let newItemCart = [...cart, id];
        this.setState({ cart: newItemCart });
      }
    } else {
      let updatedCart = [...cart, id];
      this.setState({ cart: updatedCart });
    }
  };

  handleFilterList = (id) => {
    let filterList = this.state.filterList;
    let filterLength = this.state.filterList.length;
    let isAlreadyInList = false;

    if (filterLength > 0) {
      for (let i = 0; i < filterLength; i++) {
        if (filterList[i] === id) {
          isAlreadyInList = true;
          break;
        }
      }

      if (isAlreadyInList) {
        let removeFilterItem = [...filterList];
        removeFilterItem.splice(filterList.indexOf(id), 1);
        this.setState({ filterList: removeFilterItem });
      } else {
        let newFilterItemList = [...filterList, id];
        this.setState({ filterList: newFilterItemList });
      }
    } else {
      let updatedFilterList = [...filterList, id];
      this.setState({ filterList: updatedFilterList});
    }
  };

  // getMerch();

  render(){
    return (
      <Context.Provider 
        value={{
          cart: this.state.cart,
          merch: this.state.merch,
          filterList: this.state.filterList,
          isUserAuthenticated: this.state.isUserAuthenticated,
          handleCart: this.handleCart,
          handleFilterList: this.handleFilterList,
        }}>
          
      {this.props.children}
      </Context.Provider>
    );
  }
}