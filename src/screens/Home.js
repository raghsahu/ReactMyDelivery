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
import { requestOneTimePayment } from 'react-native-paypal';
import { Buffer } from "buffer";

function Home(props) {
  const { getTranslation } = useContext(LocalizationContext);
  const { user } = useContext(APPContext);

  useEffect(() => { }, []);

  const oneTimePayment = () => {
    fetch('https://api.sandbox.paypal.com/v1/oauth2/token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Accept-Language': 'en_US',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from('Aa7XIxm00s_oSNn9SAGKi1igvnzQxCrt3n0jIYMRnn7Ht2WL3vifepOgiv_aDra7vEXNXrn98s06Kazq:ELPGalRO8xjyzARHxFoYFF7-YzPLthTwviwMl6B7LvLseHjglPdNiCImqmU05ZiuGfFApM08hyKwGqGc').toString('base64')
      },
      body: 'grant_type=client_credentials'
    }).then(response => response.json())
      .then(async (data) => {
        console.log('AccessToken '+data.access_token)
        makePayment(data.access_token);

      }).catch(function (error) {
        let edata = error.message;
        console.log('Error:', edata)
    })
  }

  const makePayment = async (accessToken) => {
// For one time payments
    // const {
    //   nonce,
    //   payerId,
    //   email,
    //   firstName,
    //   lastName,
    //   phone
    // } = await requestOneTimePayment(
    //   accessToken,
    //   {
    //     amount: '5', // required
    //     // any PayPal supported currency (see here: https://developer.paypal.com/docs/integration/direct/rest/currency-codes/#paypal-account-payments)
    //     currency: 'EUR',
    //     // any PayPal supported locale (see here: https://braintree.github.io/braintree_ios/Classes/BTPayPalRequest.html#/c:objc(cs)BTPayPalRequest(py)localeCode)
    //     localeCode: 'en_GB', 
    //     shippingAddressRequired: false,
    //     userAction: 'commit', // display 'Pay Now' on the PayPal review page
    //     // one of 'authorize', 'sale', 'order'. defaults to 'authorize'. see details here: https://developer.paypal.com/docs/api/payments/v1/#payment-create-request-body
    //     intent: 'authorize', 
    //   }
    // );

    //************************** */
    const dataDetail = {
      "intent": "sale",
      "payer": {
          "payment_method": "paypal"
      },
      "transactions": [{
          "amount": {
              "total": '10',
              "currency": "EUR",
              "details": {
                  "subtotal": '10',
                  "tax": "0",
                  "shipping": "0",
                  "handling_fee": "0",
                  "shipping_discount": "0",
                  "insurance": "0"
              }
          }
      }],
      "redirect_urls": {
          "return_url": "https://example.com",
          "cancel_url": "https://example.com"
      }
 }

    let createRequest = {
      method: 'POST', 
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+(accessToken)
      },
      body:JSON.stringify(dataDetail)
     }
        console.log('Request body string',createRequest.body);
        console.log('Request body (formatted)', JSON.stringify( JSON.parse(createRequest.body) ,null,4) );
        fetch ('https://api.sandbox.paypal.com/v1/payments/payment',createRequest
      )
        .then(function(response) {
            console.log('Response object', response);
            return response.json()
        })
        .then(async(data) => {
            console.log('Response data',data);
            console.log('Response data (formatted)', JSON.stringify(data,null,4) );
        }).catch(err => {
            console.log({ ...err })
        })
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
                  // console.log(Buffer.from('Hello World!').toString('base64'));
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
