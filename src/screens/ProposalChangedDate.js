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
} from 'react-native';

//ASSETS
import {COLORS, IMAGES} from '../assets';

//COMMON COMPONENT
import {Button, Text, Input, Header, BottomBackground} from '../components';

const {height, width} = Dimensions.get('screen');

function ProposalChangedDate(props) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.primaryColor} />

      <SafeAreaView style={styles.container}>
        <Header
          title={'Proposal Changing Date & Time'}
          onBack={() => {
            props.navigation.goBack();
          }}
        />
        <BottomBackground></BottomBackground>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          <Text
            style={[
              styles.inputView,
              {marginTop: 20, width: 250, alignSelf: 'center'},
            ]}
            size="18"
            weight="600"
            align="center"
            color={COLORS.textColor}>
            {'Proposal to change the Delivery Date & Time'}
          </Text>

          <View
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
              marginTop: 20,
              width: '85%',
              height: 167,
              shadowColor: 'black',
              shadowOpacity: 0.26,
              shadowOffset: {width: 0, height: 2},
              shadowRadius: 10,
              elevation: 3,
              borderRadius: 12,
              backgroundColor: COLORS.lightGray,
              flex: 1,
            }}>
            <Image
              style={{
                width: 97,
                height: 97,
                margin: 5,
                borderRadius: 97 / 2,
                resizeMode: 'contain',
              }}
              source={IMAGES.circle_placeholder}
            />

            <Text color={COLORS.black} size="18" weight="500">
              {'Omar Bentchikou'}
            </Text>
          </View>

          <View
            style={[
              styles.inputView,
              {
                flexDirection: 'row',
                marginTop: 20,
              },
            ]}>
            <Text style={{}} color={COLORS.black} size="16" weight="600">
              {'Old Delivery Date : '}
            </Text>

            <Text
              style={{
                marginLeft: 10,
              }}
              color={COLORS.darkGray}
              size="16"
              weight="500">
              {'2022-01-15 12:15'}
            </Text>
          </View>

          <View
            style={[
              styles.inputView,
              {
                flexDirection: 'row',
                marginTop: 10,
              },
            ]}>
            <Text style={{}} color={COLORS.black} size="16" weight="600">
              {'New Delivery Date :'}
            </Text>

            <Text
              style={{
                marginLeft: 10,
              }}
              color={COLORS.primaryColor}
              size="16"
              weight="500">
              {'2022-01-15 12:15'}
            </Text>
          </View>

          <View
            style={[
              {
                height: 10,
                backgroundColor: COLORS.lightGray,
                marginTop: 10,
              },
            ]}></View>

          <View
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: 20,
              width: '85%',
              height: 110,
              shadowColor: 'black',
              shadowOpacity: 0.26,
              shadowOffset: {width: 0, height: 2},
              shadowRadius: 10,
              elevation: 3,
              borderRadius: 12,
              backgroundColor: 'white',
              flex: 1,
              flexDirection: 'row',
            }}>
            <Image
              style={{
                width: 74,
                height: 99,
                margin: 5,
                //resizeMode: 'contain',
              }}
              source={IMAGES.product_placeholder}
            />

            <View
              style={{
                flex: 1,
                margin: 5,
                justifyContent: 'center',
              }}>
              <Text color={COLORS.black} size="16" weight="500">
                {'souris'}
              </Text>

                  <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text style={{}} color={COLORS.black} size="16" weight="600">
                {'Web Link : '}
              </Text>

              <Text
                style={{
                  marginLeft: 10,
                }}
                color={'#35CCC1'}
                size="16"
                weight="500">
                {'hp.com'}
              </Text>
            </View>
            </View>
          </View>

          <View style={[styles.inputView, {marginTop: 20, marginBottom: 20}]}>
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
                {'Constantine Constantine Algerie'}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text style={{}} color={COLORS.black} size="16" weight="600">
                {'Price : '}
              </Text>

              <Text
                style={{
                  marginLeft: 10,
                  width: 200,
                }}
                color={COLORS.darkGray}
                size="16"
                weight="500">
                {'$10'}
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
          </View>

          <View
            style={{
              marginHorizontal: 20,
              marginBottom: 20,
              marginTop: 30,
              flexDirection: 'row',
              justifyContent: 'space-between',
              // position: 'absolute',
            }}>
            <Button
              style={[{width: 156}]}
              title={'Refuse'} //or Change Delivery Date (according to condition)
              onPress={() => {props.navigation.goBack();
              }}
            />

            <Button
              style={[{width: 156}]}
              title={'Accept'}
              onPress={() => {
                props.navigation.goBack();
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

export default ProposalChangedDate;
