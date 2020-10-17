import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Store from './src/views/store/store.js';
import Booking from './src/views/booking/booking.js';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Store" screenOptions={{ headerShown: false }} >
        <Stack.Screen name="Store">
          { props => <Store {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Booking">
          { props => <Booking {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();
