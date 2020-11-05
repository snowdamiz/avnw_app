import React, { useState, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import GlobalState from './src/context/global_state.js';
import Index from './src/views/index.js';
import Store from './src/views/store.js';
import BookingStepOne from './src/views/booking_step_one.js';
import BookingStepTwo from  './src/views/booking_step_two.js';
import BookingStepThree from './src/views/booking_step_three.js';
import Cart from './src/views/cart.js';
import Profile from './src/views/profile.js';
import Login from './src/views/login.js';
import MerchOrderOverview from './src/views/merch_order_overview.js';
import BasicInfoStep from './src/views/basic_info_step.js';
import Gallery from './src/views/gallery.js';
import AdminPanel from './src/views/admin_panel.js';
import PhotographerForm from './src/views/admin/photographer_form.js';

export default function App() {
  return (
    <GlobalState>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Index" screenOptions={{ headerShown: false }} >
          <Stack.Screen name="Index">
            { props => <Index {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Store">
            { props => <Store {...props} />}
          </Stack.Screen>
          <Stack.Screen name="BookingStepOne">
            { props => <BookingStepOne {...props} />}
          </Stack.Screen>
          <Stack.Screen name="BookingStepTwo">
            { props => <BookingStepTwo {...props} />}
          </Stack.Screen>
          <Stack.Screen name="BookingStepThree">
            { props => <BookingStepThree {...props} />}
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
          <Stack.Screen name="Gallery">
            { props => <Gallery {...props} />}
          </Stack.Screen>
          <Stack.Screen name="AdminPanel">
            { props => <AdminPanel {...props} />}
          </Stack.Screen>
          <Stack.Screen name="PhotographerForm">
            { props => <PhotographerForm {...props} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalState>
  );
}

const Stack = createStackNavigator();
