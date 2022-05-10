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
import {APPContext} from '../context/AppProvider';
import Toast from 'react-native-simple-toast';
//COMMON COMPONENT
import {
  Button,
  Header,
  Text,
  Input,
  BottomBackground,
  ProgressView,
} from '../components';
import {LocalizationContext} from '../context/LocalizationProvider';

function ForgotPassword(props) {
  const [email_mobile, setEmailMobile] = useState('');
  const {getTranslation} = useContext(LocalizationContext);
  const [isLoading, setLoading] = useState(false);
  const {mForgot} = useContext(APPContext);

  const onNext = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (!email_mobile) {
      Toast.show(getTranslation('pls_enter_email_mobile'));
    } else if (isNaN(email_mobile)) {
      //if input is not a number then here
      if (reg.test(email_mobile) === false) {
        Toast.show(getTranslation('pls_enter_valid_email'));
      } else {
        getOtp(false);
      }
    } else {
      getOtp(true);
    }
  };

  const getOtp = async isMobile => {
    setLoading(true);
    const result = await mForgot(email_mobile, isMobile);
    setLoading(false);
    if (result.status == true) {
      // Toast.show(result.error);
      props.navigation.navigate('ResetPassword', {
        otpResponse: result.data,
      });
    } else {
      Toast.show(result.error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.primaryColor}
      />
      <BottomBackground></BottomBackground>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Image
          source={IMAGES.logo_with_shadow}
          style={{
            height: 258,
            width: 259,
            // marginTop: 99,
            alignSelf: 'center',
            justifyContent: 'center',
          }}
        />

        <Text
          style={[styles.inputContainer]}
          size="24"
          weight="700"
          align="center"
          color={COLORS.black}
          onPress={() => {}}>
          {getTranslation('forgot_pw')}
        </Text>

        <Text
          style={[styles.inputContainer, {marginHorizontal: 10}]}
          size="16"
          weight="600"
          align="center"
          color={COLORS.lightTextColor}
          onPress={() => {}}>
          {getTranslation('forgot_pw_screen_text')}
        </Text>

        <Input
          style={[styles.inputView, {marginTop: 20}]}
          placeholder={getTranslation('enter_email_mobile')}
          isLeft={IMAGES.message_icon}
          onChangeText={text => {
            setEmailMobile(text);
          }}
        />

        <Button
          style={[styles.inputView, {marginTop: 40}]}
          title={getTranslation('send')}
          onPress={() => {
            onNext();
          }}
        />
      </View>
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
});

export default ForgotPassword;
