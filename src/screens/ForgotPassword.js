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

function ForgotPassword(props) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.primaryColor}
      />

         <BottomBackground></BottomBackground>

      <SafeAreaView>
        <ScrollView
          //style={styles.container}
          showsVerticalScrollIndicator={false}>
          <Image
            source={IMAGES.logo_with_shadow}
            style={{
              height: 258,
              width: 259,
              marginTop: 15,
              alignSelf: 'center',
              justifyContent: 'center',
            }}
          />

          <Text
            style={{marginTop: 10}}
            size="24"
            weight="700"
            align="center"
            color={COLORS.black}
            onPress={() => {}}>
            {'Forgot Password?'}
          </Text>

          <Text
            style={{marginHorizontal: 10, marginTop: 10}}
            size="16"
            weight="600"
            align="center"
            color={COLORS.lightTextColor}
            onPress={() => {}}>
            {
              'Please enter your register email id. You will recieve a code to create a new password via email id.'
            }
          </Text>

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={'Enter Email or Mobile'}
            isLeft={IMAGES.message_icon}
            onChangeText={text => {
              setName(text);
            }}
          />

          <Button
            style={[styles.inputView, {marginTop: 40}]}
            title={'Send'}
            onPress={() => {
              props.navigation.navigate('ResetPassword');
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

export default ForgotPassword;
