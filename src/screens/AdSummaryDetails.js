import React, { useEffect, useContext, useState, useRef } from 'react';
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
  TextInput,
  FlatList,
} from 'react-native';

//ASSETS
import { COLORS, IMAGES, DIMENSION } from '../assets';

//COMMON COMPONENT
import {
  Button,
  Text,
  Input,
  Header,
  CheckBox,
  DateTimePick,
  DeliveryManSummaryProductsItemList,
  ProgressView,
} from '../components';
import moment from 'moment'; // date format

const { height, width } = Dimensions.get('screen');
//CONTEXT
import { LocalizationContext } from '../context/LocalizationProvider';
import { CommonUtilsContext } from '../context/CommonUtils';
import { APPContext } from '../context/AppProvider';
//package
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actions-sheet';
import Toast from 'react-native-simple-toast';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'DescribeProduct.db' });

function AdSummaryDetails(props) {
  const actionSheetRef = useRef();
  const [item, setItem] = useState({});
  const [products, setItemProducts] = useState([]);
  const [dbProducts, setItemDbProducts] = useState([]);
  const { getTranslation } = useContext(LocalizationContext);
  const { getAdGender, validURL } = useContext(CommonUtilsContext);
  const { getAdAccept, user, webServices, change_request, oneTimePayment } = useContext(APPContext);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [selectDate, setSelectDate] = useState('');
  const [selectTime, setSelectTime] = useState('');
  const [dateSelected, setDateSelected] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const [isPaymentDialogModalVisibility, setPaymentDialogModalVisibility] = useState(false);
  const [isProposalToModificationOfAd, setProposalToModificationOfAd] =
    useState(false);
  const [isPlaceOfDeliveryModalVisible, setPlaceOfDeliveryModalVisible] =
    useState(false);
  const [isWebLinkModalVisible, setWebLinkModalVisible] = useState(false);
  const [isPhotosModalVisible, setPhotosModalVisible] = useState(false);
  const [
    isChangePriceQuantityModalVisible,
    setChangePriceQuantityModalVisible,
  ] = useState(false);
  const [isCommissionModalVisible, setCommissionModalVisible] = useState(false);
  const [prodTotalPrice, setTotalPrice] = useState(0);
  const [totalToPayPrice, setTotalToPay] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [prodImg, setProdImg] = useState([]);
  const [modifyProdId, setModifyProdId] = useState('');
  const [newWebLink, setNewWebLink] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newQuantity, setNewQunatity] = useState('');
  const [newTotalPrice, setNewTotalPrice] = useState('');
  const [newGlobalCommission, setNewGlobalCommission] = useState('');
  const [newPlaceOfDelivery, setNewPlaceOfDelivery] = useState('');
  const [whyThisChange, setWhyThisChange] = useState('');
  const [newTotalToPayPrice, setNewTotalToPay] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [changedItem, setChangedItem] = useState(false);

  useEffect(() => {
    const item = props.route.params.ProdData;
    setItem(item);
    setItemProducts(item.products)

    var totalPrice = 0;
    for (let i = 0; i < item.products.length; i++) {
      totalPrice =
        totalPrice + (item.products[i].prod_price * item.products[i].prod_qnty);
    }
    setTotalPrice(totalPrice);
    const totalToPay = parseInt(totalPrice) + parseInt(item.ad_cmsn_price);
    setTotalToPay(totalToPay.toFixed(2));

  }, []);

  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='modify_product'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS modify_product', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS modify_product( product_id INTEGER PRIMARY KEY AUTOINCREMENT, prod_id VARCHAR(100),  prod_user_id VARCHAR(255),  prod_ad_id VARCHAR(255), prod_name VARCHAR(255), prod_web_link VARCHAR(255), prod_place_purchase VARCHAR(255), prod_place_delivery VARCHAR(255), prod_price VARCHAR(255), prod_qnty VARCHAR(255), prod_price_total VARCHAR(255), prod_info VARCHAR(255), prod_img VARCHAR(255))',
              [],
            );
          }
        },
      );
    });
  }, []);

  const setAllOldDataInLocalDb = () => {
    for (let i = 0; i < products.length; i++) {
      db.transaction(function (tx) {
        tx.executeSql(
          'INSERT INTO modify_product (prod_id, prod_user_id, prod_ad_id, prod_name, prod_web_link, prod_place_purchase, prod_place_delivery, prod_price, prod_qnty, prod_price_total, prod_info, prod_img) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
          [
            products[i].prod_id,
            products[i].prod_user_id,
            products[i].prod_ad_id,
            products[i].prod_name,
            products[i].prod_web_link,
            products[i].prod_place_purchase,
            products[i].prod_place_delivery,
            products[i].prod_price,
            products[i].prod_qnty,
            products[i].prod_price_total,
            products[i].prod_info,
            products[i].prod_img,
          ],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              //setItemProducts(item.products)
              getAllSavedProducts();

            }
          },
        );
      });
    }
  };

  const getAllSavedProducts = () => {
    setItemDbProducts([]);
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM modify_product', [], (tx, results) => {
        var temp = [];

        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        setItemDbProducts(temp);
      });
    });
  };

  const onDiscard = () => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM modify_product',
        (tx, results) => {
          try {
            console.log('ResultsDelete', results.rowsAffected);

            if (results.rowsAffected == 0) {

            }
          } catch (ex) {
            console.log(ex)
          }

        },
      );
    });
  };

  const updateImageInModifyDb = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE modify_product set prod_img=? where prod_id=?',
        [JSON.stringify(prodImg), modifyProdId],
        (tx, results) => {
          try {
            //console.log('ResultsUpdate', results.rowsAffected);

            if (results.rowsAffected > 0) {
              photosModalVisibleModalVisibility();
              getAllSavedProducts();
              setChangedItem(true)

              prodImg.splice(0, prodImg.length);
              prodImg.length = 0;
              setProdImg(prodImg);
            } else { Toast.show('Something went wrong'); }
          } catch (ex) {
            console.log(ex)
          }
        }
      );
    });
  };

  const updateWebLinkInModifyDb = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE modify_product set prod_web_link=? where prod_id=?',
        [newWebLink, modifyProdId],
        (tx, results) => {
          try {
            if (results.rowsAffected > 0) {
              webLinkModalVisibleModalVisibility();
              getAllSavedProducts();
              setChangedItem(true)
            } else { Toast.show('Something went wrong'); }
          } catch (ex) {
            console.log(ex)
          }
        }
      );
    });
  };

  const updatePriceInModifyDb = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE modify_product set prod_price=?, prod_qnty=?, prod_price_total=? where prod_id=?',
        [newPrice, newQuantity, getTotalPrice(), modifyProdId],
        (tx, results) => {
          try {
            if (results.rowsAffected > 0) {
              changePriceQuantityModalVisibleModalVisibility();
              getAllSavedProducts();
              setNewQunatity('');
              setNewPrice('');
              setNewTotalPrice('');
              setChangedItem(true)
            } else { Toast.show('Something went wrong'); }
          } catch (ex) {
            console.log(ex)
          }
        }
      );
    });
  };

  const getTotalPrice = () => {
    if (newPrice && newQuantity) {
      var totalPriceForProduct = newPrice * newQuantity
      return '' + totalPriceForProduct.toFixed(2);
      //setNewTotalPrice(totalPriceForProduct)
    }
    return ''
  }

  const getCommissionPrice = () => {
    if (newGlobalCommission) {
      var totalCommission = newGlobalCommission * 0.80  //80% of global commission
      return parseFloat(totalCommission).toFixed(2);
    } else {
      return '0'
    }
  }

  const onGooglePlace = () => {
    props.navigation.navigate('GooglePlacesInput', {
      onReturn: item => {
        //  console.log('log_item ' + JSON.stringify(item));
        setNewPlaceOfDelivery(item.address);
        // setCity(item.city);
        // setCountry(item.country);
        setLat(item.lat);
        setLng(item.lng);
        setChangedItem(true)
        //**********store in db */
      },
    });
  };

  const PaymentDialogModalVisibility = () => {
    setPaymentDialogModalVisibility(!isPaymentDialogModalVisibility);
  };

  const proposalToModificationOfAd = () => {
    setProposalToModificationOfAd(!isProposalToModificationOfAd);
  };

  const placeOfDeliveryModalVisibleModalVisibility = () => {
    setPlaceOfDeliveryModalVisible(!isPlaceOfDeliveryModalVisible);
  };

  const webLinkModalVisibleModalVisibility = () => {
    setWebLinkModalVisible(!isWebLinkModalVisible);
  };
  const photosModalVisibleModalVisibility = () => {
    setPhotosModalVisible(!isPhotosModalVisible);
  };

  const changePriceQuantityModalVisibleModalVisibility = () => {
    setChangePriceQuantityModalVisible(!isChangePriceQuantityModalVisible);
  };

  const commissionModalVisibleModalVisibility = () => {
    setCommissionModalVisible(!isCommissionModalVisible);
  };

  const setCheck = checkStatus => {
    setSelection(checkStatus);
  };

  function showDatepicker(mode) {
    showMode(mode);
  }

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const onChange = (event, selectedDate) => {
    setShow(Platform.OS === 'ios');

    if (dateSelected) {
      const currentDate = selectedDate || date;
      setDate(currentDate);
      setSelectDate(moment(currentDate).format('YYYY-MM-DD'));
    } else {
      setSelectTime(moment(selectedDate).format('HH:mm'));
    }
  };

  let paymentResult = '';
  const paypalPayment = async () => {
    const result = await oneTimePayment(isProposalToModificationOfAd ? (newGlobalCommission ? parseFloat(newGlobalCommission).toFixed(2) : parseFloat(item.ad_cmsn_price).toFixed(2)) : parseFloat(item.ad_cmsn_price).toFixed(2));
    //delivery man pay only global commission price
    if (result && result.response.state == 'approved') {
      Toast.show('Payment success')
      paymentResult = JSON.stringify(result);
      if (isProposalToModificationOfAd) {
        sendRequestForEdit();
      } else {
        onNext(JSON.stringify(result));
      }
    } else {
      Toast.show('Payment error')
    }

  }

  const onNext = async (paypalPayment) => {
    setLoading(true);
    const result = await getAdAccept(
      user.user_id,
      item.ad_id,
      selectDate,
      selectTime,
      '3', //ad accept type == 1-Z Accepted Ad, 2-X Accepted Ad,3-Y Accepted Ad
      '1', //0-pending,1-success,2-cancel,3-return
      isProposalToModificationOfAd ? (newTotalToPayPrice ? newTotalToPayPrice : totalToPayPrice) : totalToPayPrice,
      paypalPayment,
    );
    setLoading(false);
    if (result.status == true) {
      Toast.show('Accepted');
      props.navigation.navigate('SummaryTransaction', {
        status: 'deliveryAccepted',
        summaryData: result.data[0],
      });
    } else {
      Toast.show(result.error);
    }
  };

  const onPressUpload = () => {
    actionSheetRef.current?.setModalVisible(true);
  };

  const onPressLibrary = async type => {
    if (type == 1) {
      actionSheetRef.current?.setModalVisible(false);
      ImagePicker.openCamera({
        width: 300,
        height: 300,
        cropping: true,
      }).then(image => {
        //do something with the image
        let uri = image.path;
        let items = [...prodImg];
        items.push(uri);
        setProdImg(items);
      })
    } else {
      var result = await launchImageLibrary();
      actionSheetRef.current?.setModalVisible(false);
      console.log(result);
      if (result && result.assets.length > 0) {
        let uri = result.assets[0].uri;
        let items = [...prodImg];
        items.push(uri);
        setProdImg(items);
      }
    }
  };

  const isValidHttpUrl = prodImg => {
    if (prodImg.includes('file:')) {
      // Found world
      return true
    }
    return false
  };

  const isJsonFile = jsonStr => {
    try {
      JSON.parse(jsonStr);
      return true
    } catch (e) {
      //console.log('invalid json'); 
      return false
    }
  }

  var tempImages = [];
  const sendRequestForEdit = () => {
    setLoading(true);
    for (let i = 0; i < dbProducts.length; i++) {
      const formData = new FormData();
      let imageUrlFile = dbProducts[i].prod_img;
      if (isJsonFile(imageUrlFile)) {
        // formData.append("prod_img[]", {
        //   uri: imageUrlFile,
        //   type: "image/jpeg",
        //   name: `Productfile${i}.jpg`,
        // });
        JSON.parse(imageUrlFile).forEach((item, j) => {
          formData.append("prod_img[]", {
            uri: item,
            type: "image/jpeg",
            name: `Productfile${j}.jpg`,
          });
        });

        requestMultipart(webServices.upload_imgs, 'post', formData);
      } else {
        tempImages.push(imageUrlFile);
        if (tempImages.length == dbProducts.length) {
          uploadProductAllData();
        }
      }

    }
  }

  const requestMultipart = (url, method, params) => {
    try {
      console.log('===================');
      console.log('URL: ', url);
      console.log('METHOD: ', method);
      console.log('PARAMS: ', params);
      console.log('===================');

      const options = {
        method: 'POST',
        body: params,
        headers: {
          user_session: user ? user.user_session : '',
          user_id: user ? user.user_id : '',
        },
      };
      var response = fetch(url, options)
        .then(response => {
          return response.json();
        })
        .then(data => {
          if (data && data.status == 1) {
            tempImages.push(data.result.images);
            if (tempImages.length == dbProducts.length) {
              uploadProductAllData();
            }
          } else {
            setLoading(false);
            Toast.show(data.msg);
          }
        });
    } catch (e) {
      console.log(e);
      setLoading(false);
      Toast.show('Something went wrong');
    }
  };

  const uploadProductAllData = async () => {
    try {

      var temp = [];
      for (let i = 0; i < dbProducts.length; i++) {
        const ProductData = {
          prod_id: dbProducts[i].prod_id,
          prod_user_id: dbProducts[i].prod_user_id,
          prod_ad_id: dbProducts[i].prod_ad_id,
          prod_name: dbProducts[i].prod_name,
          prod_web_link: dbProducts[i].prod_web_link,
          prod_place_purchase: dbProducts[i].prod_place_purchase,
          prod_place_delivery: newPlaceOfDelivery ? newPlaceOfDelivery : dbProducts[i].prod_place_delivery,
          prod_price: dbProducts[i].prod_price,
          prod_qnty: dbProducts[i].prod_qnty,
          prod_price_total: dbProducts[i].prod_price_total,
          prod_info: dbProducts[i].prod_info,
          prod_img: tempImages[i],
        };
        temp.push(ProductData);
      }

      //*******after edit total to pay price********* */
      var totalPrice = 0;
      for (let i = 0; i < dbProducts.length; i++) {
        totalPrice = totalPrice + (dbProducts[i].prod_price * dbProducts[i].prod_qnty);
      }
      const totalToPay = totalPrice + parseInt(newGlobalCommission ? newGlobalCommission : item.ad_cmsn_price);
      setNewTotalToPay(parseFloat(totalToPay).toFixed(2));

      const result = await change_request(
        user.user_id,
        JSON.stringify(temp),
        item.ad_id,
        newGlobalCommission ? newGlobalCommission : item.ad_cmsn_price,
        newGlobalCommission ? getCommissionPrice() : item.ad_cmsn_delivery,
        //CommissionData.placeOfDelivery,
        item.ad_gender,
        item.ad_accept_limit,
        item.ad_delivery_limit,
        '0',
        '0',
        totalToPay,
        'offline payment',
        whyThisChange,
      );
      setLoading(false);
      if (result.status == true) {
        Toast.show(getTranslation('change_request_sent'));
        setNewGlobalCommission('');
        //proposalToModificationOfAd();
        onDiscard();
        setChangedItem(false)

        onNext(paymentResult);

      } else {
        Toast.show(result.error);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
      Toast.show('Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.white} />

      <SafeAreaView style={styles.container}>
        <Header
          title={getTranslation('product_details_of_ad')}
          onBack={() => {
            props.navigation.goBack();
          }}
        />
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          {/* {!isProposalToModificationOfAd && (
            <View
              style={[
                styles.inputView,
                {
                  marginTop: 20,
                  marginBottom: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  elevation: 2,
                  borderRadius: 15,
                  backgroundColor: COLORS.white,
                },
              ]}>
              <Text
                style={[{ marginStart: 15, marginTop: 15, marginBottom: 40 }]}
                size="18"
                weight="500"
                align="left"
                color={COLORS.black}>
                {item.user_f_name + ' ' + item.user_l_name}
              </Text>
              <View
                style={{ marginStart: 15, marginTop: 15, flexDirection: 'row' }}>
                <Text
                  style={[{ marginStart: 15 }]}
                  size="18"
                  weight="500"
                  align="left"
                  color={COLORS.black}>
                  {parseFloat(item.user_rating).toFixed(2)}
                </Text>
                <Rating
                  type="custom"
                  ratingColor="#04D9C5"
                  startingValue={1}
                  ratingBackgroundColor="#04D9C5"
                  ratingCount={1}
                  imageSize={20}
                  // onFinishRating={this.ratingCompleted}
                  style={{ marginTop: 1, marginStart: 15, paddingVertical: 1 }}
                />
                <Text
                  style={[{ marginStart: 10, marginEnd: 15 }]}
                  size="18"
                  weight="500"
                  align="left"
                  color={COLORS.black}>
                  {item.user_rating_count}
                </Text>
              </View>
            </View>
          )} */}

          <Text
            style={[styles.inputView, { marginTop: 20 }]}
            size="18"
            weight="500"
            align="left"
            color={COLORS.textColor}>
            {getTranslation('products_details')}
          </Text>

          <FlatList
            showsVerticalScrollIndicator={false}
            data={isProposalToModificationOfAd ? dbProducts : products}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return <DeliveryManSummaryProductsItemList
                item={item}
                isProposalToModificationOfAd={isProposalToModificationOfAd}
                photosModalVisibleModalVisibility={(prod_id) => {
                  setModifyProdId(prod_id)
                  photosModalVisibleModalVisibility();
                }}
                webLinkModalVisibleModalVisibility={(prod_id) => {
                  setModifyProdId(prod_id)
                  webLinkModalVisibleModalVisibility();
                }}
                changePriceQuantityModalVisibleModalVisibility={(prod_id) => {
                  setModifyProdId(prod_id)
                  changePriceQuantityModalVisibleModalVisibility();
                }}
              />;
            }}
          />

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
                {isProposalToModificationOfAd ? (newGlobalCommission ? '€ ' + parseFloat(newGlobalCommission).toFixed(2) : '€ ' + parseFloat(item.ad_cmsn_price).toFixed(2)) : '€ ' + parseFloat(item.ad_cmsn_price).toFixed(2)}
              </Text>
            </View>

            {isProposalToModificationOfAd && (
              <Text
                style={[
                  styles.rightButtons,
                  { marginTop: 0.5, },
                ]}
                color={COLORS.white}
                size="16"
                weight="500"
                onPress={() => {
                  commissionModalVisibleModalVisibility();
                }}>
                {getTranslation('change')}
              </Text>
            )}

            <View
              style={{
                flexDirection: 'row',
                marginTop: isProposalToModificationOfAd ? 0.5 : 5,
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
                {isProposalToModificationOfAd ? (newGlobalCommission ? '€ ' + getCommissionPrice() : '€ ' + parseFloat(item.ad_cmsn_delivery).toFixed(2)) : '€ ' + parseFloat(item.ad_cmsn_delivery).toFixed(2)}
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
                color={COLORS.textColor4}
                size="16"
                weight="500">
                {moment(item.ad_accept_limit).format('YYYY-MM-DD HH:mm')}
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
                {moment(item.ad_delivery_limit).format('YYYY-MM-DD HH:mm')}
              </Text>
            </View>

            <View
              style={{
                marginTop: 5,
                // flexDirection: 'row',
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
                  {isProposalToModificationOfAd ? (newPlaceOfDelivery ? newPlaceOfDelivery : item.ad_delv_addr) : item.ad_delv_addr}
                </Text>
              </View>
              {isProposalToModificationOfAd && (
                <Text
                  style={[styles.rightButtons, { marginRight: 0 }]}
                  color={COLORS.white}
                  size="16"
                  weight="500"
                  onPress={() => {
                    placeOfDeliveryModalVisibleModalVisibility();
                  }}>
                  {getTranslation('change')}
                </Text>
              )}
            </View>
          </View>

          {!isProposalToModificationOfAd && (
            <View>
              <CheckBox
                isSelected={isSelected}
                text={getTranslation('contract_terms')}
                onChecked={setCheck}
              />
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
                  style={[{ width: 156, backgroundColor: COLORS.homeBg }]}
                  title={getTranslation('to_propose')}
                  onPress={() => {
                    if (!isSelected) {
                      Toast.show('Please select Contract terms');
                    } else {
                      proposalToModificationOfAd();
                      //save all data to local db for changes,
                      onDiscard();
                      setAllOldDataInLocalDb();
                    }
                  }}
                />

                <Button
                  style={[{ width: 156 }]}
                  title={getTranslation('accept')}
                  onPress={() => {
                    if (!isSelected) {
                      Toast.show('Please select Contract terms');
                    } else {
                      PaymentDialogModalVisibility();
                    }
                  }}
                />
              </View>
            </View>
          )}
          {isProposalToModificationOfAd && (
            <View>
              <View
                style={{
                  backgroundColor: COLORS.borderColor2,
                  height: 2,
                  marginTop: 10,
                }}></View>

              <TextInput
                style={[styles.inputView, styles.comment]}
                placeholder={getTranslation('why_this_change')}
                multiline={true}
                value={whyThisChange}
                onChangeText={text => {
                  setWhyThisChange(text);
                }}
              />

              <View
                style={{
                  marginHorizontal: 20,
                  marginBottom: 20,
                  marginTop: 20,
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
                      backgroundColor: COLORS.homeBg,
                    },
                  ]}
                  title={getTranslation('to_cancel')} //or Change Delivery Date (according to condition)
                  onPress={() => {
                    setNewGlobalCommission('');
                    setNewPlaceOfDelivery('');
                    proposalToModificationOfAd();
                    onDiscard();
                    setChangedItem(false)
                  }}
                />

                <Button
                  style={[{ width: 156 }]}
                  title={getTranslation('to_propose')}
                  onPress={() => {
                    if (!whyThisChange) {
                      Toast.show(getTranslation('pls_enter_why_changes'))
                    } else if (!changedItem) {
                      Toast.show(getTranslation('pls_enter_any_fields'))
                    } else {
                      //*******after edit total to pay price********* */
                      var totalPrice = 0;
                      for (let i = 0; i < dbProducts.length; i++) {
                        totalPrice = totalPrice + (dbProducts[i].prod_price * dbProducts[i].prod_qnty);
                      }
                      const totalToPay = totalPrice + parseInt(newGlobalCommission ? newGlobalCommission : item.ad_cmsn_price);
                      setNewTotalToPay(parseFloat(totalToPay).toFixed(2));

                      PaymentDialogModalVisibility();
                      //sendRequestForEdit();
                    }

                  }}
                />
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>

      {isLoading ? <ProgressView></ProgressView> : null}

      <ActionSheet ref={actionSheetRef}>
        <View style={[styles.bottomView, {}]}>
          <View style={[styles.bottomViewItem, {}]}>
            <TouchableOpacity onPress={() => onPressLibrary(1)}>
              <View style={[styles.bottomViewIcon, {}]}>
                <View
                  style={{
                    backgroundColor: COLORS.primaryColor,
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={IMAGES.camera}
                    tintColor={COLORS.white}
                    style={{
                      height: 24,
                      width: 24,
                      alignSelf: 'center',
                      justifyContent: 'center',
                    }}
                  />
                </View>
                <Text
                  style={[styles.modalText]}
                  size="16"
                  weight="500"
                  color={COLORS.textColor}>
                  {getTranslation('camera')}
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                height: 1,
                width: '100%',
                borderColor: COLORS.primaryColor,
                borderWidth: 1,
              }}></View>
            <TouchableOpacity onPress={() => onPressLibrary(2)}>
              <View style={[styles.bottomViewIcon, {}]}>
                <View
                  style={{
                    backgroundColor: COLORS.primaryColor,
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={IMAGES.photos}
                    tintColor={COLORS.white}
                    style={{
                      height: 24,
                      width: 24,
                      alignSelf: 'center',
                      justifyContent: 'center',
                    }}
                  />
                </View>

                <Text
                  style={[styles.modalText]}
                  size="16"
                  weight="500"
                  color={COLORS.textColor}>
                  {getTranslation('photo_library')}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ActionSheet>

      <Modal
        animationType="slide"
        transparent
        visible={isPaymentDialogModalVisibility}
        presentationStyle="overFullScreen"
        onDismiss={PaymentDialogModalVisibility}>
        <View style={styles.viewWrapper}>
          <View style={styles.modalView1}>
            <Text
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                padding: 15,
                backgroundColor: COLORS.primaryColor,
                width: '100%',
              }}
              size="18"
              weight="500"
              align="left"
              color={COLORS.white}>
              {getTranslation('payment')}
            </Text>

            <TouchableOpacity
              style={{
                width: 24,
                height: 24,
                position: 'absolute',
                margin: 15,
                justifyContent: 'center',
                right: 0,
              }}
              onPress={() => {
                setSelectDate('')
                setSelectTime('')
                PaymentDialogModalVisibility();
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
              style={{ marginTop: 20 }}
              size="18"
              weight="500"
              align="center"
              color={COLORS.black}>
              {getTranslation('payment_guarantee_deposit')}
            </Text>

            <Text
              style={{ marginTop: 20 }}
              size="18"
              weight="500"
              align="center"
              color={COLORS.primaryColor}>
              {isProposalToModificationOfAd ? (newGlobalCommission ? '€ ' + parseFloat(newGlobalCommission).toFixed(2) : ' € ' + parseFloat(item.ad_cmsn_price).toFixed(2)) : ' € ' + parseFloat(item.ad_cmsn_price).toFixed(2)}
            </Text>

            <Text
              style={{ marginTop: 20, marginHorizontal: 20 }}
              size="16"
              weight="400"
              align="center"
              color={COLORS.black}>
              {getTranslation('some_block_until_the_txn')}
            </Text>

            <Text
              style={{ marginTop: 20 }}
              size="16"
              weight="400"
              align="center"
              color={COLORS.black}>
              {getTranslation('expected_delivery')}
            </Text>

            <TouchableOpacity
              onPress={() => {
                showDatepicker('date');
                setDateSelected(true);
              }}
              style={{ marginHorizontal: 10, marginTop: 20 }}>
              <Input
                //style={{marginHorizontal: 10, marginTop: 20}}
                placeholder={'Day'}
                isLeft={IMAGES.date}
                editable={false}

                value={selectDate}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                showDatepicker('time');
                setDateSelected(false);
              }}
              style={{ marginVertical: 10, marginHorizontal: 10 }}>
              <Input
                placeholder={getTranslation('hour')}
                isLeft={IMAGES.time}
                value={selectTime}
                editable={false}

              />
            </TouchableOpacity>

            <Button
              style={[
                styles.inputView,
                {
                  width: 200,
                  marginTop: 10,
                  marginBottom: 20,
                  alignSelf: 'center',
                },
              ]}
              title={'Ok'}
              onPress={() => {
                if (!selectDate) {
                  Toast.show(getTranslation('pls_enter_day'));
                } else if (!selectTime) {
                  Toast.show(getTranslation('pls_enter_time'));
                } else {
                  PaymentDialogModalVisibility();
                  // if(isProposalToModificationOfAd){
                  //   sendRequestForEdit();
                  // }else{
                  paypalPayment();
                  // }
                }
              }}
            />
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent
        visible={isPlaceOfDeliveryModalVisible}
        presentationStyle="overFullScreen"
        onDismiss={placeOfDeliveryModalVisibleModalVisibility}>
        <View style={[styles.viewWrapper]}>
          <View style={styles.modalView1}>
            <View
              style={{
                backgroundColor: COLORS.white,
                elevation: 3,
                marginHorizontal: 15,
                marginTop: 20,
                borderRadius: 20,
              }}>
              <Text
                style={{ marginTop: 20, marginHorizontal: 20 }}
                size="18"
                weight="500"
                align="left"
                color={COLORS.black}>
                {getTranslation('place_of_delivery_new')}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  placeOfDeliveryModalVisibleModalVisibility();
                  onGooglePlace();
                }}
                // style={[styles.inputView, styles.inputContainer]}
                style={{ marginTop: 30, marginBottom: 50, marginHorizontal: 10 }}
              >
                <Input
                  // style={{ marginTop: 30, marginBottom: 50, marginHorizontal: 10 }}
                  placeholder={''}
                  value={newPlaceOfDelivery}
                  isLeft={IMAGES.location}
                  editable={false}
                // onChangeText={text => {
                //   // setDay(text);
                // }}
                />
              </TouchableOpacity>
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
                type={1}
                titleColor={COLORS.primaryColor}
                style={[styles.modalCancelButton]}
                title={getTranslation('cancel')} //or Change Delivery Date (according to condition)
                onPress={() => {
                  placeOfDeliveryModalVisibleModalVisibility();
                }}
              />

              <Button
                style={[styles.modalConfirmButton]}
                title={getTranslation('confirm')}
                onPress={() => {
                  placeOfDeliveryModalVisibleModalVisibility();
                }}
              />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent
        visible={isWebLinkModalVisible}
        presentationStyle="overFullScreen"
        onDismiss={webLinkModalVisibleModalVisibility}>
        <View style={[styles.viewWrapper]}>
          <View style={styles.modalView1}>
            <View
              style={{
                backgroundColor: COLORS.white,
                elevation: 3,
                marginHorizontal: 15,
                marginTop: 20,
                borderRadius: 20,
              }}>
              <Text
                style={{ marginTop: 20, marginHorizontal: 20 }}
                size="18"
                weight="500"
                align="left"
                color={COLORS.black}>
                {getTranslation('web_link_new')}
              </Text>
              <Input
                style={{ marginTop: 30, marginBottom: 50, marginHorizontal: 10 }}
                placeholder={getTranslation('enter_web_link')}
                isLeft={IMAGES.weblink}
                onChangeText={text => {
                  setNewWebLink(text);
                }}
              />
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
                type={1}
                titleColor={COLORS.primaryColor}
                style={[styles.modalCancelButton]}
                title={getTranslation('cancel')} //or Change Delivery Date (according to condition)
                onPress={() => {
                  setNewWebLink('')
                  webLinkModalVisibleModalVisibility();
                }}
              />

              <Button
                style={[styles.modalConfirmButton]}
                title={getTranslation('confirm')}
                onPress={() => {
                  if (!newWebLink) {
                    Toast.show(getTranslation('pls_entger_web_link'));
                  } else if (!validURL(newWebLink)) {
                    Toast.show(getTranslation('pls_enter_valid_web_link'));
                  } else {
                    updateWebLinkInModifyDb();
                  }

                }}
              />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent
        visible={isPhotosModalVisible}
        presentationStyle="overFullScreen"
        onDismiss={photosModalVisibleModalVisibility}>
        <View style={[styles.viewWrapper]}>
          <View style={styles.modalView1}>
            <View
              style={{
                backgroundColor: COLORS.white,
                elevation: 3,
                marginHorizontal: 15,
                marginTop: 20,
                borderRadius: 20,
              }}>
              <Text
                style={{ marginTop: 20, marginHorizontal: 20 }}
                size="18"
                weight="500"
                align="left"
                color={COLORS.black}>
                {getTranslation('photos_new')}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  if (prodImg.length == 3) {
                    Toast.show(getTranslation('upload_max_thredd_photos'))
                  } else {
                    onPressUpload()
                  }
                }}
                style={{
                  alignItems: 'center',
                  marginHorizontal: 20,
                  marginTop: 10,
                  marginBottom: 5,
                  borderRadius: 10,
                  backgroundColor: COLORS.homeBg,
                }}>
                <Image
                  style={{
                    width: 34,
                    height: 34,
                    marginTop: 20,
                  }}
                  source={IMAGES.photos}
                />
                <Text
                  style={{ marginTop: 10, marginBottom: 20 }}
                  size="18"
                  weight="500"
                  align="left"
                  color={'#787878'}>
                  {getTranslation('upload_photos')}
                </Text>
              </TouchableOpacity>

              <FlatList
                style={{marginBottom: 10 }}
                data={prodImg}
                horizontal={true}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                ListHeaderComponent={() => {
                  return (
                    <View style={styles.common} />
                  )
                }}
                ListFooterComponent={() => {
                  return (
                    <View style={styles.common} />
                  )
                }}
                renderItem={({ item, index }) => {
                  return (
                    <ImageBackground style={styles.imageUpload}
                      resizeMode='cover'
                      source={item ? { uri: item } : null}>
                      <TouchableOpacity onPress={() => {
                        var items = [...prodImg]
                        items = items.filter((e) => e != item)
                        setProdImg(items)
                      }}>
                        <Image
                          source={IMAGES.close}
                          style={
                            styles.crossIcon
                          }
                        />
                      </TouchableOpacity>
                    </ImageBackground>
                  )
                }} />

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
                type={1}
                titleColor={COLORS.primaryColor}
                style={[styles.modalCancelButton]}
                title={getTranslation('cancel')} //or Change Delivery Date (according to condition)
                onPress={() => {
                  setProdImg([])
                  photosModalVisibleModalVisibility();
                }}
              />
              <Button
                style={[styles.modalConfirmButton]}
                title={getTranslation('confirm')}
                onPress={() => {
                  if (prodImg.length == 0) {
                    Toast.show(getTranslation('pls_capture_image'))
                  } else {
                    updateImageInModifyDb();
                  }

                }}
              />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent
        visible={isChangePriceQuantityModalVisible}
        presentationStyle="overFullScreen"
        onDismiss={changePriceQuantityModalVisibleModalVisibility}>
        <View style={[styles.viewWrapper]}>
          <View style={styles.modalView1}>
            <View
              style={{
                backgroundColor: COLORS.white,
                elevation: 3,
                marginHorizontal: 15,
                marginTop: 20,
                borderRadius: 20,
              }}>
              <Text
                style={{ marginTop: 20, marginHorizontal: 20 }}
                size="18"
                weight="500"
                align="left"
                color={COLORS.black}>
                {getTranslation('price_qunatity')}
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '50%' }}>
                  <Text
                    style={{ marginTop: 20, marginLeft: 20 }}
                    size="14"
                    weight="500"
                    align="left"
                    color={COLORS.black}>
                    {getTranslation('enter_price_in') + ' €'}
                  </Text>
                  <Input
                    style={{ marginTop: 7, marginHorizontal: 10 }}
                    placeholder={''}
                    isLeft={IMAGES.percentage}
                    value={newPrice}
                    keyboardType={Platform.OS == 'Android' ? 'numeric' : 'number-pad'}
                    onChangeText={text => {
                      const validated = text.match(/^(\d*\.{0,1}\d{0,2}$)/) //after decimal accept only 2 digits
                      if (validated) {
                        setNewPrice(text);
                      }
                    }}
                  />
                </View>
                <View style={{ width: '50%' }}>
                  <Text
                    style={{ marginTop: 20, marginLeft: 5 }}
                    size="14"
                    weight="500"
                    align="left"
                    color={COLORS.black}>
                    {getTranslation('quantity')}
                  </Text>
                  <Input
                    style={{ marginTop: 7, marginEnd: 10 }}
                    placeholder={''}
                    value={newQuantity}
                    isLeft={IMAGES.quantity}
                    keyboardType={Platform.OS == 'Android' ? 'numeric' : 'number-pad'}
                    onChangeText={text => {
                      const numericRegex = /^([0-9]{0,100})+$/
                      if (numericRegex.test(text)) {
                        setNewQunatity(text)
                      }
                    }}
                  />
                </View>
              </View>
              <Text
                style={{ alignSelf: 'center', marginTop: 20 }}
                size="14"
                weight="500"
                align="left"
                color={COLORS.primaryColor}>
                {getTranslation('total_price')}
              </Text>
              <Text
                style={{
                  marginHorizontal: 15,
                  borderRadius: 50,
                  paddingHorizontal: 20,
                  paddingVertical: 15,
                  marginTop: 5,
                  backgroundColor: COLORS.lightGray,
                  marginBottom: 20,
                }}
                size="14"
                weight="500"
                align="center"
                color={COLORS.primaryColor}>
                {'€ ' + getTotalPrice()}
              </Text>
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
                type={1}
                titleColor={COLORS.primaryColor}
                style={[styles.modalCancelButton]}
                title={getTranslation('cancel')} //or Change Delivery Date (according to condition)
                onPress={() => {
                  setNewPrice('');
                  setNewQunatity('');
                  setNewTotalPrice('');
                  changePriceQuantityModalVisibleModalVisibility();
                }}
              />
              <Button
                style={[styles.modalConfirmButton]}
                title={getTranslation('confirm')}
                onPress={() => {
                  if (!newPrice) {
                    Toast.show(getTranslation('enter_price_of_product'));
                  } else if (!newQuantity) {
                    Toast.show(getTranslation('enter_quantity'));
                  } else {
                    updatePriceInModifyDb();
                  }

                }}
              />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent
        visible={isCommissionModalVisible}
        presentationStyle="overFullScreen"
        onDismiss={commissionModalVisibleModalVisibility}>
        <View style={[styles.viewWrapper]}>
          <View style={styles.modalView1}>
            <View
              style={{
                backgroundColor: COLORS.white,
                elevation: 3,
                marginHorizontal: 15,
                marginTop: 20,
                borderRadius: 20,
              }}>
              <Text
                style={{ marginTop: 20, marginHorizontal: 20 }}
                size="18"
                weight="500"
                align="left"
                color={COLORS.black}>
                {getTranslation('commission_new')}
              </Text>
              <View>
                <Text
                  style={{ marginTop: 20 }}
                  size="14"
                  weight="500"
                  align="center"
                  color={COLORS.black}>
                  {getTranslation('enter_global_commission') + ' €'}
                </Text>
                <Input
                  style={{ marginTop: 7, marginHorizontal: 10 }}
                  placeholder={''}
                  value={newGlobalCommission}
                  isLeft={IMAGES.percentage}
                  keyboardType={Platform.OS == 'Android' ? 'numeric' : 'number-pad'}
                  onChangeText={text => {
                    setNewGlobalCommission(text)
                  }}
                />
              </View>
              <View
                style={{
                  justifyContent: 'flex-end',
                  marginVertical: 20,
                  flexDirection: 'row',
                }}>
                <Text
                  style={{ alignSelf: 'center' }}
                  size="18"
                  weight="500"
                  align="left"
                  color={COLORS.black}>
                  {getTranslation('your_commission')}
                </Text>
                <Text
                  style={{ paddingHorizontal: 10 }}
                  size="18"
                  weight="500"
                  align="center"
                  color={COLORS.primaryColor}>
                  {'€ ' + getCommissionPrice()}
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
                type={1}
                titleColor={COLORS.primaryColor}
                style={[styles.modalCancelButton]}
                title={getTranslation('cancel')} //or Change Delivery Date (according to condition)
                onPress={() => {
                  setNewGlobalCommission('');
                  commissionModalVisibleModalVisibility();
                }}
              />
              <Button
                style={[styles.modalConfirmButton]}
                title={getTranslation('confirm')}
                onPress={() => {
                  if (!newGlobalCommission) {
                    Toast.show(getTranslation('pls_enter_global_commission'))
                  } else {
                    setChangedItem(true)
                    commissionModalVisibleModalVisibility();
                  }

                }}
              />
            </View>
          </View>
        </View>
      </Modal>
      {show && <DateTimePick
        value={date}
        mode={mode}
        onChange={onChange}
        minimumDate={new Date()}
        maximumDate={new Date(moment(item.ad_delivery_limit).format('YYYY-MM-DD'))}
      />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1.0,
    backgroundColor: COLORS.homeBg,
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
    top: '30%',
    margin: 20,
    elevation: 5,
    transform: [{ translateX: -(width * 0.4) }, { translateY: -90 }],
    // height: 250,
    // width: width * 0.85,
    backgroundColor: '#fff',
    borderRadius: 7,
  },
  rightButtons: {
    // position: 'absolute',
    alignSelf: 'flex-end',
    borderRadius: 30,
    paddingVertical: 2,
    paddingHorizontal: 10,
    backgroundColor: COLORS.primaryColor,
  },
  comment: {
    textAlignVertical: 'top',
    paddingHorizontal: 10,
    marginTop: 20,
    height: 120,
    backgroundColor: COLORS.lightGray,
    borderRadius: 24,
    fontSize: 16,
  },
  modalCancelButton: {
    borderColor: COLORS.primaryColor,
    borderWidth: 1.2,
    width: 132,
  },
  modalConfirmButton: {
    width: 132,
  },
  bottomView: {
    height: 150,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#ffffff',
  },
  bottomViewItem: {
    margin: 25,
    borderColor: COLORS.primaryColor,
    borderWidth: 2,
    borderRadius: 8,
  },
  bottomViewIcon: {
    flexDirection: 'row',
    height: 50,
    marginStart: 20,
    alignItems: 'center',
  },
  modalText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    marginStart: 20,
  },
  common: {
    width: 50
  },
  crossIcon: {
    alignSelf: 'flex-end',
    margin: 6,
    height: 20,
    width: 20,
  },
  imageUpload: {
    height: 70,
    width: 70,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: COLORS.sky,
    marginRight: 8,
    marginTop: 20,
  },

});

export default AdSummaryDetails;
