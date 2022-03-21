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
import { APPContext } from '../context/AppProvider';
import Toast from 'react-native-simple-toast';

//COMMON COMPONENT
import {Button, Header, Text, Input, BottomBackground, ProgressView} from '../components';

function Login(props) {
  const [email, setEmail] = useState('rrr@gmail.com');
  const [password, setPassword] = useState('123456');
  const [pwSecureText, setPwSecureText] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const {getTranslation} = useContext(LocalizationContext);
  const { getLogin } = useContext(APPContext);

  
  const onNext = async () => {
    setLoading(true)
   
    const result = await getLogin(email, password)
    setLoading(false)
     console.log("LoginResult", result);
    if (result.status == true) {
        setTimeout(() => {
            props.navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        { name: 'BottomBar', params: { isFromLogin: true } }
                    ],
                })
            );
        }, 500);
    }
    else {
        Toast.show(result.error)
    }
}


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
            source={IMAGES.logo_with_shadow}
            style={{
              height: 258,
              width: 258,
              marginTop: 25,
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
            {getTranslation('login')}
          </Text>

          <Text
            style={{marginTop: 10}}
            size="16"
            weight="600"
            align="center"
            color={COLORS.lightTextColor}
            onPress={() => {}}>
            {getTranslation('login_to_your_account')}
          </Text>

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('enter_email_mobile')}
            isLeft={IMAGES.message_icon}
            onChangeText={text => {
              setEmail(text);
            }}
            isShow={() => {
             
            }}
          />

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('enter_pw')}
            secureTextEntry={pwSecureText}
            isLeft={IMAGES.keys_icon}
            onChangeText={text => {
               setPassword(text);
            }}
            isShow={() => {
              setPwSecureText(!pwSecureText)
            }}
          />

          <Button
            style={[styles.inputView, {marginTop: 40}]}
            title={getTranslation('login')}
            onPress={() => {
                onNext()  
              //props.navigation.navigate('BottomBar');
            }}
          />

          <Text
            style={[{marginTop: 20}]}
            size="16"
            weight="600"
            align="center"
            color={COLORS.lightTextColor}
            onPress={() => {
              props.navigation.navigate('ForgotPassword');
            }}>
            {getTranslation('forgot_your_pw')}
          </Text>

          <View
            style={[
              styles.inputView,
              {
                flexDirection: 'row',
                alignSelf: 'center',
                marginTop: 30,
                marginBottom: 20,
              },
            ]}>
            <Text
              style={{alignSelf: 'center'}}
              size="16"
              weight="600"
              align="center"
              color={COLORS.lightTextColor}
              onPress={() => {}}>
              {getTranslation('dont_have_account')}
            </Text>

            <Text
              style={{alignSelf: 'center', marginLeft: 5}}
              size="18"
              weight="600"
              align="center"
              color={COLORS.primaryColor}
              onPress={() => {
                props.navigation.navigate('Register');
              }}>
              {getTranslation('sign_up')}
            </Text>
          </View>

        </ScrollView>
      </SafeAreaView>
      {isLoading ? 
      <ProgressView></ProgressView>
      : null
      }
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

export default Login;
