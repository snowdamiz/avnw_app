import React, { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Context from '../context/context.js';

import Header from '../components/header.js';
import PhotographersContent from '../components/admin/photographers_content.js';

import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TextInput,
  Dimensions,
  ScrollView,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function AdminPanel(props) {
  const [photographerName, setPhotographerName] = useState();
  const [photographerInsta, setPhotographerInsta] = useState();
  const [photographerImage, setPhotographerImage] = useState();
  const [photographerBio, setPhotographerBio] = useState();
  const [err, setErr] = useState(0);
    
    const cartContext = useContext(Context);
    
    const handlePhotographerName = e => setPhotographerName(e);
    const handlePhotographerInsta = e => setPhotographerInsta(e);
    const handlePhotographerBio = e => setPhotographerBio(e);
    const handlePhotographerImage = e => setPhotographerImage(e);

    const handleCancel = _ => {
      cartContext.handleNewPhotographerToggle();
      setPhotographerName('');
      setPhotographerInsta('');
      setPhotographerImage('');
      setPhotographerBio('');
    }

    const handleAdd = async _ => {
      if (photographerName && photographerInsta && photographerImage && photographerBio) {
        const photographer = {
          name: photographerName,
          insta_username: photographerInsta,
          profile_image: photographerImage,
          bio: photographerBio,
          createdAt: new Date(),
        }

        try {
          const token = await AsyncStorage.getItem('token');
          const config = { headers: { Authorization: token }}

          await axios.post('http://192.168.51.241:5000/photographers/', photographer, config)
            .then(res => {
              // cartContext.getPhotographers();
              cartContext.handleNewPhotographerToggle();
            })
            .catch(err => console.log(err))
        } catch(err) { console.log(err) }
      } else setErr(1);
    }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Header navigation={props.navigation} />
      { cartContext.newPhotographerToggle ? <View style={styles.cover}></View> : null }
      { cartContext.newPhotographerToggle ? (
        <View style={styles.new_box}>
          <Text style={styles.new_title}>New Photographer</Text>
          <View style={styles.new_content}>
            <TextInput 
              style={[styles.input]}
              // autoCapitalize='none'
              placeholder={'Name'}
              placeholderTextColor='#393939'
              onChangeText={(e) => handlePhotographerName(e)}
              value={photographerName}>
            </TextInput>
            <TextInput 
              style={[styles.input]}
              // autoCapitalize='none'
              placeholder={'Instagram Handle'}
              placeholderTextColor='#393939'
              onChangeText={(e) => handlePhotographerInsta(e)}
              value={photographerInsta}>
            </TextInput>
            <TextInput 
              style={[styles.input]}
              // autoCapitalize='none'
              placeholder={'Image URL'}
              placeholderTextColor='#393939'
              onChangeText={(e) => handlePhotographerImage(e)}
              value={photographerImage}>
            </TextInput>
            <TextInput 
              style={[styles.input, styles.bio_intput]}
              // autoCapitalize='none'
              multiline={true}
              placeholder={'Bio'}
              placeholderTextColor='#393939'
              onChangeText={(e) => handlePhotographerBio(e)}
              value={photographerBio}>
            </TextInput>
          </View>
          <View style={styles.btns_box}>
            <TouchableOpacity style={styles.btn} onPress={ _ => handleCancel()}>
              <Text style={styles.btn_text}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.btn_add]} onPress={ _ => handleAdd()}>
              <Text style={styles.btn_text}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      ): null }
      <ScrollView contentContainerStyle={styles.scroll}>
        <PhotographersContent navigation={props.navigation} />  
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

    new_box: {
      width: Dimensions.get('screen').width - 80,
      // height: 320,
      borderRadius: 6,
      // borderWidth: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#fff',
      position: 'absolute',
      top: '18%',
      zIndex: 1,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.8,
      shadowRadius: 3.2,
      elevation: 8,
    },

      new_title: {
        fontWeight: 'bold',
        fontSize: 20,
        opacity: 0.6,
        marginTop: 30,
      },

      new_content: {
        marginTop: 15,
        marginBottom: 15,
      },

        input: {
          // borderWidth: 1,
          width: Dimensions.get('screen').width - 110,
          padding: 8,
          paddingLeft: 10,
          borderRadius: 4,
          backgroundColor: '#fff',
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.6,
          shadowRadius: 3.2,
          elevation: 4,
          marginTop: 12,
        },

        bio_intput: {
          height: 150,
          textAlignVertical: 'top',
        },

    btns_box: {
      // borderWidth: 1,
      width: Dimensions.get('screen').width - 110,
      marginBottom: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

      btn: {
        width: Dimensions.get('screen').width / 2 - 62,
        // borderWidth: 1,
        borderRadius: 4,
        backgroundColor: '#005575',
      },

      btn_add: {
        backgroundColor: '#009cd8',
      },

        btn_text: {
          textAlign: 'center',
          fontSize: 14,
          fontWeight: 'bold',
          color: '#fff',
          opacity: 0.9,
          padding: 10,
        },

  scroll: {

  },

    cover: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      opacity: 0.7,
      // borderWidth: 1,
      zIndex: 1,
      backgroundColor: '#fff',
      marginTop: 72,
    }
});
