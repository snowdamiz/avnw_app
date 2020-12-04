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
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function Login(props) {
  const cartContext = useContext(Context);
  const route = useRoute();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState();
  const [token, setToken] = useState();

  const handleEmail = e => setEmail(e)
  const handlePassword = e => setPassword(e)

  // Handle Signin
  const handleSigninSubmit = async _ => {
    function validateEmail() {
      const emailRegex = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
      return emailRegex.test(String(email).toLowerCase())
    }
    
    if (validateEmail() && password) {
      const auth = { email: email, password: password };

      try {
        await axios.post('https://avnw-api.herokuapp.com/user/login', auth)
          .then(res => {
            cartContext.setLoginToken(res.data.token, res.data.user[0]);
            props.navigation.navigate(cartContext.previousRoute);
            setErr(0);
          })
          .catch(err => {
            if (err.response.status === 500) {
              setPassword('');
              setErr(1);
            }
          });
      } catch (err) { console.log(err) }
    } else setErr(2)
  }

  // Handle Singup
  const handleSignupSubmit = async _ => {
    function validateEmail() {
      const emailRegex = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
      return emailRegex.test(String(email).toLowerCase())
    }
    
    if (validateEmail() && password) {
      const user = {
        email: email,
        password: password,
        createdAt: new Date(),
      };

      try {
        await axios.post('https://avnw-api.herokuapp.com/user/register', user)
          .then(res => {
            cartContext.setLoginToken(res.data.token, res.data.user);
            props.navigation.navigate(cartContext.previousRoute);
            setErr(0);
          })
          .catch(err => {
            if (err.response.status === 500) {
              setPassword('');
              setErr(1);
            }
          });
      } catch (err) { console.log(err) }
    } else setErr(2)
  }

  return (
    <LinearGradient colors={['#009cd8', '#008CC1', '#0080B1']} style={styles.gradient} >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.login_box, err ? styles.login_box_err : null]}>
          <Image source={LogoIMG} style={styles.logoIMG} />
          <View style={styles.btn_wrap}>
            { err ? (
              <View style={styles.login_err_box}>
                <Text style={styles.login_err_text}>
                  { err === 1 ? `Email and password don't match` : `Please provide a valid email and password`}
                </Text>
              </View>
            ) : null}
            <TextInput 
              style={[styles.input]}
              autoCapitalize='none'
              placeholder={'Email'}
              placeholderTextColor='#000'
              onChangeText={e => handleEmail(e)}
              value={email}>
            </TextInput>
            <TextInput 
              style={[styles.input, styles.input_password]}
              autoCapitalize='none'
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
        </View>
        <Text style={styles.login_header_text}>
          Please sign in or sign up to continue
        </Text>
      </ScrollView>
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
    // borderWidth: 1,
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
      marginTop: -50,
      width: '75%',
      minHeight: 400,
      paddingLeft: 10,
      paddingRight: 10,
      // borderWidth: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 6,
      backgroundColor: '#fefefe',
      shadowColor: '#014C6A',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.28,
      shadowRadius: 5,
      elevation: 3,
    },

    login_box_err: {
      height: 430,
    },

      btn_wrap: {
        width: '100%',
      },

      logoIMG: {
        marginTop: 15,
        width: 140,
        height: 140,
        // borderWidth: 1,
        borderColor: '#000',
      },

      login_err_box: {
        width: '100%',
        padding: 8,
        borderRadius: 6,
        backgroundColor: 'pink',
        marginBottom: 10,
      },

        login_err_text: {
          fontSize: 12,
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
        marginBottom: 10,
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