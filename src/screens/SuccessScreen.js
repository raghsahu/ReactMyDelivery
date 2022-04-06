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
import {LocalizationContext} from '../context/LocalizationProvider';
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
import {CommonActions} from '@react-navigation/native';

function SuccessScreen(props) {
  const {Mobile, Email} = props.route.params;
  const [email, setEmail] = useState('');
  const [isLoading, setLoading] = useState(false);
  const {getTranslation} = useContext(LocalizationContext);
  const {check_user, setUser, user} = useContext(APPContext);

  useEffect(() => {}, []);

  const onNext = async () => {
    setLoading(true);
    const result = await check_user('', Mobile);
    setLoading(false);
    if (result.status == true) {
      setUser(result.data[0]);
      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'BottomBar'}],
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

        <Button
          style={[styles.inputView, {marginTop: 50, width: 270}]}
          title={getTranslation('done')}
          onPress={() => {
            // onNext();
            props.navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'Login'}],
              }),
            );
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

export default SuccessScreen;
