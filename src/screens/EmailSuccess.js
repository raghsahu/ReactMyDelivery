import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';

//ASSETS
import {COLORS, IMAGES, DIMENSION} from '../assets';

//COMMON COMPONENT
import {Button, Text, BottomBackground} from '../components';
import {LocalizationContext} from '../context/LocalizationProvider';

function EmailSuccess(props) {
  const {Mobile, Email} = props.route.params;
  const {getTranslation} = useContext(LocalizationContext);

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
          {getTranslation('success')}
        </Text>

        <Text
          style={[styles.inputContainer, styles.inputView]}
          size="16"
          weight="500"
          align="center"
          color={COLORS.textColor}>
          {getTranslation('your_email_confirmed')}
        </Text>

        <Button
          style={[{marginTop: 50}]}
          title={getTranslation('confirm_your_number')}
          onPress={() => {
            props.navigation.navigate('MobileOtp', {
              Mobile: Mobile,
              Email: Email,
            });
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

export default EmailSuccess;
