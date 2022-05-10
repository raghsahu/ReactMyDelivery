import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  StatusBar,
  ImageBackground,
} from 'react-native';

//ASSETS
import {COLORS, IMAGES} from '../assets';

//COMMON COMPONENT
import {Button, Header, Text, Input} from '../components';

import {LocalizationContext} from '../context/LocalizationProvider';
import {APPContext} from '../context/AppProvider';
//PACKAGES
import {CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

function Splash(props) {
  const {getUserLanguage, setI18nConfig, getTranslation} =
    useContext(LocalizationContext);
  const {setUser, setFcmToken} = useContext(APPContext);

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    (async () => {
      getUserLanguage(res => {
        setI18nConfig(res);
        moveToNext();
      });
    })();
  }, []);

  const checkToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      setFcmToken(fcmToken);
     // console.log('fcm_token '+fcmToken);
    } 
   }

  const moveToNext = () => {
    AsyncStorage.getItem('user_login_data', (error, result) => {
      setTimeout(() => {
        if (result !== null) {
          let data = JSON.parse(result);
          setUser(data);
          props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'BottomBar'}],
            }),
          );
        } else {
          props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Login'}],
            }),
          );
        }
      }, 3000);
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.primaryColor}
      />

      <ImageBackground
        source={IMAGES.splash}
        style={{
          height: '100%',
          width: '100%',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1.0,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Splash;
