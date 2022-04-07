import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

//ASSETS
import {COLORS, IMAGES, DIMENSION} from '../assets';
import {LocalizationContext} from '../context/LocalizationProvider';
import Toast from 'react-native-simple-toast';
import {APPContext} from '../context/AppProvider';

//COMMON COMPONENT
import {
  Button,
  Header,
  Text,
  Input,
  BottomBackground,
  ProgressView,
} from '../components';
import OTPInputView from '@twotalltotems/react-native-otp-input';

function EmailOtp(props) {
  const {Email, Mobile, CountryCode} = props.route.params;
  const [otp, setOtp] = useState('');
  const {getTranslation} = useContext(LocalizationContext);
  const {verification_update, verification} = useContext(APPContext);
  const [isLoading, setLoading] = useState(false);
  const [serverOtp, setServerOtp] = useState('');
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        clearInterval(myInterval);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  useEffect(() => {
    getEmailOtp();
  }, []);

  const getEmailOtp = async () => {
    setLoading(true);
    const result = await verification(Email, null);
    setLoading(false);
    if (result.status == true) {
      Toast.show(result.error);
      setServerOtp(result.data.otp);
      setOtp(result.data.otp);
      setSeconds(180);
    } else {
      Toast.show(result.error);
    }
  };

  const onNext = async () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (!otp) {
      Toast.show('Please enter otp');
    } else if (otp != serverOtp) {
      Toast.show('Otp did not match');
    } else {
      setLoading(true);
      const result = await verification_update(Email, otp, null);
      setLoading(false);
      console.log('EmailOtpResult', result);
      if (result.status == true) {
        props.navigation.navigate('EmailSuccess', {
          Mobile: Mobile,
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
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image
            source={IMAGES.email_verify_icon}
            style={{
              height: 274,
              width: 274,
              marginTop: 40,
              alignSelf: 'center',
              justifyContent: 'center',
            }}
          />

          <Input
            style={[styles.inputView, styles.inputContainer, {marginTop: 30}]}
            editable={false}
            value={Email}
          />

          <Text
            style={[styles.inputContainer, styles.inputView]}
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
            style={[styles.inputContainer, styles.inputView]}
            size="14"
            weight="700"
            align="left"
            color={COLORS.black}>
            {getTranslation('verify_email')}
          </Text>

          <Text
            style={[styles.inputContainer, styles.inputView]}
            size="14"
            weight="600"
            align="left"
            color={COLORS.textColor}>
            {getTranslation('pls_enter_otp_sent_to') + ' ' + Email}
          </Text>

          <OTPInputView
            style={[styles.inputView, {height: 48, marginTop: 24}]}
            pinCount={6}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            // placeholderCharacter=''
            // placeholderTextColor={'rgba(64,86,124,1)'}
            code={'' + otp}
            onCodeFilled={code => {
              //console.log(`Code is ${code}, you are good to go!`);
              setOtp(code);
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

          <TouchableOpacity
            onPress={seconds === 0 ? getEmailOtp : null}
            style={[styles.inputContainer, styles.inputView]}>
            <Text
              size="14"
              weight="600"
              align="right"
              color={seconds === 0 ? COLORS.primaryColor : COLORS.textColor}>
              {getTranslation('resend') + ' (' + seconds + 's)'}
            </Text>
          </TouchableOpacity>

          <Button
            style={[styles.inputView, {marginTop: 40, marginBottom: 20}]}
            title={getTranslation('confirm')}
            onPress={() => {
              onNext();
            }}
          />
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

export default EmailOtp;
