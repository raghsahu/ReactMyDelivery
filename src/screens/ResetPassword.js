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
import { LocalizationContext } from '../context/LocalizationProvider';

function ResetPassword(props) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const { getTranslation} = useContext(LocalizationContext);
  const [pwSecureText, setPwSecureText] = useState(true);
  const [pwSecureText1, setPwSecureText1] = useState(true);

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
            style={{marginHorizontal: 10, marginTop: 73}}
            size="24"
            weight="400"
            align="center"
            color={COLORS.lightTextColor}
            onPress={() => {}}>
            {getTranslation('pls_reset_your_pw')}
          </Text>

          <Image
            source={IMAGES.reset_pw_icon}
            style={{
              height: 347,
              width: '100%',
              marginTop: 20,
              alignSelf: 'center',
              justifyContent: 'center',
            }}
          />

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('password')}
            secureTextEntry={pwSecureText}
            isLeft={IMAGES.keys_icon}
            onChangeText={text => {
              // setPassword(text);
            }}
            isShow={() => {
              setPwSecureText(!pwSecureText)
            }}
          />

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('confirm_pw')}
            secureTextEntry={pwSecureText1}
            isLeft={IMAGES.keys_icon}
            onChangeText={text => {
              // setPassword(text);
            }}
            isShow={() => {
              setPwSecureText1(!pwSecureText1)
            }}
          />

          <Button
            style={[styles.inputView, {marginTop: 40}]}
            title={getTranslation('change_pw')}
            onPress={() => {
              props.navigation.navigate('Login');
            }}
          />
          <View
           style={{marginBottom: 30}}
          ></View>
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
