import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import LogoIMG from '../assets/logo_large_blue.png';
import Context from '../context/context.js';

import {
  Dimensions,
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  TouchableNativeFeedback,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [token, setToken] = useState();

  const cartContext = useContext(Context);
  const route = useRoute();

  useEffect( _ => {
    // if(cartContext.token) {
      // props.navigation.navigate(cartContext.previousRoute);
    // } else return
  }, [cartContext.token])

  const handleEmail = e => setEmail(e)
  const handlePassword = e => setPassword(e)

  async function handleSigninSubmit() {
    function validateEmail() {
      const emailRegex = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
      return emailRegex.test(String(email).toLowerCase())
    }
    
    if (validateEmail() && password) {
      const auth = { email: email, password: password };
      
      axios({
        method: 'post',
        url: 'http://192.168.51.241:5000/user/login',
        data: auth
      }).then(res => {
        cartContext.setLoginToken(res.data.token, res.data.user[0]);
        props.navigation.navigate(cartContext.previousRoute);
      }).catch(err => {
        setErr(err);
      })
    } else {
      setErr('Invalid Email or Password');
    }
  }

  return (
    <LinearGradient colors={['#009cd8', '#018bc0', '#018bc0']} style={styles.gradient} >
      <View style={styles.container}>
        <View style={styles.login_box}>
          <Image source={LogoIMG} style={styles.logoIMG} />
          <TextInput 
            style={[styles.input]}
            placeholder={'Email'}
            placeholderTextColor='#000'
            onChangeText={e => handleEmail(e)}
            value={email}>
          </TextInput>
          <TextInput 
            style={[styles.input, styles.input_password]}
            placeholder={'Password'}
            placeholderTextColor='#000'
            onChangeText={e => handlePassword(e)}
            secureTextEntry={true}
            value={password}>
          </TextInput>
          <TouchableOpacity
            style={[styles.btn, styles.btn_login]}
            onPress={ _ => handleSigninSubmit()}>
            <Text style={[styles.btn_text, styles.btn_text_login]}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, styles.btn_signup]}
            onPress={ _ => handleSignupSubmit()}>
            <Text style={[styles.btn_text, styles.btn_text_signup]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.login_header_text}>
          Please sign in or sign up to continue
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Dimensions.get('screen').width,
    borderWidth: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

    login_header_text: {
      color: '#fff',
      // fontWeight: 'bold',
      fontSize: 14,
      width: '45%',
      textAlign: 'center',
      marginTop: 20,
      opacity: 0.95,
    },

    login_box: {
      width: '75%',
      padding: 10,
      // borderWidth: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 6,
      backgroundColor: '#fefefe',
      shadowColor: '#014C6A',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 20,
      elevation: 3,
    },

      logoIMG: {
        margin: 5,
        width: 140,
        height: 140,
        // borderWidth: 1,
        borderColor: '#000',
      },

      input: {
        width: '100%',
        // borderWidth: 1,
        padding: 12,
        borderRadius: 6,
        opacity: 0.8,
        backgroundColor: '#D5E8F0',
      },

        input_password: {
          marginTop: 10,
          // marginBottom: 15,
        },

      btn: {
        width: '100%',
        padding: 12,
        // borderWidth: 1,
        borderRadius: 6,
        marginTop: 10, 
      },

      btn_login: {
        backgroundColor: '#009cd8',
      },

      btn_signup: {
        backgroundColor: '#015C7F',
        // shadowOffset: { width: 0, height: 0 },
        // shadowOpacity: 1,
        // shadowRadius: 6,
        // elevation: 4,
      },

        btn_text: {
          textAlign: 'center',
          
        },

        btn_text_login: {
          color: '#fff',
          fontWeight: 'bold',
          fontSize: 15,
        },  

        btn_text_signup: {
          fontWeight: 'bold',
          fontSize: 15,
          // opacity: 0.60,
          color: '#fff',
        },
});