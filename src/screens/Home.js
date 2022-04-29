import React, { useEffect, useContext, useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  StatusBar,
  Toast,
  TouchableOpacity,
} from 'react-native';

//ASSETS
import { COLORS, IMAGES, DIMENSION } from '../assets';

//COMMON COMPONENT
import { Button, Header, Text, Input, BottomBackground } from '../components';
//CONTEXT
import { LocalizationContext } from '../context/LocalizationProvider';
import { APPContext } from '../context/AppProvider';
import { Buffer } from "buffer";
import PayPal from 'react-native-paypal-wrapper';

function Home(props) {
  const { getTranslation } = useContext(LocalizationContext);
  const { user } = useContext(APPContext);

  useEffect(() => { }, []);

  const oneTimePayment = () => {
  // 3 env available: NO_NETWORK, SANDBOX, PRODUCTION
      PayPal.initialize(PayPal.NO_NETWORK, "ATl0Dqkds4_r6fr-FJf5Fh5gskgjUguhiiWI4TMbDPT3JRoEufwUdrLtj-f-7Xw4n4du5Jruvvpez-xm");
      PayPal.pay({
        price: '10.00',
        currency: 'EUR',
        description: 'Product Ads Payment',
      }).then(confirm => console.log("PaymentResponse: ", confirm))
        .catch(error => console.log("PaymentError: ",error));
  
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.white} />
      <BottomBackground></BottomBackground>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            backgroundColor: COLORS.primaryColor,
            flex: 1,
            Top: 0,
            height: 350,
            width: '100%',
            position: 'absolute',
          }}></View>

        <Header
          title={
            getTranslation('hello') + ', ' + user.user_f_name + ' ' + user.user_l_name
          }
          onNotification={() => {
            props.navigation.navigate('Notification');
          }}
        />

        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1 }}>
            <Text
              style={{ marginTop: 20 }}
              size="22"
              weight="500"
              align="center"
              color={COLORS.white}>
              {getTranslation('choose')}
            </Text>

            <View
              style={{
                marginHorizontal: 20,
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                // position: 'absolute',
              }}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('AddProduct');
                }}>
                <View style={{}}>
                  <Image
                    source={IMAGES.home_user}
                    style={{
                      height: 90,
                      width: 90,
                      alignSelf: 'center',
                      justifyContent: 'center',
                      marginBottom: 5,
                    }}
                  />

                  <Text
                    size="14"
                    weight="500"
                    align="center"
                    color={COLORS.white}>
                    {getTranslation('user')}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('DescribePlaceOfDelivery');
                }}>
                <View style={{}}>
                  <Image
                    source={IMAGES.home_delivery_man}
                    style={{
                      height: 90,
                      width: 90,
                      alignSelf: 'center',
                      justifyContent: 'center',
                      marginBottom: 5,
                    }}
                  />

                  <Text
                    size="14"
                    weight="500"
                    align="center"
                    color={COLORS.white}>
                    {getTranslation('delivery_man')}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  //oneTimePayment();
                }}>
                <View style={{}}>
                  <Image
                    source={IMAGES.home_sender}
                    style={{
                      height: 90,
                      width: 90,
                      alignSelf: 'center',
                      justifyContent: 'center',
                      marginBottom: 5,
                    }}
                  />

                  <Text
                    size="14"
                    weight="500"
                    align="center"
                    color={COLORS.white}>
                    {getTranslation('sender_a_gift')}
                  </Text>
                </View>
              </TouchableOpacity>

            </View>

            <Image
              source={IMAGES.home_video_bg}
              style={[
                styles.inputView,
                {
                  height: 156,
                  width: 342,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  // position: 'absolute',
                  marginTop: 30,
                },
              ]}
            />

            <Image
              source={IMAGES.home_video_bg_comming_soon}
              style={[
                styles.inputView,
                {
                  height: 156,
                  width: 342,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  // position: 'absolute',
                  margin: 20,
                },
              ]}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1.0,
    //backgroundColor: COLORS.primaryColor,
  },
  inputView: {
    marginHorizontal: DIMENSION.marginHorizontal,
  },
});

export default Home;
