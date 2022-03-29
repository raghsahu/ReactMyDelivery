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
import {COLORS, IMAGES, DIMENSION} from '../assets';

//COMMON COMPONENT
import {Button, Header, Text, Input, BottomBackground, ProgressView} from '../components';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { LocalizationContext } from '../context/LocalizationProvider';
import {APPContext} from '../context/AppProvider';
import Toast from 'react-native-simple-toast';

function MobileOtp(props) {
  const {Mobile, Email} = props.route.params;
  const [otp, setOtp] = useState('');
  const [mobile, setMobile] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [serverOtp, setServerOtp] = useState('');
  const { getTranslation} = useContext(LocalizationContext);
  const {verification_update, verification, user} = useContext(APPContext);

  useEffect(() => {
    setMobile(user.user_mb_no)
    getMobileOtp();
    
  }, []);

  const getMobileOtp = async () => {
    setLoading(true);
    const result = await verification('', mobile ? mobile : Mobile);
    setLoading(false);
    console.log('MobileServerOtp ', result);
    if (result.status == true) {
      Toast.show(result.error);
      setServerOtp(result.data.otp)
      setOtp(result.data.otp)
    } else {
      Toast.show(result.error);
    }
  };


  const onNext = async () => {
    if (!otp) {
      Toast.show('Please enter otp');
     }
    else if(otp != serverOtp){
      Toast.show('Otp did not match');
    }
    else{
      setLoading(true);
      const result = await verification_update('', otp , mobile);
      setLoading(false);
      console.log('EmailOtpResult', result);
      if (result.status == true) {
       // Toast.show(result.error);
       props.navigation.navigate('SuccessScreen', {
         Mobile :  mobile ? mobile : Mobile,
         Email: Email,
       });
      } else {
        Toast.show(result.error);
      }
    }

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
              getTranslation('pls_verify_mobile_to_continue') + ' * ' + Mobile
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
            code={""+otp}
            onCodeFilled={code => {
              setOtp(code)
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
            size="16"
            weight="500"
            align="right"
            color={COLORS.primaryColor}>
            {getTranslation('resend') +' OTP (180 s)'}
          </Text>

          <Button
            style={[styles.inputView, {marginTop: 40}]}
            title={getTranslation('verify')}
            onPress={() => {
              onNext();
            
            }}
          />
          <View
           style={{marginBottom: 30}}
          ></View>
        </ScrollView>
      </SafeAreaView>
      {isLoading ? <ProgressView></ProgressView> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1.0,
    backgroundColor: COLORS.white,
  },
  inputView: {
    marginHorizontal: DIMENSION.marginHorizontal,
  },
  inputContainer: {
    marginTop: 16,
  },
  otpView: {
    marginHorizontal: DIMENSION.marginHorizontal,
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
