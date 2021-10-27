import React, { useState, useContext, useEffect } from 'react'
import Context from '../context/context.js'
import Header from '../components/header.js'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { Dimensions, StyleSheet, StatusBar, View, Image, TouchableOpacity, Text } from 'react-native'

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? getStatusBarHeight() : 0

function StatusBarPlaceHolder() {
  return (
    <View style={{
      width: "100%",
      height: STATUS_BAR_HEIGHT,
      backgroundColor: "#009cd8"
    }}>
      <StatusBar barStyle="light-content" backgroundColor="#009cd8"/>
    </View>
  );
}

export default function SelectedProduct(props) {
  const [images, setImages] = useState([])
  const [imgIndex, setImgIndex] = useState(0)
  const [toggle, setToggle] = useState(false)
  const [size, setSize] = useState('')
  const [error, setError] = useState(false)
  const [category, setCategory] = useState('')
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']

  const cartContext = useContext(Context)

  useEffect( _ => {
    let product = cartContext.chosenProduct
    let imgs = [product.image1, product.image2, product.image3]
    setImages(imgs)
    setCategory(cartContext.chosenProduct.category);
  }, [])

  // Handle Next Slide
  const handleNextSlide = _ => {
    if (imgIndex === 2) setImgIndex(0)
    else setImgIndex(imgIndex + 1)
  }

  // Handle Previous Slide
  const handlePrevSlide = _ => {
    if (imgIndex === 0) setImgIndex(2)
    else setImgIndex(imgIndex - 1)
  }
  
  // Handle Size Select
  const handleSetSize = el => {
    setSize(el)
    setToggle(false)
    setError(false)
  }

  // Handle Size Toggle
  const handleSizeSelectToggle = _ => setToggle(!toggle)

  // Handle Cart Add
  const handleCartAdd = _ => {
    if (category === "Sweatshirts" || category === "Shirt") {
      if (size) {
        let prod = cartContext.chosenProduct
        prod.size = size
        cartContext.handleCart(prod)
        props.navigation.navigate('Store')
      } else setError(true)
    } else {
      cartContext.handleCart(cartContext.chosenProduct)
      props.navigation.navigate('Store')
    }
  }

  return (
    <>
      <StatusBarPlaceHolder />
      <View style={styles.container}>
        <Header navigation={props.navigation} />
        <View style={styles.content}>
          <View style={styles.img_box}>
            <Image source={{ uri: images[imgIndex]}} style={styles.img}/>
          </View>
          <View style={styles.nav_box}>
            <TouchableOpacity
              onPress={ _ => handlePrevSlide()}
              style={[styles.arrow_circle, styles.arrow_circle_left]}>
              <View style={[styles.arrow, styles.arrow_left]} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={ _ => handleNextSlide()}
              style={[styles.arrow_circle, styles.arrow_circle_right]}>
              <View style={[styles.arrow, styles.arrow_right]} />
            </TouchableOpacity>
          </View>
          { toggle ? (
            <View style={styles.size_select}>
              <Text style={styles.size_selection_heading}>Sizes</Text>
              { sizes.map(el => {
                return (
                  <TouchableOpacity
                    key={el}
                    onPressIn={ _ => handleSetSize(el)}
                    style={styles.size_selction}>
                    <Text style={styles.size_selection_text}>{el}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          ) : null }
          <View style={styles.info_box}>
            <View style={styles.heading}>
              <Text style={styles.title}>{cartContext.chosenProduct.product}</Text>
              <Text style={styles.desc}>{cartContext.chosenProduct.description}</Text>
            </View>
            <View style={styles.prod_price}>
              <Text style={styles.prod_price_text}>{`$${cartContext.chosenProduct.price}`}</Text>
            </View>
          </View>
          { category === "Sweatshirts" || category === "Shirt" ? (
            <View style={styles.bb}>
              <TouchableOpacity
                style={[styles.size_btn, error ? styles.size_btn_error : null]}
                disabled={cartContext.menuToggle}
                onPress={ _ => handleSizeSelectToggle() }>
                <Text style={styles.size_btn_text}>{ size ? `Size: ${size}` : 'Select Size'}</Text>
              </TouchableOpacity>
            </View>
          ): null }
          <TouchableOpacity
            style={[styles.cart_btn, cartContext.cart.includes(cartContext.chosenProduct) ? styles.cart_btn_on : null]}
            disabled={cartContext.menuToggle}
            onPress={ _ => handleCartAdd() }>
            <Text style={styles.cart_btn_text}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
  },

    content: {
      width: Dimensions.get('screen').width,
      height: '100%',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#F0ECEC',
    },

      img_box: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: 15,
        paddingBottom: 15,
      },

        img: {
          width: Dimensions.get('screen').width - 80,
          height: Dimensions.get('screen').width - 80,
        },

      nav_box: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
        marginTop: Dimensions.get('screen').width / 2 - 65,
      },

      arrow_circle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.28,
        shadowRadius: 5,
        elevation: 7,
      },

      arrow_circle_left: {
        marginLeft: -25,
      },

      arrow_circle_right: {
        marginRight: -25,
      },

        arrow: {
          width: 0,
          height: 0,
          borderStyle: 'solid',
          opacity: 0.4,
        },
        
        arrow_right: {
          borderBottomWidth: 8,
          borderTopWidth: 8,
          borderLeftWidth: 13,
          backgroundColor: 'transparent',
          borderBottomColor: 'transparent',
          borderTopColor: 'transparent',
          borderRightColor: '#000',
          marginRight: 15,

        },

        arrow_left: {
          borderBottomWidth: 8,
          borderTopWidth: 8,
          borderRightWidth: 13,
          backgroundColor: 'transparent',
          borderBottomColor: 'transparent',
          borderTopColor: 'transparent',
          borderLeftColor: '#000',
          marginLeft: 15,
        },

      size_select: {
        width: 240,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.28,
        shadowRadius: 5,
        elevation: 4,
        position: 'absolute',
        marginTop: 130,
        justifyContent: 'flex-start',
        alignItems: 'center',
        zIndex: 1,
      },

        size_selection_heading: {
          fontSize: 20,
          fontWeight: 'bold',
          opacity: 0.7,
          paddingBottom: 10,
        },

        size_selction: {
          width: '100%',
          backgroundColor: '#F0F0F0',
          marginTop: 5,
        },

          size_selection_text: {
            fontSize: 16,
            padding: 5,
            textAlign: 'center',
          },

      info_box: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 25,
      },

        heading: {
          width: Dimensions.get('screen').width - 120,
        },

          title: {
            fontWeight: 'bold',
            fontSize: 20,
            color: '#000',
            opacity: 0.7,
          },

          desc: {
            opacity: 0.8,
            marginTop: 5,
          },

        prod_price: {
          color: '#fff',
          backgroundColor: '#009cd8',
          borderRadius: 40,
          width: 80,
          height: 80,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: -65,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.28,
          shadowRadius: 5,
          elevation: 4,
        },

          prod_price_text: {
            color: '#fff',
            fontSize: 18,
            fontWeight: 'bold', 
          },

      bb: {
        width: Dimensions.get('screen').width - 50,
        marginTop: -10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },

        size_btn: {
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
          width: 120,
          height: 42,
          borderWidth: 1,
          borderColor: '#DDDDDD',
          borderRadius: 6,
        },

        size_btn_error: {
          borderColor: 'red',
        },

          size_btn_text: {
            color: '#000',
            fontWeight: 'bold',
            fontSize: 14,
            opacity: 0.7,
          },

        cart_btn: {
          bottom: 100,
          backgroundColor: '#0087BA',
          borderColor: '#0087BA',
          justifyContent: 'center',
          alignItems: 'center',
          width: Dimensions.get('screen').width - 50,
          height: 50,
          borderWidth: 1,
          borderRadius: 6,
          position: 'absolute',
        },

          cart_btn_text: {
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 14,
          },

        cart_btn_on: {
          borderColor: '#00668C',
          backgroundColor: '#00668C',
        },

          cart_btn_text_on: {
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 12,
          },
});