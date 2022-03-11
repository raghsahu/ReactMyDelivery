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

function ForgotPassword(props) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const { getTranslation} = useContext(LocalizationContext);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.primaryColor}
      />

      <BottomBackground></BottomBackground>

      <View
       style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}
      >
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
          {
            getTranslation('forgot_pw_screen_text')
          }
        </Text>

        <Input
          style={[styles.inputView, {marginTop: 20}]}
          placeholder={getTranslation('enter_email_mobile')}
          isLeft={IMAGES.message_icon}
          onChangeText={text => {
            setName(text);
          }}
        />

        <Button
          style={[styles.inputView, {marginTop: 40}]}
          title={getTranslation('send')}
          onPress={() => {
            props.navigation.navigate('ResetPassword');
          }}
        />
      </View>
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
