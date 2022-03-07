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
import {COLORS, IMAGES} from '../assets';

//COMMON COMPONENT
import {Button, Header, Text, Input, BottomBackground} from '../components';

function Login(props) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.primaryColor}
      />

      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
        <BottomBackground></BottomBackground>

          <Image
            source={IMAGES.logo_with_shadow}
            style={{
              height: 258,
              width: 258,
              margin: 15,
              alignSelf: 'center',
              justifyContent: 'center',
            }}
          />

          <Text
            // style={[styles.inputContainer]}
            size="24"
            weight="700"
            align="center"
            color={COLORS.black}
            onPress={() => {}}>
            {'Login'}
          </Text>

          <Text
            style={{marginTop: 10}}
            size="16"
            weight="600"
            align="center"
            color={COLORS.lightTextColor}
            onPress={() => {}}>
            {'Login to your account'}
          </Text>

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={'Enter Email or Mobile'}
            isLeft={IMAGES.message_icon}
            onChangeText={text => {
              setName(text);
            }}
          />

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={'Enter Password'}
            secureTextEntry={true}
            isLeft={IMAGES.keys_icon}
            onChangeText={text => {
              // setPassword(text);
            }}
            isShow={() => {
              //props.navigation.navigate('Login')
            }}
          />

          <Button
            style={[styles.inputView, {marginTop: 40}]}
            title={'Login'}
            onPress={() => {
               props.navigation.navigate('BottomBar')
            }}
          />

          <Text
            style={[styles.inputContainer]}
            size="16"
            weight="600"
            align="center"
            color={COLORS.lightTextColor}
            onPress={() => {
              props.navigation.navigate('ForgotPassword');
            }}>
            {'Forgot your password?'}
          </Text>

          <View
            style={[
              styles.inputView,
              {
                flexDirection: 'row',
                alignSelf: 'center',
                marginTop: 20,
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
              {'Dont have an account?'}
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
              {'Sign Up'}
            </Text>
          </View>
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

export default Login;
