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

function EmailSuccess(props) {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.primaryColor}
      />

      <BottomBackground></BottomBackground>

      <View>
        <Image
          source={IMAGES.right_tick_icon}
          style={{
            height: 144,
            width: 144,
            marginBottom: 30,
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
          {'Success'}
        </Text>

        <Text
          style={[styles.inputContainer, styles.inputView]}
          size="16"
          weight="500"
          align="center"
          color={COLORS.textColor}>
          {'Your email address is confirmed'}
        </Text>

        <Button
          style={[{marginTop: 50}]}
          title={'Confirm Phone Number'}
          onPress={() => {
            props.navigation.navigate('MobileOtp');
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
    alignItems: 'center',
    justifyContent: 'center',
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

export default EmailSuccess;
