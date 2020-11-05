import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Context from './context';

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
    newPhotographerToggle: false,
    editPhotographerToggle: false,
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
    photographerEdit: [],
    deletePhotographerConfirmation: false,
    adminPhotographerInteraction: '',
  }

  componentDidMount() {
    this.getLoginToken();
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

  setPhotographers = el => {
    this.setState({ photographers: el })
  }

  getPhotographers = async _ => {
    try {
      await axios.get('https://avnw-api.herokuapp.com/photographers')
      .then(res => this.setState({ photographers: res.data }))
        .catch(err => console.log(err))
    } catch (err) { console.log(err) }
  }

  getServices = async _ => {
    try {
      await axios.get('https://avnw-api.herokuapp.com/services')
        .then(res => this.setState({ services: res.data }))
        .catch(err => console.log(err) )
    } catch (err) { console.log(err) }
  }

  getMerch = async _ => {
    try {
      await axios.get('https://avnw-api.herokuapp.com/store')
        .then(res => this.setState({ merch: res.data }))
        .catch(err => console.log(err) )
    } catch (err) { console.log(err) }
  }

  setCurPhotographer = el => {
    this.setState({ curPhotographer: el });
  }

  setCurGallery = el => {
    this.setState({ curGallery: el });
  }

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
  }

  setPreviousRoute = route => {
    this.setState({ previousRoute: route });
  }

  handleMenuToggle = _ => {
    let toggle = this.state.menuToggle;
    this.setState({ menuToggle: !toggle })
  }

  setEditPhotographer = el => {
    this.setState({ photographerEdit: el })
  }

  handleDeletePhotographerConfirmation = _ => {
    let toggle = this.state.deletePhotographerConfirmation;
    this.setState({ deletePhotographerConfirmation: !toggle});
  }

  handleAdminPhotographerInteraction = status => {
    console.log(status);
    this.setState({ adminPhotographerInteraction: status });
  }

  photographerEditRESET = _ => this.setState({ photographerEdit: [] });

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
          photographerEdit: this.state.photographerEdit,
          adminPhotographerInteraction: this.state.adminPhotographerInteraction,
          deletePhotographerConfirmation: this.state.deletePhotographerConfirmation,
          setLoginToken: this.setLoginToken,
          getLoginToken: this.getLoginToken,
          handleSignout: this.handleSignout,
          setCurGallery: this.setCurGallery,
          setCurPhotographer: this.setCurPhotographer,
          changeItemQuantity: this.changeItemQuantity,
          handleShootLocation: this.handleShootLocation,
          handleCart: this.handleCart,
          handleShootLocationToggle: this.handleShootLocationToggle,
          handleBasicInfoToggle: this.handleBasicInfoToggle,
          handleShippingInfoToggle: this.handleShippingInfoToggle,
          handleServiceError: this.handleServiceError,
          setPreviousRoute: this.setPreviousRoute,
          handleMenuToggle: this.handleMenuToggle,
          setPhotographers: this.setPhotographers,
          getPhotographers: this.getPhotographers,
          setEditPhotographer: this.setEditPhotographer,
          handleDeletePhotographerConfirmation: this.handleDeletePhotographerConfirmation,
          handleAdminPhotographerInteraction: this.handleAdminPhotographerInteraction,
          photographerEditRESET: this.photographerEditRESET,
        }}>
          
      {this.props.children}
      </Context.Provider>
    );
  }
}