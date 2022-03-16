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
import {
  Button,
  Text,
  Input,
  Header,
  BottomBackground,
  RadioButtons,
  CheckBox,
} from '../components';
//CONTEXT
import { LocalizationContext } from '../context/LocalizationProvider';

const {height, width} = Dimensions.get('screen');

function AddProductSummary(props) {
  const [name, setName] = useState('');
  const [isSelected, setSelection] = useState(false);
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const { getTranslation} = useContext(LocalizationContext);

  const logoutModalVisibility = () => {
    setLogoutModalVisible(!isLogoutModalVisible);
  };

  const setCheck = checkStatus => {
    setSelection(checkStatus);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.primaryColor} />
         <BottomBackground></BottomBackground>
      <SafeAreaView
       style={styles.container}
       >
        <Header
          title={getTranslation('summary')}
          onBack={() => {
            props.navigation.goBack();
          }}
        />

        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          <Text
            style={[{backgroundColor: COLORS.white, padding: 10}]}
            size="18"
            weight="500"
            align="center"
            color={COLORS.textColor}>
            {getTranslation('summary')}
          </Text>

          <View
            style={[
              {
                // marginTop: 20,
                backgroundColor: COLORS.lightGray,
                // borderWidth: 0.4,
                height: 10,
              },
            ]}></View>

          <Image
            style={{
              width: 300,
              height: 300,
              borderRadius: 35,
              marginHorizontal: 5,
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: 5,
            }}
            source={IMAGES.product_placeholder}
          />

          <View style={[styles.inputView, {marginTop: 20}]}>
            <Text
              // style={[styles.inputView]}
              size="20"
              weight="500"
              align="left"
              color={COLORS.textColor}>
              {'Stylo'}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text style={{}} color={COLORS.black} size="16" weight="600">
                {getTranslation('web_link') +' :'}
              </Text>

              <Text
                style={{
                  marginLeft: 10,
                }}
                color={'#35CCC1'}
                size="16"
                weight="500">
                {'www.com'}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text style={{}} color={COLORS.black} size="16" weight="600">
                {getTranslation('place_to_buy') }
              </Text>

              <Text
                style={{
                  marginLeft: 10,
                }}
                color={COLORS.darkGray}
                size="16"
                weight="500">
                {''}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text style={{}} color={COLORS.black} size="16" weight="600">
                {getTranslation('price') +' :'}
              </Text>

              <Text
                style={{
                  marginLeft: 10,
                }}
                color={COLORS.primaryColor}
                size="16"
                weight="500">
                {'€ 2.00 x 1 = € 2.00'}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text style={{}} color={COLORS.black} size="16" weight="600">
                {getTranslation('additional_info')}
              </Text>

              <Text
                style={{
                  marginLeft: 10,
                }}
                color={COLORS.darkGray}
                size="16"
                weight="500">
                {''}
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: COLORS.gray,
              height: 2,
              marginTop: 20,
            }}></View>

          <View style={[styles.inputView, {marginTop: 20}]}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text style={{}} color={COLORS.black} size="16" weight="500">
                {getTranslation('ad_seen_by')}
              </Text>

              <Text
                style={{
                  marginLeft: 10,
                }}
                color={COLORS.Darkgray}
                size="16"
                weight="500">
                {getTranslation('both')}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text style={{}} color={COLORS.black} size="16" weight="500">
                {getTranslation('acceptance_limit')}
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
              <Text style={{}} color={COLORS.black} size="16" weight="500">
                {getTranslation('delivery_limit')}
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
              <Text style={{}} color={COLORS.black} size="16" weight="500">
                {getTranslation('place_of_delivery') +' :'}
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
          </View>

          <View
            style={[
              styles.inputView,
              {
                flexDirection: 'row',
                marginTop: 15,
                justifyContent: 'space-between',
              },
            ]}>
            <Text
              style={{justifyContent: 'center', alignSelf: 'center'}}
              color={COLORS.darkGray}
              size="14"
              align="center"
              weight="500">
              {getTranslation('total_price')}
            </Text>

            <Text
              style={{justifyContent: 'center', alignSelf: 'center'}}
              color={COLORS.darkGray}
              size="14"
              align="center"
              weight="500">
              {getTranslation('deliveryman_commission')}
            </Text>

            <Text
              style={{justifyContent: 'center', alignSelf: 'center'}}
              color={COLORS.darkGray}
              size="14"
              align="center"
              weight="500">
              {getTranslation('fees')}
            </Text>
          </View>

          <View
            style={[
              styles.inputView,
              {
                flexDirection: 'row',
                marginTop: 5,
                justifyContent: 'space-between',
              },
            ]}>
            <Text
              style={{
                backgroundColor: COLORS.lightGray,
                width: 70,
                padding: 8,
                marginTop: 10,
                borderRadius: 24,
                justifyContent: 'center',
                alignSelf: 'center',
              }}
              color={COLORS.black}
              size="16"
              align="center"
              weight="500">
              {'2.00'}
            </Text>

            <Image
              tintColor={COLORS.black}
              style={{
                width: 18,
                height: 18,
                marginHorizontal: 5,
                justifyContent: 'center',
                alignSelf: 'center',
              }}
              source={IMAGES.plus}></Image>

            <Text
              style={{
                backgroundColor: COLORS.lightGray,
                width: 70,
                padding: 8,
                marginTop: 10,
                borderRadius: 24,
                justifyContent: 'center',
              }}
              color={COLORS.black}
              size="16"
              align="center"
              weight="500">
              {'2.00'}
            </Text>

            <Image
              tintColor={COLORS.black}
              style={{
                width: 18,
                height: 18,
                marginHorizontal: 5,
                justifyContent: 'center',
                alignSelf: 'center',
              }}
              source={IMAGES.plus}></Image>

            <Text
              style={{
                backgroundColor: COLORS.lightGray,
                width: 70,
                padding: 8,
                marginTop: 10,
                borderRadius: 24,
                justifyContent: 'center',
              }}
              color={COLORS.black}
              size="16"
              align="center"
              weight="500">
              {'2.00'}
            </Text>
          </View>

          <Text
            style={{marginRight: 20, marginTop: 10}}
            color={COLORS.primaryColor}
            size="16"
            weight="500"
            align={'right'}>
            {getTranslation('info')}
          </Text>

          <View
            style={[
              styles.inputView,
              {
                flexDirection: 'row',
                marginTop: 15,
              },
            ]}>
            <Text style={{}} color={COLORS.black} size="16" weight="600">
              {getTranslation('total_to_pay')}
            </Text>

            <Text
              style={{
                marginLeft: 10,
              }}
              color={COLORS.darkGray}
              size="16"
              weight="500">
              {'€ 4.00'}
            </Text>
          </View>

          <CheckBox
            isSelected={isSelected}
            text={getTranslation('contract_terms')}
            onChecked={setCheck}
          />

          <Button
            style={[styles.inputView, {marginTop: 30, marginBottom: 30}]}
            title={getTranslation('accept')}
            onPress={() => {
              logoutModalVisibility();
            }}
          />

        </ScrollView>
   
      </SafeAreaView>

      <Modal
        animationType="slide"
        transparent
        visible={isLogoutModalVisible}
        presentationStyle="overFullScreen"
        onDismiss={logoutModalVisibility}>
        <View style={styles.viewWrapper}>
          <View style={styles.modalView1}>
            <Text
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                height: 40,
                padding: 5,
                backgroundColor: COLORS.primaryColor,
                width: '100%',
              }}
              size="18"
              weight="500"
              align="center"
              color={COLORS.white}>
              {getTranslation('payment')}
            </Text>

            <TouchableOpacity
              style={{
                width: 24,
                height: 24,
                position: 'absolute',
                margin: 5,
                justifyContent: 'center',
                right: 0,
              }}
              onPress={() => {
                logoutModalVisibility();
              }}>
              <Image
                style={{
                  width: 24,
                  height: 24,
                }}
                source={IMAGES.close}
              />
            </TouchableOpacity>

            <Text
              style={{marginTop: 10}}
              size="18"
              weight="500"
              align="center"
              color={COLORS.darkGray}>
              {getTranslation('total_payment')}
            </Text>

            <Text
              style={{marginTop: 10}}
              size="18"
              weight="500"
              align="center"
              color={COLORS.primaryColor}>
              {'€ 4.00'}
            </Text>

            <Text
              style={{marginTop: 10}}
              size="16"
              weight="400"
              align="center"
              color={COLORS.darkGray}>
              {getTranslation('redirected_to_payment')}
            </Text>

            <View
              style={{
                marginHorizontal: 20,
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'center',
                // position: 'absolute',
              }}>
              <Button
                style={[
                  // styles.inputView,
                  {width: 200, justifyContent: 'center', alignSelf: 'center'},
                ]}
                title={getTranslation('ok')}
                onPress={() => {
                  logoutModalVisibility();
                  props.navigation.navigate('MyAccount');
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
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
    height: 250,
    width: width * 0.85,
    backgroundColor: '#fff',
    borderRadius: 7,
  },
});

export default AddProductSummary;
