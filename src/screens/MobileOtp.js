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
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { LocalizationContext } from '../context/LocalizationProvider';

function MobileOtp(props) {
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const { getTranslation} = useContext(LocalizationContext);

  const onOTP = () => {
    // props.navigation.navigate('CreateNewPassword');
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.primaryColor}
      />
       <BottomBackground></BottomBackground>
      <SafeAreaView
      //style={{justifyContent: 'center', alignSelf: 'center'}}
      >
        <ScrollView
          //style={styles.container}
          showsVerticalScrollIndicator={false}>
          <Image
            source={IMAGES.logo_with_shadow}
            style={{
              height: 221,
              width: 221,
              marginTop: 90,
              alignSelf: 'center',
              justifyContent: 'center',
            }}
          />

          <Text
            style={[styles.inputContainer, styles.inputView]}
            size="24"
            weight="700"
            align="center"
            color={COLORS.black}>
            {getTranslation('enter_otp')}
          </Text>

          <Text
            style={[styles.inputContainer, styles.inputView]}
            size="14"
            weight="600"
            align="center"
            color={COLORS.textColor}>
            {
              getTranslation('pls_verify_mobile_to_continue') + ' * +91 - 0123456789'
            }
          </Text>

          <OTPInputView
            style={[styles.inputView, {height: 48, marginTop: 24}]}
            pinCount={6}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            // placeholderCharacter=''
            // placeholderTextColor={'rgba(64,86,124,1)'}
            onCodeFilled={code => {
              //console.log(`Code is ${code}, you are good to go!`);
            }}
          />

          <Text
            style={[styles.inputContainer, styles.inputView]}
            size="14"
            weight="600"
            align="center"
            color={COLORS.textColor}>
            {getTranslation('or')}
          </Text>

          <Text
            style={[styles.inputContainer, styles.inputView]}
            size="14"
            weight="600"
            align="right"
            color={COLORS.textColor}>
            {getTranslation('resend') +' (180 s)'}
          </Text>

          <Button
            style={[styles.inputView, {marginTop: 40}]}
            title={getTranslation('verify')}
            onPress={() => {
              props.navigation.navigate('SuccessScreen');
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

export default MobileOtp;
