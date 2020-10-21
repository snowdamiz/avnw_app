import React, { useState, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import GlobalState from './src/context/global_state.js';
import Store from './src/views/store.js';
import Booking from './src/views/booking.js';
import Cart from './src/views/cart.js';
import Profile from './src/views/profile.js';
import Login from './src/views/login.js';
import MerchOrderOverview from './src/views/merch_order_overview.js';
import BasicInfoStep from './src/views/basic_info_step.js';

export default function App() {
  return (
    <GlobalState>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Store" screenOptions={{ headerShown: false }} >
          <Stack.Screen name="Store">
            { props => <Store {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Booking">
            { props => <Booking {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Cart">
            { props => <Cart {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Profile">
            { props => <Profile {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Login">
            { props => <Login {...props} />}
          </Stack.Screen>
          <Stack.Screen name="MerchOrderOverview">
            { props => <MerchOrderOverview {...props} />}
          </Stack.Screen>
          <Stack.Screen name="BasicInfoStep">
            { props => <BasicInfoStep {...props} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalState>
  );
}

const Stack = createStackNavigator();
