import React from 'react';
import Context from './context';
import { merch, user, photographers, services } from '../../dummydb.js';

export default class GlobalState extends React.Component{
  state = {
    user: {
      id: '',
      name: '',
      email: '',
      phone: '',
      address: '',
      unit: '',
      city: '',
      state: '',
      zip: '',
    },
    photographers: {
      id: '',
      name: '',
      bio: ``,
      profile_image: '',
    },
    shootLocation: [],
    services: [],
    curPhotographer: null,
    curGallery: [],
    cart: [],
    cartError: false,
    merch: [],
    filterList: [],
    isUserAuthenticated: false,
  }

  componentDidMount() {
    this.getMerchCategories();
    this.getUser();
    this.getPhotographers();
    this.getServices();
  };

  getUser = _ => {
    let curUser = user;
    this.setState({ user: curUser });
  }

  getPhotographers = _ => {
    let curPhotographers = photographers;
    this.setState({ photographers: curPhotographers });
  }

  getServices = _ => {
    let getServices = services;
    this.setState({ services: getServices });
  }

  setCurPhotographer = el => {
    this.setState({ curPhotographer: el });
  }

  setCurGallery = el => {
    this.setState({ curGallery: el });
  }
  
  getMerchCategories = _ => {
    let getMerchCategories = [];
    let getMerch = merch;
    this.setState({ merch: getMerch });
  
    for (let i = 0; i < getMerch.length; i++) {
      getMerchCategories.push(getMerch[i].category);
    }
  
    this.setState({ filterList: getMerchCategories });
  };

  handleShootLocation = (el) => {
    this.setState({ shootLocation: el });
    console.log(this.state.shootLocation);
  }
 
  handleCart = (prod) => {
    let cart = this.state.cart;
    let cartLength = this.state.cart.length;
    let isAlreadyInCart = false;

    if(cartLength > 0) {
      for (let i = 0; i < cartLength; i++) {
        if (cart[i].id === prod.id) {
          isAlreadyInCart = true;
          break;
        }
      }

      if (isAlreadyInCart) {
        let removeItemCart = [...cart];
        removeItemCart.splice(cart.indexOf(prod), 1);
        this.setState({ cart: removeItemCart });
      } else {
        let newItemCart = [...cart, prod];
        this.setState({ cart: newItemCart });
      }
    } else {
      let updatedCart = [...cart, prod];
      this.setState({ cart: updatedCart });
    }
  };

  changeItemQuantity = (q, el) => {
    var numRegex = /^[0-9]+$/;
    let cart = [...this.state.cart];
    let i = cart.indexOf(el);

    if (q.match(numRegex)) {
      cart[i].quantity = q;
      this.setState({ cart: cart });
      this.setState({ cartError: false });
    } else {
      this.setState({ cartError: !this.state.cartError });
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
          user: this.state.user,
          photographers: this.state.photographers,
          curPhotographer: this.state.curPhotographer,
          curGallery: this.state.curGallery,
          cart: this.state.cart,
          shootLocation: this.state.shootLocation,
          cartError: this.state.cartError,
          merch: this.state.merch,
          services: this.state.services,
          filterList: this.state.filterList,
          isUserAuthenticated: this.state.isUserAuthenticated,
          setCurGallery: this.setCurGallery,
          setCurPhotographer: this.setCurPhotographer,
          getUser: this.getUser,
          changeItemQuantity: this.changeItemQuantity,
          handleShootLocation: this.handleShootLocation,
          handleCart: this.handleCart,
          handleFilterList: this.handleFilterList,
        }}>
          
      {this.props.children}
      </Context.Provider>
    );
  }
}