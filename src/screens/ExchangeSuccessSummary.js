import React, {useEffect, useContext, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Modal,
  Dimensions,
  FlatList,
} from 'react-native';

//ASSETS
import {COLORS, IMAGES} from '../assets';

//COMMON COMPONENT
import {
  Button,
  Text,
  Input,
  Header,
  BottomBackground,
  RadioButtons,
  CheckBox,
  ProductsItemListCompleted,
} from '../components';

const {height, width} = Dimensions.get('screen');
import OTPInputView from '@twotalltotems/react-native-otp-input';

function ExchangeSuccessSummary(props) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.primaryColor} />

      <SafeAreaView style={styles.container}>
        {/* <Header
          title={'Summary of the Transaction'}
          onBack={() => {
            props.navigation.goBack();
          }}
        /> */}
        <BottomBackground></BottomBackground>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          <Image
            source={IMAGES.right_tick_icon}
            style={{
              height: 60,
              width: 60,
              marginTop: 20,
              alignSelf: 'center',
              justifyContent: 'center',
            }}
          />
          <Text
            style={[styles.inputView, {width: 298, marginTop: 20}]}
            size="20"
            weight="600"
            align="center"
            color={COLORS.black}>
            {'Exchange Completed Successfully'}
          </Text>

          <View
            style={[
              styles.inputView,
              {
                backgroundColor: COLORS.lightGray,
                marginTop: 15,
                height: 120,
                justifyContent: 'center',
                alignItems: 'center',
                //alignSelf: 'center'
                padding: 10,
              },
            ]}>
            <Text
              style={
                {
                  //marginLeft: 10,
                }
              }
              color={COLORS.primaryColor}
              size="16"
              weight="500">
              {'€600 + €32,4 + €8,1 = €638'}
            </Text>

            <Text
              style={{justifyContent: 'center', alignSelf: 'center'}}
              color={COLORS.black}
              size="18"
              weight="500">
              {'is credited to the account of John Ben'}
            </Text>
          </View>

          <Text
            style={[styles.inputView, {width: 298, marginTop: 20}]}
            size="20"
            weight="600"
            align="center"
            color={COLORS.black}>
            {'Thank you! for having used'}
          </Text>

          <Text
            style={[styles.inputView]}
            size="20"
            weight="600"
            align="center"
            color={COLORS.primaryColor}>
            {'DelivrEx'}
          </Text>

          <Button
            style={{
              marginHorizontal: 20,
              marginBottom: 20,
              marginTop: 20,
              justifyContent: 'center',
              alignSelf: 'center',
              width: 240,
            }}
            title={'Comment & Rating'}
            type={1}
            onPress={() => {
              props.navigation.navigate('RatingReview');
            }}
          />

          <View
            style={{
              height: 10,
              backgroundColor: COLORS.lightGray,
              marginTop: 10,
            }}></View>

          <Text
            style={[styles.inputView, {marginTop: 20}]}
            size="18"
            weight="500"
            align="left"
            color={COLORS.textColor}>
            {'Summary of transaction'}
          </Text>

          <FlatList
            showsVerticalScrollIndicator={false}
            data={['', '']}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return <ProductsItemListCompleted />;
            }}
          />

          <View style={[styles.inputView, {marginTop: 10, marginBottom: 20}]}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text style={{}} color={COLORS.black} size="16" weight="600">
                {'Global Commission :'}
              </Text>

              <Text
                style={{
                  marginLeft: 10,
                }}
                color={COLORS.Darkgray}
                size="16"
                weight="500">
                {'€ 3.00'}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text style={{}} color={COLORS.black} size="16" weight="600">
                {'Deliveryman Commission:'}
              </Text>

              <Text
                style={{
                  marginLeft: 10,
                }}
                color={COLORS.Darkgray}
                size="16"
                weight="500">
                {'€ 3.00'}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text style={{}} color={COLORS.black} size="16" weight="600">
                {'Ad Seen By :'}
              </Text>

              <Text
                style={{
                  marginLeft: 10,
                }}
                color={COLORS.Darkgray}
                size="16"
                weight="500">
                {'Both'}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text style={{}} color={COLORS.black} size="16" weight="600">
                {'Acceptance Limit : '}
              </Text>

              <Text
                style={{
                  marginLeft: 10,
                }}
                color={COLORS.darkGray}
                size="16"
                weight="500">
                {'2022-01-15 12:00'}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text style={{}} color={COLORS.black} size="16" weight="600">
                {'Delivery Limit:'}
              </Text>

              <Text
                style={{
                  marginLeft: 10,
                }}
                color={COLORS.darkGray}
                size="16"
                weight="500">
                {'2022-01-22    12:00'}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text style={{}} color={COLORS.black} size="16" weight="600">
                {'Place of Delivery :'}
              </Text>

              <Text
                style={{
                  marginLeft: 10,
                  width: 200,
                }}
                color={COLORS.darkGray}
                size="16"
                weight="500">
                {'Warje, Pune'}
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: COLORS.gray,
              height: 2,
              marginTop: 10,
            }}></View>

          <View style={[styles.inputView, {marginTop: 10, marginBottom: 20}]}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text style={{}} color={COLORS.black} size="18" weight="500">
                {'Delivery Details'}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text style={{}} color={COLORS.black} size="16" weight="600">
                {'Deliveryman:'}
              </Text>

              <Text
                style={{
                  marginLeft: 10,
                }}
                color={COLORS.primaryColor}
                size="16"
                weight="500">
                {'Omar Benchikou'}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text style={{}} color={COLORS.black} size="16" weight="600">
                {'Delivery Date :'}
              </Text>

              <Text
                style={{
                  marginLeft: 10,
                }}
                color={COLORS.primaryColor}
                size="16"
                weight="500">
                {'2022-01-15'}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text style={{}} color={COLORS.black} size="16" weight="600">
                {'Delivery Time: '}
              </Text>

              <Text
                style={{
                  marginLeft: 10,
                }}
                color={COLORS.primaryColor}
                size="16"
                weight="500">
                {'12:00'}
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: COLORS.gray,
              height: 2,
              marginTop: 10,
            }}></View>

          <View
            style={[
              styles.inputView,
              {
                flexDirection: 'row',
                marginTop: 10,
              },
            ]}>
            <Text style={{}} color={COLORS.black} size="16" weight="600">
              {'Delivered on:'}
            </Text>

            <Text
              style={{
                marginLeft: 10,
              }}
              color={COLORS.primaryColor}
              size="16"
              weight="500">
              {'2020-04-02 12:05 by John Ben'}
            </Text>
          </View>

          <View
            style={[
              styles.inputView,
              {
                flexDirection: 'row',
                marginTop: 15,
              },
            ]}>
            <Text style={{}} color={COLORS.black} size="16" weight="600">
              {'Total to Pay :'}
            </Text>

            <Text
              style={{
                marginLeft: 10,
              }}
              color={COLORS.darkGray}
              size="16"
              weight="500">
              {'€600 + €32,4 + €8,1 = €638'}
            </Text>
          </View>

          <View
            style={{
              marginHorizontal: 20,
              marginBottom: 20,
              marginTop: 30,
              justifyContent: 'center',
            }}>
            <Button
              title={'Done'}
              onPress={() => {
                props.navigation.navigate('Home');
              }}
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
    backgroundColor: COLORS.white,
  },
  inputView: {
    marginHorizontal: 30,
  },
  inputContainer: {
    marginTop: 16,
  },
  viewWrapper: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalView1: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    elevation: 5,
    transform: [{translateX: -(width * 0.4)}, {translateY: -90}],
    height: 320,
    width: width * 0.83,
    backgroundColor: '#fff',
    borderRadius: 7,
  },
  otpView: {
    marginHorizontal: 5,
    alignSelf: 'center',
  },
  underlineStyleBase: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.lightGray,
    color: COLORS.black,
  },
  underlineStyleHighLighted: {
    borderColor: COLORS.primaryColor,
    color: COLORS.black,
  },
});

export default ExchangeSuccessSummary;
