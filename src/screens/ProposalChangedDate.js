import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  StatusBar,
  Dimensions,
} from 'react-native';

//ASSETS
import {COLORS, IMAGES, DIMENSION} from '../assets';

//COMMON COMPONENT
import {Button, Text, ProgressView, Header} from '../components';
import { LocalizationContext } from '../context/LocalizationProvider';
import { CommonUtilsContext , changeMMMDateFormat} from '../context/CommonUtils';
import Toast from 'react-native-simple-toast';
import { APPContext } from '../context/AppProvider';
const { height, width } = Dimensions.get('screen');
import moment from 'moment'; // date format

function ProposalChangedDate(props) {
  const {ProdData, notn_id} = props.route.params;
  const [item, setItem] = useState({});
  const [products, setItemProducts] = useState([]);
  const [user_y, setUser_Y] = useState({});
  const [date_change_history, setDate_change_history] = useState({});
  const {user, notiAcceptRefuseRequest, imageBaseUrl, notiDeleted} = useContext(APPContext);
  const { getTranslation } = useContext(LocalizationContext);
  const { getAdGender } = useContext(CommonUtilsContext);
  const [isLoading, setLoading] = useState(false);
  const [prodTotalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const item = props.route.params.ProdData;
    setItem(item);
    setItemProducts(ProdData.products[0])
    setUser_Y(item.user_y[0])

    if(item.date_change_history.length > 0){
      setDate_change_history(JSON.parse(item.date_change_history[item.date_change_history.length -1 ].notn_data))
    }
    var totalPrice = 0;
    for (let i = 0; i < item.products.length; i++) {
      totalPrice = totalPrice + parseInt(item.products[i].prod_price_total)
    }
    setTotalPrice(parseFloat(totalPrice) + parseFloat(item.ad_cmsn_price));

  }, [props]);

  const setImages = prodImg => {
    var imageArray = prodImg.split(',');
    return imageArray ? imageArray[0] : '' 

  };

  const acceptRefuseRequest = async (notn_acept_rejct) => {
    setLoading(true);
    const result = await notiAcceptRefuseRequest(notn_id ,notn_acept_rejct);
    setLoading(false);
    if (result.status == true) {
      Toast.show('Success')
     // deleteCurrentNotification();
     props.navigation.goBack();
    } else {
      Toast.show(result.error);
    }
  }

  const deleteCurrentNotification = async () => {
    //setLoading(true);
    const result = await notiDeleted(notn_id);
    //setLoading(false);
    if (result.status == true) {
      //Toast.show('Success')
     props.navigation.goBack();
     
    } else {
      //Toast.show(result.error);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.primaryColor}
      />

      <SafeAreaView style={styles.container}>
        <Header
          title={getTranslation('proposal_changing_date_time')}
          onBack={() => {
            props.navigation.goBack();
          }}
        />
    
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
            {getTranslation('proposal_change_delivery_date_time')}
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
              }}
              source={user_y.user_img ? { uri: imageBaseUrl + user_y.user_img } : IMAGES.circle_placeholder}
            />

            <Text color={COLORS.black} size="18" weight="500">
            {user_y.user_f_name + ' ' + user_y.user_l_name}
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
              {getTranslation('old_delivery_date')}
            </Text>

            <Text
              style={{
                marginLeft: 10,
              }}
              color={COLORS.darkGray}
              size="16"
              weight="500">
              {changeMMMDateFormat(item.acpt_date + ' ' + item.acpt_time)}
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
              {getTranslation('new_delivery_date')}
            </Text>

            <Text
              style={{
                marginLeft: 10,
              }}
              color={COLORS.primaryColor}
              size="16"
              weight="500">
              {changeMMMDateFormat(date_change_history.change_date + ' '+ date_change_history.change_time)}
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
              }}
              source=
              {setImages(ProdData.products[0].prod_img)
                ? {uri: imageBaseUrl + setImages(ProdData.products[0].prod_img)}
                : IMAGES.product_placeholder}
            />

            <View
              style={{
                flex: 1,
                margin: 5,
                justifyContent: 'center',
              }}>
              <Text color={COLORS.black} size="16" weight="500">
                {products.prod_name}
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
                  {products.prod_web_link}
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

            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text style={{}} color={COLORS.black} size="16" weight="600">
                {getTranslation('price') +' : '}
              </Text>

              <Text
                style={{
                  marginLeft: 10,
                  width: 200,
                }}
                color={COLORS.darkGray}
                size="16"
                weight="500">
                {parseFloat(prodTotalPrice).toFixed(2)}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text style={{}} color={COLORS.black} size="16" weight="600">
                {getTranslation('ad_seen_by') +' :'}
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
          </View>
          {user.user_id == ProdData.ad_user_id ?            
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
              title={getTranslation('refuse')} //or Change Delivery Date (according to condition)
              onPress={() => {
                acceptRefuseRequest('2')
              }}
            />

            <Button
              style={[{width: 156}]}
              title={getTranslation('accept')}
              onPress={() => {
                acceptRefuseRequest('1')
              }}
            />
          </View>
           : 
           <View
           style={{
             marginTop: 30,
             flexDirection: 'row',
             justifyContent: 'space-between',
           }}></View>
           }
        </ScrollView>
      </SafeAreaView>
      {isLoading ? <ProgressView></ProgressView> : null}
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

export default ProposalChangedDate;
