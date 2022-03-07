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
import {Button, Header, Text, Input, BottomBackground} from '../components';

function ResetPassword(props) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.primaryColor}
      />

    <BottomBackground></BottomBackground>

      <SafeAreaView 
      //style={styles.container}
      >
        <ScrollView
         // style={styles.container}
          showsVerticalScrollIndicator={false}>
          <Text
            style={{marginHorizontal: 10, marginTop: 20}}
            size="24"
            weight="400"
            align="center"
            color={COLORS.lightTextColor}
            onPress={() => {}}>
            {'Please reset your password'}
          </Text>

          <Image
            source={IMAGES.reset_pw_icon}
            style={{
              height: 300,
              width: '100%',
              marginTop: 10,
              alignSelf: 'center',
              justifyContent: 'center',
            }}
          />

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={'Password'}
            secureTextEntry={true}
            isLeft={IMAGES.keys_icon}
            onChangeText={text => {
              // setPassword(text);
            }}
            isShow={() => {
              //props.navigation.navigate('Login')
            }}
          />

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={'Confirm Password'}
            secureTextEntry={true}
            isLeft={IMAGES.keys_icon}
            onChangeText={text => {
              // setPassword(text);
            }}
            isShow={() => {
              //props.navigation.navigate('Login')
            }}
          />

          <Button
            style={[styles.inputView, {marginTop: 40}]}
            title={'Change Password'}
            onPress={() => {
               props.navigation.navigate('Login')
            }}
          />
        </ScrollView>
      </SafeAreaView>

    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1.0,
    backgroundColor: COLORS.white,
  },
  inputView: {
    marginHorizontal: 30,
  },
  inputContainer: {
    marginTop: 16,
  },
});

export default ResetPassword;
