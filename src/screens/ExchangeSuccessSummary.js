import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  StatusBar,
  Dimensions,
  FlatList,
  BackHandler,
} from 'react-native';

//ASSETS
import {COLORS, IMAGES, DIMENSION} from '../assets';

//COMMON COMPONENT
import {
  Button,
  Text,
  BottomBackground,
  ProductsItemListCompleted,
} from '../components';

const {height, width} = Dimensions.get('screen');
import { LocalizationContext } from '../context/LocalizationProvider';
import { CommonUtilsContext, changeUTCtoLocalTime ,changeMMMDateFormat} from '../context/CommonUtils';
import moment from 'moment'; // date format

function ExchangeSuccessSummary(props) {
  const [item, setItem] = useState({});
  const [products, setItemProducts] = useState([]);
  const [user_x, setUser_X] = useState([]);
  const [user_y, setUser_Y] = useState([]);
  const { getTranslation } = useContext(LocalizationContext);
  const { getAdGender } = useContext(CommonUtilsContext);

  useEffect(() => {
    const item = props.route.params.summaryData[0];
    setItem(item);
    setItemProducts(props.route.params.summaryData[0].products)
    setUser_X(item.user_x[0])
    setUser_Y(item.user_y[0])
  }, []);

  useEffect(() => {
    function handleBackButton() {
      backAction();
      return true;
    }
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => backHandler.remove();
  }, []);

  const backAction = () => {
      props.navigation.navigate('MyAccount', {
        tabIndex: 4,
        subTabIndex: 1,
      });
    
  };

  const getProductPrice = () => {
  var totalPrice = 0;
    for (let i = 0; i < products.length; i++) {
      totalPrice =
        totalPrice + (products[i].prod_price * products[i].prod_qnty);
    }
    //setTotalPrice(totalPrice);
    return parseFloat(totalPrice).toFixed(2)
  };

  const checkDecimal = (amount) => {
    return parseFloat(amount).toFixed(2);
  }


  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.primaryColor}
      />

      <SafeAreaView style={styles.container}>
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
            {getTranslation('exchage_complete_success')}
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
                  //flex: 1,
                }
              }
              color={COLORS.primaryColor}
              size="16"
              weight="500">
              {'???'+ getProductPrice() + ' + ???'+  parseFloat(item.ad_cmsn_delivery).toFixed(2)  + ' + ???' + checkDecimal(item.ad_cmsn_price * 0.20) + ' = ???'+ parseFloat(item.ad_pay_amount).toFixed(2)}
            </Text>

            <Text
              style={{justifyContent: 'center', alignSelf: 'center'}}
              color={COLORS.black}
              size="18"
              weight="500">
              {getTranslation('is_credit_amount') +' '+ user_y.user_f_name + ' ' + user_y.user_l_name}
            </Text>
          </View>

          <Text
            style={[styles.inputView, {width: 298, marginTop: 20}]}
            size="20"
            weight="600"
            align="center"
            color={COLORS.black}>
            {getTranslation('thankyou_for_used')}
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
              marginHorizontal: DIMENSION.marginHorizontal,
              marginBottom: 20,
              marginTop: 20,
              justifyContent: 'center',
              alignSelf: 'center',
              width: 240,
            }}
            title={getTranslation('comment_rating')}
            type={1}
            onPress={() => {
              props.navigation.navigate('RatingReview', {
                userName: item.user_y[0].user_f_name + ' ' + item.user_y[0].user_l_name,
                rate_ad_id: item.ad_id,
                rate_user_id: item.user_y[0].user_id,
                onReturn: item => {
                  console.log('log_item ' + item);
                 // setRatingStatus(true);
                },
              });
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
            {getTranslation('summary_transaction')}
          </Text>

          <FlatList
            showsVerticalScrollIndicator={false}
            data={products}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return <ProductsItemListCompleted
              item={item} />;
            }}
          />

          <View style={[styles.inputView, {marginTop: 10, marginBottom: 20}]}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text style={{}} color={COLORS.black} size="16" weight="600">
                {getTranslation('global_commission') +' :'}
              </Text>

              <Text
                style={{
                  marginLeft: 10,
                }}
                color={COLORS.Darkgray}
                size="16"
                weight="500">
                {'??? ' + parseFloat(item.ad_cmsn_price).toFixed(2)}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text style={{}} color={COLORS.black} size="16" weight="600">
                {getTranslation('deliveryman_commission') +' :'}
              </Text>

              <Text
                style={{
                  marginLeft: 10,
                }}
                color={COLORS.Darkgray}
                size="16"
                weight="500">
                {'??? ' + parseFloat(item.ad_cmsn_delivery).toFixed(2)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text style={{}} color={COLORS.black} size="16" weight="600">
                {getTranslation('ad_seen_by')}
              </Text>

              <Text
                style={{
                  marginLeft: 10,
                }}
                color={COLORS.Darkgray}
                size="16"
                weight="500">
                {getAdGender(item.ad_gender)}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text style={{}} color={COLORS.black} size="16" weight="600">
                {getTranslation('acceptance_limit')}
              </Text>

              <Text
                style={{
                  marginLeft: 10,
                }}
                color={COLORS.darkGray}
                size="16"
                weight="500">
                {changeMMMDateFormat(item.ad_accept_limit)}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text style={{}} color={COLORS.black} size="16" weight="600">
                {getTranslation('delivery_limit')}
              </Text>

              <Text
                style={{
                  marginLeft: 10,
                }}
                color={COLORS.darkGray}
                size="16"
                weight="500">
                {changeMMMDateFormat(item.ad_delivery_limit)}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text style={{}} color={COLORS.black} size="16" weight="600">
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
                {item.ad_delv_addr}
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
                {getTranslation('delivery_details')}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text style={{}} color={COLORS.black} size="16" weight="600">
                {getTranslation('delivery_man')+ ' :'}
              </Text>

              <Text
                style={{
                  marginLeft: 10,
                }}
                color={COLORS.primaryColor}
                size="16"
                weight="500">
                {user_y.user_f_name + ' ' + user_y.user_l_name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text style={{}} color={COLORS.black} size="16" weight="600">
                {getTranslation('delivery_date')}
              </Text>

              <Text
                style={{
                  marginLeft: 10,
                }}
                color={COLORS.primaryColor}
                size="16"
                weight="500">
                {item.acpt_date}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text style={{}} color={COLORS.black} size="16" weight="600">
                {getTranslation('delivery_time')}
              </Text>

              <Text
                style={{
                  marginLeft: 10,
                }}
                color={COLORS.primaryColor}
                size="16"
                weight="500">
                 {changeUTCtoLocalTime(item.acpt_date +' '+ item.acpt_time)}
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
              {getTranslation('delivered_on')}
            </Text>

            <Text
              style={{
                marginLeft: 10,
                flex: 1,
              }}
              color={COLORS.primaryColor}
              size="16"
              weight="500">
              {changeMMMDateFormat(item.ad_delv_time)}
            </Text>
          </View>

          <View
            style={[
              styles.inputView,
              {
                //flexDirection: 'row',
                marginTop: 5,
              },
            ]}>
            <Text style={{}} color={COLORS.black} size="16" weight="600">
              {getTranslation('total_to_pay')}
            </Text>

            <Text
              style={{
                //marginLeft: 10,
                flex: 1,
              }}
              color={COLORS.darkGray}
              size="16"
              weight="500">
              {'???'+ getProductPrice() + ' + ???'+  parseFloat(item.ad_cmsn_delivery).toFixed(2)  + ' + ???' + checkDecimal(item.ad_cmsn_price * 0.20) + ' = ???'+ parseFloat(item.ad_pay_amount).toFixed(2)}
            </Text>
          </View>

          <View
            style={{
              marginHorizontal: DIMENSION.marginHorizontal,
              marginBottom: 20,
              marginTop: 30,
              justifyContent: 'center',
            }}>
            <Button
              title={getTranslation('done')}
              onPress={() => {
                backAction();
                // props.navigation.dispatch(
                //   CommonActions.reset({
                //     index: 0,
                //     routes: [{ name: 'BottomBar' }],
                //   }),
                // );
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
    marginHorizontal: DIMENSION.marginHorizontal,
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
