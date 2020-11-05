import React, { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { StyleSheet, View, Text, TextInput, Dimensions, KeyboardAvoidingView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Context from '../../context/context.js';
import Header from '../../components/header.js';

export default function ProductForm(props) {
  const [productName, setProductName] = useState();
  const [productDescription, setProductDescription] = useState();
  const [productPrice, setProductPrice] = useState();
  const [productCategory, setProductCategory] = useState();
  const [productImage, setProductImage] = useState();
  const [err, setErr] = useState(0);
  
  const cartContext = useContext(Context);

  useEffect( _ => {
    if (cartContext.productEditing.price) {
      setProductPrice(cartContext.productEditing.price.toString());
    } else {
      setProductPrice(cartContext.productEditing.price);
    }
    setProductName(cartContext.productEditing.product);
    setProductDescription(cartContext.productEditing.description);
    setProductCategory(cartContext.productEditing.category);
    setProductImage(cartContext.productEditing.image);
  }, [cartContext.productEditing])
  
  const handleProductName = e => setProductName(e);
  const handleProductDescription = e => setProductDescription(e);
  const handleProductPrice = e => setProductPrice(e);
  const handleProductCategory = e => setProductCategory(e);
  const handleProductImage = e => setProductImage(e);

  // Handle Canel Button; Reset State and Navigate
  const handleCancel = _ => {
    props.navigation.navigate('AdminPanel');
    setProductName('');
    setProductDescription('');
    setProductPrice('');
    setProductCategory('');
    setProductImage('');
  }

  // Exicute ADD or EDIT function based on "formType"
  const handleFormType = async _ => {
    let formType = cartContext.adminProductInteraction;
    if(formType === 'new') handleAdd()
    else handleEdit();
    console.log(formType);
  }

  // Handles adding new content
  const handleAdd = async _ => {
    if (productName && productDescription && productPrice && productCategory && productImage) {
      const product = {
        product: productName,
        description: productDescription,
        price: parseInt(productPrice),
        category: productCategory,
        image: productImage,
        type: 'merch',
        quantity: 1,
        createdAt: new Date(),
      }

      try {
        const token = await AsyncStorage.getItem('token');
        const config = { headers: { Authorization: token }}

        await axios.post('https://avnw-api.herokuapp.com/store/', product, config)
          .then(res => {
            cartContext.setProducts(res.data);
            props.navigation.navigate('AdminPanel')
          })
          .catch(err => console.log(err))
      } catch(err) { console.log(err, 'Client Error')}
    } else setErr(1);
  }

  // Handles editing content
  const handleEdit = async _ => {
    console.log('here');
    console.log(cartContext.productEditing.product);
    if (productName && productDescription && productPrice && productCategory && productImage) {
      const product = {
        product: productName,
        description: productDescription,
        price: parseInt(productPrice),
        category: productCategory,
        image: productImage,
      }

      try {
        const token = await AsyncStorage.getItem('token');
        const config = { headers: { Authorization: token }}
        let id = cartContext.productEditing.id;

        console.log(id);

        await axios.put(`https://avnw-api.herokuapp.com/store/${id}`, product, config)
          .then(res => {
            cartContext.setProducts(res.data);
            props.navigation.navigate('AdminPanel')
          })
          .catch(err => console.log(err))
      } catch(err) { console.log(err) }
    } else setErr(1);
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == "ios" ? "padding" : "height"}>
      <Header navigation={props.navigation} />
        <View style={styles.wrap}>
          <Text style={styles.title}>
            { cartContext.adminProductInteraction === 'new' ? 'New Product' : 'Edit Product' }
          </Text>
          <View style={styles.content}>
            <TextInput 
              style={[styles.input]}
              placeholder={'Product'}
              placeholderTextColor='#393939'
              onChangeText={(e) => handleProductName(e)}
              value={productName}>
            </TextInput>
            <TextInput 
              style={[styles.input]}
              keyboardType={'numeric'}
              placeholder={'Price'}
              placeholderTextColor='#393939'
              onChangeText={(e) => handleProductPrice(e)}
              value={productPrice}>
            </TextInput>
            <TextInput 
              style={[styles.input]}
              placeholder={'Category'}
              placeholderTextColor='#393939'
              onChangeText={(e) => handleProductCategory(e)}
              value={productCategory}>
            </TextInput>
            <TextInput 
              style={[styles.input]}
              placeholder={'Image'}
              placeholderTextColor='#393939'
              onChangeText={(e) => handleProductImage(e)}
              value={productImage}>
            </TextInput>
            <TextInput 
              style={[styles.input, styles.bio_intput]}
              multiline={true}
              placeholder={'Description'}
              placeholderTextColor='#393939'
              onChangeText={(e) => handleProductDescription(e)}
              value={productDescription}>
            </TextInput>
          </View>
          <View style={styles.btns_box}>
            <TouchableOpacity style={styles.btn} onPress={ _ => handleCancel()}>
              <Text style={styles.btn_text}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.btn_add]} onPress={ _ => handleFormType()}>
              <Text style={styles.btn_text}>
              { cartContext.adminProductInteraction === 'new' ? 'Add' : 'Edit' }
              </Text>
            </TouchableOpacity>
          </View>
        </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    zIndex: 2,
  },

    wrap: {
      width: '100%',
      borderRadius: 6,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#fff',
      marginTop: 30,
      // zIndex: 1,
      // shadowColor: "#000",
      // shadowOffset: {
      //   width: 0,
      //   height: 2,
      // },
      // shadowOpacity: 0.8,
      // shadowRadius: 3.2,
      // elevation: 8,
    },

      title: {
        fontWeight: 'bold',
        fontSize: 22,
        opacity: 0.6,
        alignSelf: 'flex-start',
        marginLeft: 30,
      },

      content: {
        // marginTop: 10,
        marginBottom: 15,
      },

        input: {
          width: Dimensions.get('screen').width - 60,
          padding: 12,
          paddingLeft: 10,
          borderRadius: 4,
          backgroundColor: '#fff',
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.6,
          shadowRadius: 3.2,
          elevation: 4,
          marginTop: 12,
        },

        bio_intput: {
          height: 150,
          textAlignVertical: 'top',
          lineHeight: 20,
        },

    btns_box: {
      width: Dimensions.get('screen').width - 60,
      marginBottom: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

      btn: {
        width: Dimensions.get('screen').width / 2 - 36,
        borderRadius: 4,
        backgroundColor: '#005575',
      },

      btn_add: {
        backgroundColor: '#009cd8',
      },

        btn_text: {
          textAlign: 'center',
          fontSize: 14,
          fontWeight: 'bold',
          color: '#fff',
          opacity: 0.9,
          padding: 12,
        },
});
