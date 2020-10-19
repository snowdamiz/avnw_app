import React from 'react';
import Context from './context';

export default class GlobalState extends React.Component{
  state = {
    cart: [],
  }
 
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
 

  render(){
    return (
      <Context.Provider 
        value={{
          cart: this.state.cart,
          handleCart: this.handleCart,
        }}>
          
      {this.props.children}
      </Context.Provider>
    );
  }
}