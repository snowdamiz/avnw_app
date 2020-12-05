import React, { useContext } from 'react';
import Context from '../context/context.js';
import { StyleSheet, View, Text, TextInput } from 'react-native';

export default function BasicInfoStepContent(props) {
  const cartContext = useContext(Context);

  return (
    <View style={styles.container}>
      <View style={styles.content_header_box}>
        <Text style={styles.content_header_text}>Step 1 </Text>
        <Text style={styles.content_header_text2}>Basic Information</Text>
      </View>
      <View>
      <TextInput 
        style={styles.content_container_name}
        placeholder={`${cartContext.user.name}`}
        placeholderTextColor='#000'>
      </TextInput>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

    content_header_box: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },

      content_header_text: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#009cd8',
      },

      content_header_text2: {
        fontSize: 18,
        color: 'gray',
        marginLeft: 8,
      },

    content_container_name: {
      height: 40,
      width: 250,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      paddingTop: 0,
      paddingBottom: 0,
      opacity: 0.5,
      borderRadius: 6,
    },
});