import React, { useEffect, useContext, useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  FlatList,
  StatusBar,
  Dimensions,
} from 'react-native';

//ASSETS
import { COLORS, IMAGES, DIMENSION } from '../assets';

//COMMON COMPONENT
import {
  Button,
  Text,
  Header,
  ProgressView,
  ModificationProductList,
  ProductsItemList,
} from '../components';
//CONTEXT
import { LocalizationContext } from '../context/LocalizationProvider';
import { APPContext } from '../context/AppProvider';
import { CommonUtilsContext, changeUTCtoLocal } from '../context/CommonUtils';
import Toast from 'react-native-simple-toast';
import moment from 'moment'; // date format

const { height, width } = Dimensions.get('screen');

function AdModificationProposal(props) {
  const { ads_id, notn_id } = props.route.params;
  const [itemData, setItemData] = useState({});
  const [oldProducts, setOldProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [oldSummaryDetails, setOldSummaryDetails] = useState({});
  const [newSummaryDetails, setNewSummaryDetails] = useState({});
  const { getTranslation } = useContext(LocalizationContext);
  const { user, getNewOldProductData, notiAcceptRefuseRequest, notiDeleted, oneTimePayment } = useContext(APPContext);
  const { getAdGender } = useContext(CommonUtilsContext);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getAllProductData();
  }, []);

  const getAllProductData = async () => {
    setLoading(true);
    const result = await getNewOldProductData(ads_id);
    setLoading(false);
    if (result.status == true) {
      setItemData(result.data)
      setOldProducts(result.data.old[0].products);
      setOldSummaryDetails(result.data.old[0]);
      setNewSummaryDetails(result.data.new[0]);

      setNewProducts(JSON.parse(result.data.new[0].product_data.toString()));
      //console.log('ad_cmsn_price ', result.data.new[0].ad_cmsn_price)

    } else {
      Toast.show(result.error);
    }
  };

  const getNewTotalPrice = () => {
    var totalPrice = 0;
    for (let i = 0; i < newProducts.length; i++) {
      totalPrice = totalPrice + (newProducts[i].prod_price * newProducts[i].prod_qnty);
    }
    const totalToPay = parseFloat(totalPrice) + parseFloat(newSummaryDetails.ad_cmsn_price);
    return parseFloat(totalToPay).toFixed(2);
  }

  const getDifferenceToPay = () => {
    const diffPay = parseFloat(getNewTotalPrice() - parseFloat(oldSummaryDetails.ad_pay_amount).toFixed(2));
    return parseFloat(diffPay).toFixed(2);
  }

  const paypalPayment = async () => {
    const result = await oneTimePayment(getDifferenceToPay());
    if (result && result.response.state == 'approved') {
      Toast.show(getTranslation('payment_success'))
      acceptRefuseRequest('1');
    } else {
      Toast.show(getTranslation('payment_error'))
    }
  }

  const acceptRefuseRequest = async (notn_acept_rejct) => {
    setLoading(true);
    const result = await notiAcceptRefuseRequest(notn_id, notn_acept_rejct);
    setLoading(false);
    if (result.status == true) {
      Toast.show(getTranslation('success'))
      deleteCurrentNotification();
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
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.white} />

      <SafeAreaView style={styles.container}>
        <Header
          title={getTranslation('proposal_modification_ad')}
          onBack={() => {
            props.navigation.goBack();
          }}
        />
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          <Text
            style={[styles.inputView, { marginTop: 10 }]}
            size="20"
            weight="600"
            align="left"
            color={COLORS.primaryColor}>
            {getTranslation('your_announcement')}
          </Text>

          <FlatList
            showsVerticalScrollIndicator={false}
            data={oldProducts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return <ModificationProductList
                item={item}
              />;
            }}
          />
          {/* <Text
            style={[styles.inputView, {marginTop: 10}]}
            size="18"
            weight="600"
            align="left"
            color={COLORS.textColor}>
            {'Product 1'}
          </Text> */}

          <View style={[styles.inputView, { marginTop: 20, marginBottom: 20 }]}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text style={{}} color={COLORS.black} size="16" weight="600">
                {getTranslation('global_commission') + ' :'}
              </Text>

              <Text
                style={{
                  marginLeft: 10,
                }}
                color={COLORS.textColor4}
                size="16"
                weight="500">
                {'€ ' + parseFloat(oldSummaryDetails.ad_cmsn_price).toFixed(2)}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text style={{}} color={COLORS.black} size="16" weight="600">
                {getTranslation('deliveryman_commission') + ' :'}
              </Text>

              <Text
                style={{
                  marginLeft: 10,
                }}
                color={COLORS.textColor4}
                size="16"
                weight="500">
                {'€ ' + parseFloat(oldSummaryDetails.ad_cmsn_delivery).toFixed(2)}
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
                color={COLORS.textColor4}
                size="16"
                weight="500">
                {getAdGender(oldSummaryDetails.ad_gender)}
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
                color={COLORS.textColor4}
                size="16"
                weight="500">
                {changeUTCtoLocal(oldSummaryDetails.ad_accept_limit)}
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
                color={COLORS.textColor4}
                size="16"
                weight="500">
                {changeUTCtoLocal(oldSummaryDetails.ad_delivery_limit)}
              </Text>
            </View>

            <View
              style={{
                marginTop: 5,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text style={{}} color={COLORS.black} size="16" weight="600">
                  {getTranslation('place_of_delivery') + ' :'}
                </Text>

                <Text
                  style={{
                    marginLeft: 10,
                    width: 200,
                  }}
                  color={COLORS.textColor4}
                  size="16"
                  weight="500">
                  {oldSummaryDetails.ad_delv_addr}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              backgroundColor: COLORS.borderColor2,
              height: 2,
              marginTop: 10,
            }}></View>

          <Text
            style={[styles.inputView, { marginTop: 10 }]}
            size="20"
            weight="600"
            align="left"
            color={COLORS.primaryColor}>
            {getTranslation('changes_of_delivery_man')}
          </Text>

          <FlatList
            showsVerticalScrollIndicator={false}
            data={newProducts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return <ProductsItemList
                item={item}
              />;
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              marginHorizontal: 20,
            }}>
            <Text style={{}} color={COLORS.black} size="16" weight="600">
              {getTranslation('global_commission') + ' :'}
            </Text>

            <Text
              style={{
                marginLeft: 10,
              }}
              color={COLORS.primaryColor}
              size="16"
              weight="500">
              {'€ ' + parseFloat(newSummaryDetails.ad_cmsn_price).toFixed(2)}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
              marginHorizontal: 20,
            }}>
            <Text style={{}} color={COLORS.black} size="16" weight="600">
              {getTranslation('deliveryman_commission') + ' :'}
            </Text>

            <Text
              style={{
                marginLeft: 10,
              }}
              color={COLORS.primaryColor}
              size="16"
              weight="500">
              {'€ ' + parseFloat(newSummaryDetails.ad_cmsn_delivery).toFixed(2)}
            </Text>
          </View>

          <Text
            style={[styles.inputView, styles.comment]}
            size="16"
            weight="500"
            align="left"
            color={COLORS.black}>
            {newSummaryDetails.ad_why_this_change}
          </Text>

          <Text
            style={[styles.inputView, { marginTop: 10 }]}
            size="20"
            weight="500"
            align="left"
            color={COLORS.textColor}>
            {getTranslation('delivery_details')}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              marginHorizontal: 20,
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
              {newSummaryDetails.acpt_date}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
              marginHorizontal: 20,
              marginBottom: 20,
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
              {moment(newSummaryDetails.acpt_date + ' ' + newSummaryDetails.acpt_time).format('HH:mm')}
            </Text>
          </View>

          <View
            style={{
              backgroundColor: COLORS.borderColor2,
              height: 2,
            }}></View>

          <View
            style={{
              //flexDirection: 'row',
              marginHorizontal: 20,
              marginTop: 20,
            }}>
            <Text style={{}} color={COLORS.black} size="22" weight="600">
              {getTranslation('difference_to_pay')}
            </Text>

            <Text
              style={{
                // marginLeft: 10,
                flex: 1,
              }}
              color={COLORS.primaryColor}
              size="22"
              weight="600">
              {'€ ' + getNewTotalPrice() + ' - € ' + parseFloat(oldSummaryDetails.ad_pay_amount).toFixed(2) + ' = ' + getDifferenceToPay()}
            </Text>
          </View>

        {user.user_id != newSummaryDetails.loggedin_user_id ?       
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
              type={1}
              titleColor={COLORS.primaryColor}
              style={[
                {
                  borderColor: COLORS.primaryColor,
                  borderWidth: 1.2,
                  width: 156,
                },
              ]}
              title={getTranslation('refuse')}
              onPress={() => {
                acceptRefuseRequest('2')
              }}
            />

            <Button
              style={[{ width: 156 }]}
              title={getTranslation('accept')}
              onPress={() => {
                if (getDifferenceToPay() > 0) {
                  paypalPayment();
                } else {
                  acceptRefuseRequest('1')
                }
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
    // position: 'absolute',
    left: '40%',
    top: '35%',
    margin: 20,
    elevation: 5,
    transform: [{ translateX: -(width * 0.4) }, { translateY: -90 }],
    // height: 250,
    // width: width * 0.85,
    backgroundColor: '#fff',
    borderRadius: 7,
  },
  rightButtons: {
    height: 38,
    borderRadius: 19,
    paddingVertical: 7,
    paddingHorizontal: 10,
    backgroundColor: '#C4C2C3',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  comment: {
    textAlignVertical: 'top',
    padding: 5,
    marginTop: 20,
    height: 120,
    backgroundColor: COLORS.lightGray,
    borderRadius: 24,
    fontSize: 16,
  },
});

export default AdModificationProposal;
