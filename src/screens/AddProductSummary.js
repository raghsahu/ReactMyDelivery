import React, { useEffect, useContext, useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
  Modal,
  Dimensions,
  FlatList,
} from 'react-native';

//ASSETS
import { COLORS, IMAGES, DIMENSION } from '../assets';

//COMMON COMPONENT
import {
  Button,
  Text,
  Header,
  BottomBackground,
  OpenInfoModal,
  CheckBox,
  AddProductsItemList,
  ProgressView,
} from '../components';
//CONTEXT
import { LocalizationContext } from '../context/LocalizationProvider';
import Toast from 'react-native-simple-toast';
import { APPContext } from '../context/AppProvider';
import { CommonUtilsContext, changeLocalToUTC } from '../context/CommonUtils';
import moment from 'moment'; // date format
const { height, width } = Dimensions.get('screen');
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'DescribeProduct.db' });

function AddProductSummary(props) {
  const { CommissionData } = props.route.params;
  const [productListItems, setProductListItems] = useState([]);
  const [prodTotalPrice, setTotalPrice] = useState(0);
  const [totalToPayPrice, setTotalToPay] = useState(0);

  const [isSelected, setSelection] = useState(false);
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const [isOpenInfoModal, setOpenInfoModal] = useState(false);
  const { getTranslation } = useContext(LocalizationContext);
  const { user, webServices, getError, add_Product, oneTimePayment } = useContext(APPContext);
  const { getAdGender } = useContext(CommonUtilsContext);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_product', [], (tx, results) => {
        var temp = [];
        var totalPrice = 0;
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
          totalPrice =
            totalPrice +
            results.rows.item(i).price_of_product *
            results.rows.item(i).quantity;
        }
        setProductListItems(temp);
        setTotalPrice(parseFloat(totalPrice).toFixed(2));
        const totalToPay = parseFloat(totalPrice) + parseFloat(CommissionData.globalCommission);
        setTotalToPay(parseFloat(totalToPay).toFixed(2));
      });
    });
  }, []);

  const logoutModalVisibility = () => {
    setLogoutModalVisible(!isLogoutModalVisible);
  };

  const openInfoModal = () => {
    setOpenInfoModal(!isOpenInfoModal);
  };

  const setCheck = checkStatus => {
    setSelection(checkStatus);
  };

  const checkDecimal = (amount) => {
    return parseFloat(amount).toFixed(2);
  }


  const paypalPayment = async () => {
    const result = await oneTimePayment(totalToPayPrice);
    if (result && result.response.state == 'approved') {
      Toast.show(getTranslation('payment_success'))
      onNext(JSON.stringify(result));
    } else {
      Toast.show(getTranslation('payment_error'))
    }

  }

  var tempImages = [];
  const onNext = (paymentResponse) => {
    setLoading(true);
    for (let i = 0; i < productListItems.length; i++) {
      const formData = new FormData();
      let jsonObject = JSON.parse(productListItems[i].prod_img);
      jsonObject.forEach((item, j) => {
        formData.append("prod_img[]", {
          uri: item,
          type: "image/jpeg",
          name: `Productfile${j}.jpg`,
        });
      });

      requestMultipart(webServices.upload_imgs, 'post', formData, paymentResponse, i);
    }
  };

  var indexCount =0;
  const requestMultipart = (url, method, params, paymentResponse, i) => {
    try {
      // console.log('===================');
      // console.log('URL: ', url);
      // console.log('METHOD: ', method);
      // console.log('PARAMS: ', params);
      // console.log('===================');

      const options = {
        method: 'POST',
        body: params,
        headers: {
          user_session: user ? user.user_session : '',
          user_id: user ? user.user_id : '',
        },
      };
       fetch(url, options)
        .then(response => {
          return response.json();
        })
        .then(data => {
          if (data && data.status == 1) {
            tempImages.splice(i, 0, data);
            indexCount++;
           // tempImages.push(data);
            if (indexCount == productListItems.length) {
              uploadProductAllData(paymentResponse);
            // console.log('temmmmpImg ', JSON.stringify(tempImages))
            }
          } else {
            setLoading(false);
            Toast.show(data.msg);
          }
        });
    } catch (e) {
      console.log(e);
      setLoading(false);
      Toast.show(getTranslation('something_went_wrong'));
    }
  };

  const uploadProductAllData = async (paymentResponse) => {
    try {
      var temp = [];
      for (let i = 0; i < productListItems.length; i++) {
        const ProductData = {
          prod_user_id: user.user_id,
          prod_ad_id: '0',
          prod_name: productListItems[i].product_name,
          prod_web_link: productListItems[i].web_link,
          prod_place_purchase: productListItems[i].place_to_buy,
          prod_place_delivery: CommissionData.placeOfDelivery,
          prod_price: productListItems[i].price_of_product,
          prod_qnty: productListItems[i].quantity,
          prod_price_total: productListItems[i].total_price,
          prod_info: productListItems[i].additional_info,
          prod_img: tempImages[i].result.images,
        };
        temp.push(ProductData);
      }

      const result = await add_Product(
        JSON.stringify(temp),
        user.user_id,
        CommissionData.globalCommission,
        parseFloat(CommissionData.globalCommission * 0.80).toFixed(2),
        CommissionData.placeOfDelivery,
        CommissionData.gender,
        changeLocalToUTC(CommissionData.acceptanceDay + ' ' + CommissionData.acceptanceTime),
        changeLocalToUTC(CommissionData.limitDay + ' ' + CommissionData.deliveryTime),
        '0',
        '1',//1= payment success, 0=no paymnet
        totalToPayPrice,
        paymentResponse,
        CommissionData.ad_lat,
        CommissionData.ad_lon,
      );
      setLoading(false);
      if (result.status == true) {
        Toast.show(result.error);
        onDiscard();
        props.navigation.navigate('MyAccount', {
          tabIndex: 2,
          subTabIndex: 1,
        });
      } else {
        Toast.show(result.error);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      Toast.show(getTranslation('something_went_wrong'));
    }
  };

  const onDiscard = () => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM table_product', (tx, results) => {
        try {
          if (results.rowsAffected > 0) {
          }
        } catch (ex) {
          console.log(ex);
        }
      });
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.primaryColor}
      />
      <BottomBackground></BottomBackground>
      <SafeAreaView style={styles.container}>
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
            style={[{ backgroundColor: COLORS.white, padding: 10 }]}
            size="18"
            weight="500"
            align="center"
            color={COLORS.textColor}>
            {getTranslation('summary')}
          </Text>

          <View
            style={[
              {
                backgroundColor: COLORS.lightGray,
                height: 10,
              },
            ]}></View>

          <FlatList
            showsVerticalScrollIndicator={false}
            data={productListItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return <AddProductsItemList
                item={item} />;
            }}
          />

          <View style={[styles.inputView, { marginTop: 20 }]}>
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
                color={COLORS.textColor4}
                size="16"
                weight="500">
                {getAdGender(CommissionData.gender)}
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
                color={COLORS.textColor4}
                size="16"
                weight="500">
                  {moment(CommissionData.acceptanceDay + ' '+  CommissionData.acceptanceTime).format('YYYY-MM-DD HH:mm')}
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
                color={COLORS.textColor4}
                size="16"
                weight="500">
                {moment(CommissionData.limitDay + ' '+  CommissionData.deliveryTime).format('YYYY-MM-DD HH:mm')}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text style={{}} color={COLORS.black} size="16" weight="500">
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
                {CommissionData.placeOfDelivery}
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
              style={{ justifyContent: 'center', alignSelf: 'center' }}
              color={COLORS.textColor4}
              size="14"
              align="center"
              weight="500">
              {getTranslation('total_price')}
            </Text>

            <Text
              style={{ justifyContent: 'center', alignSelf: 'center', marginRight: 10 }}
              color={COLORS.textColor4}
              size="14"
              align="center"
              weight="500">
              {getTranslation('delivery_man_commission')}
            </Text>

            <Text
              style={{ justifyContent: 'center', alignSelf: 'center', marginRight: 20 }}
              color={COLORS.textColor4}
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
                width: 80,
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
              {prodTotalPrice}
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
                width: 80,
                padding: 8,
                marginTop: 10,
                borderRadius: 24,
                justifyContent: 'center',
              }}
              color={COLORS.black}
              size="16"
              align="center"
              weight="500">
              {checkDecimal(CommissionData.globalCommission * 0.80)}
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
                width: 80,
                padding: 8,
                marginTop: 10,
                borderRadius: 24,
                justifyContent: 'center',
              }}
              color={COLORS.black}
              size="16"
              align="center"
              weight="500">
              {checkDecimal(CommissionData.globalCommission * 0.20)}
            </Text>
          </View>

          <TouchableOpacity
            style={{ marginRight: 20, marginTop: 10 }}
            onPress={() => {
              openInfoModal();
            }}>
            <Text
              color={COLORS.primaryColor}
              size="16"
              weight="500"
              align={'right'}>
              {getTranslation('info')}
            </Text>
          </TouchableOpacity>

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
              color={COLORS.black}
              size="16"
              weight="500">
              {'€ ' + totalToPayPrice}
            </Text>
          </View>

          <CheckBox
            isSelected={isSelected}
            text={getTranslation('contract_terms')}
            onChecked={setCheck}
          />

          <Button
            style={[styles.inputView, { marginTop: 30, marginBottom: 30 }]}
            title={getTranslation('accept')}
            onPress={() => {
              if (isSelected) {
                logoutModalVisibility();
              } else {
                Toast.show(getTranslation('pls_select_contact_terms'));
              }
            }}
          />
        </ScrollView>
      </SafeAreaView>
      {isLoading ? <ProgressView></ProgressView> : null}

      <OpenInfoModal
          isOpenInfoModal={isOpenInfoModal}
          openInfoModal={() => {
            openInfoModal();
          }}
        />

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
              style={{ marginTop: 10 }}
              size="18"
              weight="500"
              align="center"
              color={COLORS.darkGray}>
              {getTranslation('total_payment')}
            </Text>

            <Text
              style={{ marginTop: 10 }}
              size="18"
              weight="500"
              align="center"
              color={COLORS.primaryColor}>
              {'€ ' + totalToPayPrice}
            </Text>

            <Text
              style={{ marginTop: 10 }}
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
              }}>
              <Button
                style={[
                  { width: 200, justifyContent: 'center', alignSelf: 'center' },
                ]}
                title={getTranslation('ok')}
                onPress={() => {
                  logoutModalVisibility();
                  paypalPayment();
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
    transform: [{ translateX: -(width * 0.4) }, { translateY: -90 }],
    height: 250,
    width: width * 0.85,
    backgroundColor: '#fff',
    borderRadius: 7,
  },
});

export default AddProductSummary;
