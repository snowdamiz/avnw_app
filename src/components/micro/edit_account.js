import React, { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Context from '../../context/context.js';

import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function EditAccount(props) {
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [err, setErr] = useState();
  const cartContext = useContext(Context);

  useEffect( _ => {
    handleNullFields();
  },[])

  // Handle Null Fields
  const handleNullFields = _ => {
    const curName = cartContext.user.name;
    const curPhone = cartContext.user.phone;

    if (curName) setName(curName)
    else setName('');

    if (curPhone) setPhone(curPhone)
    else setPhone('');
  }


  const handleSetName = e => setName(e);
  const handleSetPhone = e => setPhone(e);  
  const handleCancel = _ => cartContext.handleEditAccountToggle();

  const handleConfirm = async _ => {
    const curName = cartContext.user.name;
    const curPhone = cartContext.user.phone;
    if (name === curName && phone === curPhone) setErr(1)
    else {
      let user = {
        name: name,
        phone: phone,
      }

      try {
        const token = await AsyncStorage.getItem('token');
        const config = { headers: { Authorization: token }};
        const id = cartContext.user.id;

        await axios.put(`https://avnw-api.herokuapp.com/user/${id}`, user, config)
        .then(res => {
          cartContext.setUser(res.data[0]);
          cartContext.handleEditAccountToggle();
        })
        .catch(err => console.log(err))
      } catch (err) { console.log(err) } 
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Edit Account Details
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={e => handleSetName(e)}
        value={name}
        placeholderTextColor="#000"
        placeholder="Name" />
      <TextInput
        style={styles.input}
        onChangeText={e => handleSetPhone(e)}
        value={phone}
        placeholderTextColor="#000"
        placeholder="Phone" />
      <View style={styles.btns_box}>
        <TouchableOpacity
          onPress={ _ => handleCancel()}
          style={[styles.btn, styles.btn_cancel]}>
          <Text style={[styles.btn_text, styles.btn_text_cancel]}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={ _ => handleConfirm()}
          style={[styles.btn, styles.btn_confirm]}>
          <Text style={[styles.btn_text, styles.btn_text_confirm]}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: Dimensions.get('screen').width - 60,
    padding: 15,
    // borderWidth: 1,
    position: 'absolute',
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 20,
    marginTop: 100,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },

    heading: {
      fontWeight: 'bold',
      fontSize: 16,
      opacity: 0.7,
    },

      input: {
        width: '100%',
        backgroundColor: '#D5E8F0',
        marginTop: 10,
        // borderWidth: 1,
        borderRadius: 4,
        paddingLeft: 10,
        paddingTop: 8,
        paddingBottom: 8,
      },

      btns_box: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: 10,
        // borderWidth: 1,
      },
      
        btn_cancel: {
          width: Dimensions.get('screen').width / 2 - 50,
          // borderWidth: 1,
          borderColor: 'gray',
          backgroundColor: '#fff',
          borderRadius: 4,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.7,
          shadowRadius: 10,
          elevation: 5,
        },

        btn_confirm: {
          width: Dimensions.get('screen').width / 2 - 50,
          borderWidth: 1,
          borderColor: '#018bc0',
          borderRadius: 4,
          backgroundColor: '#018bc0',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.7,
          shadowRadius: 10,
          elevation: 5,
        },

          btn_text: {
            textAlign: 'center',
            padding: 10,
          },
          
          btn_text_cancel: {
            opacity: 0.8,
          },

          btn_text_confirm: {
            color: '#fff',
          },
});