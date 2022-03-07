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

function Splash(props) {

  useEffect(() => {
        setTimeout(() => {
            moveToNext()
        }, 2000);
        return () => { }
    }, [])

     const moveToNext = () => {
        // AsyncStorage.getItem('login_user_details', (err, result) => {
        //     if (result) {
        //         let obj = JSON.parse(result)
        //         setLoggedInUser(obj)
        //         setTimeout(() => {
        //             navigate({ props, name: 'HomeScreen', index: 0, navType: 'reset' });
        //         }, 3000);

        //     } else {
                props.navigation.navigate({ props, name: 'Login', index: 0, navType: 'reset' });
           // }
       // })
    }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.primaryColor}
      />

        <ImageBackground
          source={IMAGES.splash}
          style={{
            height: "100%",
            width: "100%",
           
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
  inputView: {
    marginHorizontal: 30,
  },
  inputContainer: {
    marginTop: 16,
  },
  otpView: {
    marginHorizontal: 20,
    alignSelf: 'center',
  },
  underlineStyleBase: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.lightGray,
    color: COLORS.black,
  },
  underlineStyleHighLighted: {
    borderColor: COLORS.primaryColor,
    color: COLORS.black,
  },
});

export default Splash;
