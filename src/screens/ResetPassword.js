import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  StatusBar,
} from 'react-native';

//ASSETS
import {COLORS, IMAGES, DIMENSION} from '../assets';
import {APPContext} from '../context/AppProvider';
import Toast from 'react-native-simple-toast';
import {CommonActions} from '@react-navigation/native';
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

function ResetPassword(props) {
  const {otpResponse} = props.route.params;
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {getTranslation} = useContext(LocalizationContext);
  const [pwSecureText, setPwSecureText] = useState(true);
  const [pwSecureText1, setPwSecureText1] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const {reset_password} = useContext(APPContext);

  useEffect(() => {
    setOtp(otpResponse.otp);
  }, []);
  const onNext = () => {
    if (!otp) {
      Toast.show(getTranslation('pls_enter_otp'));
    } else if (!password) {
      Toast.show(getTranslation('pls_enter_pw'));
    } else if (!password) {
      Toast.show(getTranslation('pls_enter_confirm_pw'));
    } else if (password != confirmPassword) {
      Toast.show(getTranslation('password_not_match'));
    } else if (otp != otpResponse.otp) {
      Toast.show(getTranslation('otp_not_match'));
    } else {
      resetPassword();
    }
  };

  const resetPassword = async () => {
    setLoading(true);
    const result = await reset_password(otpResponse.user_id, otp, password);
    setLoading(false);
    if (result.status == true) {
      Toast.show(result.error);
      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Login', params: {isFromLogin: false}}],
        }),
      );
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
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text
            style={{marginHorizontal: 10, marginTop: 33}}
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
              height: 300,
              width: '100%',
              marginTop: 20,
              alignSelf: 'center',
              justifyContent: 'center',
            }}
          />

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={'OTP'}
            //secureTextEntry={pwSecureText}
            isLeft={IMAGES.keys_icon}
            value={'' + otpResponse.otp}
            onChangeText={text => {
              setOtp(text);
            }}
          />

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('password')}
            secureTextEntry={pwSecureText}
            isLeft={IMAGES.keys_icon}
            onChangeText={text => {
              setPassword(text);
            }}
            isShow={() => {
              setPwSecureText(!pwSecureText);
            }}
          />

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('confirm_pw')}
            secureTextEntry={pwSecureText1}
            isLeft={IMAGES.keys_icon}
            onChangeText={text => {
              setConfirmPassword(text);
            }}
            isShow={() => {
              setPwSecureText1(!pwSecureText1);
            }}
          />

          <Button
            style={[styles.inputView, {marginTop: 40}]}
            title={getTranslation('change_pw')}
            onPress={() => {
              onNext();
            }}
          />
          <View style={{marginBottom: 30}}></View>
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
});

export default ResetPassword;
