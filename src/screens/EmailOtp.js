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
import { LocalizationContext } from '../context/LocalizationProvider';

//COMMON COMPONENT
import {Button, Header, Text, Input, BottomBackground} from '../components';
import OTPInputView from '@twotalltotems/react-native-otp-input';

function EmailOtp(props) {
  const [name, setName] = useState('');
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
      //style={styles.container}
      >
        <ScrollView
         // style={styles.container}
          showsVerticalScrollIndicator={false}>
          <Image
            source={IMAGES.email_verify_icon}
            style={{
              height: 274,
              width: 274,
              margin: 60,
              alignSelf: 'center',
              justifyContent: 'center',
            }}
          />

          <Input
            style={[styles.inputView, styles.inputContainer]}
            //placeholder={'omarbentchikou@hotmail.com'}
            editable={false}
            value={'omarbentchikou@hotmail.com'}
          />

          <Text
            style={[styles.inputContainer, styles.inputView,]}
            size="16"
            weight="600"
            align="right"
            color={COLORS.primaryColor}
            onPress={() => {
             // props.navigation.navigate('Register');
            }}>
            {getTranslation('change')}
          </Text>

          <Text
            style={[styles.inputContainer, styles.inputView,]}
            size="14"
            weight="700"
            align="left"
            color={COLORS.black}
            >
            {getTranslation('verify_email')}
          </Text>

            <Text
            style={[styles.inputContainer, styles.inputView,]}
            size="14"
            weight="600"
            align="left"
            color={COLORS.textColor}
            >
            { getTranslation('pls_enter_otp_sent_to') + ' omarbentchikou@hotmail.com'}
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
            style={[styles.inputContainer, styles.inputView,]}
            size="14"
            weight="600"
            align="center"
            color={COLORS.textColor}
            >
            {getTranslation('or')}
          </Text>

          <Text
            style={[styles.inputContainer, styles.inputView,]}
            size="14"
            weight="600"
            align="right"
            color={COLORS.textColor}
            >
            {getTranslation('resend') +' (180 s)'}
          </Text>

          <Button
            style={[styles.inputView, {marginTop: 40, marginBottom: 20}]}
            title={getTranslation('confirm')}
            onPress={() => {
              props.navigation.navigate('EmailSuccess')
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

export default EmailOtp;
