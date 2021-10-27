import React, { useContext } from 'react'
import Context from '../context/context.js'
import Header from '../components/header.js'
import EditAccount from '../components/micro/edit_account.js'
import EditShipping from '../components/micro/edit_shipping.js'
import ProfileContent from '../components/profile_content.js'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { StatusBar, StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native'

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

export default function Profile(props) {
  const cartContext = useContext(Context);

  const handleCover = _ => {
    let accountToggle = cartContext.editAccountToggle;
    if (accountToggle) cartContext.handleEditAccountToggle();
    else cartContext.handleEditShippingToggle();
  }

  return (
    <>
      <StatusBarPlaceHolder />
      <View style={styles.container}>
        <Header navigation={props.navigation} />
        <ProfileContent navigation={props.navigation} />
        { cartContext.editAccountToggle ? <EditAccount /> : null }
        { cartContext.editShippingToggle ? <EditShipping /> : null }
        { cartContext.editAccountToggle || cartContext.editShippingToggle ? (
          <View style={styles.cover}>
            <TouchableOpacity style={styles.profile_menu_reset} onPressIn={ _ => handleCover()} />
          </View>
          ): null }
      </View>
    </>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

    cover: {
      marginTop: 70,
      position: 'absolute',
      width: Dimensions.get('screen').width,
      height: Dimensions.get('screen').height,
      backgroundColor: '#fff',
      opacity: 0.6,
      elevation: 10,
    },

      profile_menu_reset: {
        height: '100%',
      }
});