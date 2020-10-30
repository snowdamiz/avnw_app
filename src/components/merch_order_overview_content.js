import React, { useEffect, useState, useContext } from 'react';

import Context from '../context/context.js';
import CartContent from '../components/cart_content.js';
import BasicInfoContent from './basic_info_content.js';
import ShippingContent from './shipping_content.js';
import LocationContent from './location_content.js';

import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';

export default function MerchOrderOverviewContent(props) {
  const cartContext = useContext(Context);
  
  const [hasMerch, setHasMerch] = useState(false);
  const [hasService, setHasService] = useState(false);

  useEffect(() => {
    let results = [];
    let cart = cartContext.cart;

    for (let i = 0; i < cart.length; i++ ) {
      results.push(cart[i].type);
    }

    if (results.includes('merch')) setHasMerch(true);
    else setHasMerch(false);

    if (results.includes('service')) setHasService(true);
    else setHasService(false);
  }, [cartContext.cart]);

  return (
    <View style={styles.container}>
      <ScrollView>
        { cartContext.cart.length > 0 ? <BasicInfoContent navigation={props.navigation} /> : null }
        { hasMerch ? <ShippingContent navigation={props.navigation} /> : null }
        { hasService ? <LocationContent navigation={props.navigation} /> : null }      
        <CartContent navigation={props.navigation} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    zIndex: 1,
  },
});