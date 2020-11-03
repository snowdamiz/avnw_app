import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Context from './context';

import { merch, user, photographers, services } from '../../dummydb.js';

export default class GlobalState extends React.Component{
  state = {
    user: [],
    photographers: {
      id: '',
      name: '',
      bio: ``,
      profile_image: '',
    },
    shootLocationToggle: false,
    basicInfoToggle: false,
    shippingInfoToggle: false,
    shootLocation: [],
    services: [],
    curPhotographer: null,
    curGallery: [],
    cart: [],
    merch: [],
    filterList: [],
    cartError: false,
    serviceError: false,
    token: '',
    previousRoute: '',
    accountType: '',
    menuToggle: false,
  }

  componentDidMount() {
    this.getLoginToken();
    this.getMerchCategories();
    this.getPhotographers();
    this.getServices();
    this.getMerch();
  };

  getLoginToken = async _ => {
    const getToken = await AsyncStorage.getItem('token');
    const getUser = await AsyncStorage.getItem('user');

    if (getToken !== null) {
      this.setState({ token: getToken })
      this.setState({ user: JSON.parse(getUser) })
      this.setState({ accountType: JSON.parse(getUser).account_type })
    } else {
      this.setState({ token: '' });
      this.setState({ user: [] })
      this.setState({ accountType: '' })
    }
  }

  setLoginToken = async (token, user) => {
    const jsonUser = JSON.stringify(user);
    try {
       await AsyncStorage.setItem('token', token)
       await AsyncStorage.setItem('user', jsonUser)
       this.setState({ token: token })
       this.setState({ user: user })
       this.setState({ accountType: user.account_type })
    } catch (err) {
      console.log(err);
    }
  }

  handleSignout = async _ => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      this.setState({ token: '' })
      this.setState({ user: [] })
    } catch (err) {
      console.log(err);
    }
  }

  getPhotographers = _ => {
    let curPhotographers = photographers;
    this.setState({ photographers: curPhotographers });
  }

  getServices = _ => {
    let getServices = services;
    this.setState({ services: getServices });
  }

  getMerch = _ => {
    let getMerch = merch
    this.setState({ merch: getMerch })
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
  
    for (let i = 0; i < getMerch.length; i++) {
      getMerchCategories.push(getMerch[i].category);
    }
  
    this.setState({ filterList: getMerchCategories });
  };

  handleShootLocation = (el) => {
    this.setState({ shootLocation: el });
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

  handleShootLocationToggle = _ => {
    let toggle = this.state.shootLocationToggle;
    this.setState({ shootLocationToggle: !toggle });
  }

  handleBasicInfoToggle = _ => {
    let toggle = this.state.basicInfoToggle;
    this.setState({ basicInfoToggle: !toggle });
  }

  handleShippingInfoToggle = _ => {
    let toggle = this.state.shippingInfoToggle;
    this.setState({ shippingInfoToggle: !toggle });
  }

  handleServiceError = res => {
    this.setState({ serviceError: res });
    // console.log(res);
  }

  setPreviousRoute = route => {
    this.setState({ previousRoute: route });
  }

  handleMenuToggle = _ => {
    let toggle = this.state.menuToggle;
    this.setState({ menuToggle: !toggle })
  }

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
          shootLocationToggle: this.state.shootLocationToggle,
          basicInfoToggle: this.state.basicInfoToggle,
          shippingInfoToggle: this.state.shippingInfoToggle,
          merch: this.state.merch,
          services: this.state.services,
          filterList: this.state.filterList,
          cartError: this.state.cartError,
          serviceError: this.state.serviceError,
          token: this.state.token,
          previousRoute: this.state.previousRoute,
          accountType: this.state.accountType,
          menuToggle: this.state.menuToggle,
          setLoginToken: this.setLoginToken,
          getLoginToken: this.getLoginToken,
          handleSignout: this.handleSignout,
          setCurGallery: this.setCurGallery,
          setCurPhotographer: this.setCurPhotographer,
          changeItemQuantity: this.changeItemQuantity,
          handleShootLocation: this.handleShootLocation,
          handleCart: this.handleCart,
          handleFilterList: this.handleFilterList,
          handleShootLocationToggle: this.handleShootLocationToggle,
          handleBasicInfoToggle: this.handleBasicInfoToggle,
          handleShippingInfoToggle: this.handleShippingInfoToggle,
          handleServiceError: this.handleServiceError,
          setPreviousRoute: this.setPreviousRoute,
          handleMenuToggle: this.handleMenuToggle,
        }}>
          
      {this.props.children}
      </Context.Provider>
    );
  }
}