import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function ProfileContent(props, { navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.profile}>
        {}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },

  profile: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      paddingRight: 15,
      paddingLeft: 15,
      paddingBottom: 15,
    },
});