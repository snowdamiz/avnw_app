import React, { useContext } from 'react'
import Context from '../context/context.js'
import { Dimensions, StyleSheet, View, Text, ScrollView } from 'react-native'

export default function SelectedServiceOrderContent(props) {
  const cartContext = useContext(Context)

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header_text}>Order</Text>
      <View style={styles.order}>
        <View style={styles.row}>
          <Text style={styles.label}>Product</Text>
          <Text style={styles.text}>{cartContext.selectedServiceOrder.service.product}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Booking Cost</Text>
          <Text style={styles.text}>{cartContext.selectedServiceOrder.service.price}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Location</Text>
          <Text style={styles.text}>{cartContext.selectedServiceOrder.location}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Description</Text>
          <Text style={styles.text}>{cartContext.selectedServiceOrder.service.description}</Text>
        </View>
        <View style={[styles.row, styles.row_b]}>
          <Text style={styles.label}>Order Date</Text>
          <Text style={styles.text}>{cartContext.selectedServiceOrder.service.createdAt.substring(0, 10)}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: Dimensions.get('screen').width,
  },

  header_text: {
    fontSize: 24,
    fontWeight: 'bold',
    opacity: 0.65,
    alignSelf: 'flex-start',
    marginLeft: 30,
    marginTop: 30,
  },

  order: {
    width: Dimensions.get('screen').width - 60,
    marginTop: 5,
    borderRadius: 6,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.28,
    shadowRadius: 5,
    elevation: 4,
  },

    row: {
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      paddingTop: 12,
      paddingLeft: 12,
      paddingRight: 12,
    },

    row_b: {
      paddingBottom: 12,
    },

    label: {
      fontWeight: 'bold',
      opacity: 0.70,
    },

    text: {
      opacity: 0.75,
      flexWrap: 'wrap',
    },
});