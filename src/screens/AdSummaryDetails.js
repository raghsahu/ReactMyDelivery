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
import { Rating } from 'react-native-ratings';
import moment from 'moment'; // date format

const { height, width } = Dimensions.get('screen');
//CONTEXT
import { LocalizationContext } from '../context/LocalizationProvider';
import { CommonUtilsContext } from '../context/CommonUtils';
import { APPContext } from '../context/AppProvider';
//package
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {PermissionsAndroid} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import Toast from 'react-native-simple-toast';
import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'DescribeProduct.db'});

function AdSummaryDetails(props) {
  const actionSheetRef = useRef();
  const [item, setItem] = useState({});
  const [products, setItemProducts] = useState([]);
  const { getTranslation } = useContext(LocalizationContext);
  const { getAdGender } = useContext(CommonUtilsContext);
  const { getAdAccept, user } = useContext(APPContext);
  const [name, setName] = useState('');
  const [day, setDay] = useState('');
  const [hour, setHour] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [selectDate, setSelectDate] = useState('');
  const [selectTime, setSelectTime] = useState('');
  const [dateSelected, setDateSelected] = useState(false);
  const [reasonToChange, setReasonToChange] = useState('');
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
  const [prodImg, setProdImg] = useState('');
  const [modifyProdId, setModifyProdId] = useState('');

  useEffect(() => {
    const item = props.route.params.ProdData;
    setItem(item);
    setItemProducts(item.products)

    var totalPrice = 0;
    for (let i = 0; i < products.length; i++) {
      totalPrice =
        totalPrice + products[i].prod_price * products[i].prod_qnty;
    }
    setTotalPrice(totalPrice);
    const totalToPay = totalPrice + parseInt(item.ad_cmsn_price);
    setTotalToPay(totalToPay);

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
          
          }
        },
      );
    });
  }
  };

  const onDiscard = () => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM modify_product',
        (tx, results) => {
          try{
            console.log('ResultsDelete', results.rowsAffected);
           
            if (results.rowsAffected == 0) {
             
            }
          }catch(ex){
             console.log(ex)
          }
        
        },
      );
    });
  };

  const updateImageInModifyDb = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE modify_product set prod_img=?, where prod_id=?',
        [prodImg, modifyProdId],
        (tx, results) => {
          try{
            console.log('ResultsUpdate', results.rowsAffected);
           
            if (results.rowsAffected == 0) {
             
            }
          }catch(ex){
             console.log(ex)
          }
        }
      );
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
      setSelectTime(moment(selectedDate).format('HH:mm:ss'));
    }
  };

  const onNext = async () => {
    setLoading(true);
    const result = await getAdAccept(
      user.user_id,
      item.ad_id,
      selectDate,
      selectTime,
      '3', //ad accept type = 1-Z Accepted Ad, 2-X Accepted Ad,3-Y Accepted Ad
      '0', //0-pending,1-success,2-cancel,3-return
      totalToPayPrice,
      'No payment'
    );
    setLoading(false);
    if (result.status == true) {
      Toast.show(result.error);
      props.navigation.navigate('SummaryTransaction', {
        status: '',
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
    var result = null;
    // if (requestExternalStoreageRead()) {
    if (type == 1) {
      result = await launchCamera();
      actionSheetRef.current?.setModalVisible(false);
    } else {
      result = await launchImageLibrary();
      actionSheetRef.current?.setModalVisible(false);
    }
    console.log(result);
    if (result && result.assets.length > 0) {
      let uri = result.assets[0].uri;
      // let items = [...images];
      //items.push(uri);
      setProdImg(uri);
    }
    // }
  };

  const requestExternalStoreageRead = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'My Delivery ...',
          message: 'App needs access to external storage',
        },
      );

      return granted == PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      //Handle this error
      return false;
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
          {!isProposalToModificationOfAd && (
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
                  {item.user_rating}
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
          )}

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
            data={products}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return <DeliveryManSummaryProductsItemList
                item={item}
                isProposalToModificationOfAd={isProposalToModificationOfAd}
                photosModalVisibleModalVisibility={(prod_id) => {
                  //console.log('prod_iddddd '+ prod_id)
                  setModifyProdId(prod_id)
                  photosModalVisibleModalVisibility();
                }}
                webLinkModalVisibleModalVisibility={() => {
                  webLinkModalVisibleModalVisibility();
                }}
                changePriceQuantityModalVisibleModalVisibility={() => {
                  changePriceQuantityModalVisibleModalVisibility();
                }}
              />;
            }}
          />

          {/* <View
            style={{
              backgroundColor: COLORS.borderColor2,
              height: 2,
              marginTop: 10,
            }}></View> */}

          <View style={[styles.inputView, { marginTop: 20, marginBottom: 20 }]}>
            {isProposalToModificationOfAd && (
              <Text
                style={[
                  styles.rightButtons,
                  { position: 'absolute', marginTop: 10, paddingVertical: 10 },
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
                {'€ ' + item.ad_cmsn_price}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text style={{}} color={COLORS.black} size="16" weight="600">
                {getTranslation('deliveryman_commission')}
              </Text>

              <Text
                style={{
                  marginLeft: 10,
                }}
                color={COLORS.textColor4}
                size="16"
                weight="500">
                {'€ ' + item.ad_cmsn_delivery}
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
                {item.ad_accept_limit}
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
                {item.ad_delivery_limit}
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
                  {item.ad_delv_addr}
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
                    proposalToModificationOfAd();
                    //save all data to local db for changes,
                     setAllOldDataInLocalDb(); 
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
              //value={''}
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
                    proposalToModificationOfAd();
                    onDiscard();
                  }}
                />

                <Button
                  style={[{ width: 156 }]}
                  title={getTranslation('to_propose')}
                  onPress={() => {
                    props.navigation.navigate('AdModificationProposal');
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
                  {'Camera'}
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
                  {'Photo library'}
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
              {'€ ' + totalToPayPrice}
            </Text>

            <Text
              style={{ marginTop: 20, marginHorizontal: 20 }}
              size="16"
              weight="400"
              align="center"
              color={COLORS.black}>
              {'Sum blocked until the end \nof the transaction'}
            </Text>

            <Text
              style={{ marginTop: 20 }}
              size="16"
              weight="400"
              align="center"
              color={COLORS.black}>
              {'Expected delivery'}
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
                onChangeText={text => {
                  setDay(text);
                }}
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
                placeholder={'Hour'}
                isLeft={IMAGES.time}
                value={selectTime}
                editable={false}
                onChangeText={text => {
                  setHour(text);
                }}
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
                  Toast.show('Please enter day');
                } else if (!selectTime) {
                  Toast.show('Please enter time');
                } else {
                  PaymentDialogModalVisibility();
                  onNext();

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
                {'Place of Delivery (New)'}
              </Text>
              <Input
                style={{ marginTop: 30, marginBottom: 50, marginHorizontal: 10 }}
                placeholder={''}
                isLeft={IMAGES.location}
                onChangeText={text => {
                  // setDay(text);
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
                title={'Cancel'} //or Change Delivery Date (according to condition)
                onPress={() => {
                  // props.navigation.navigate('SendSuggestion', {
                  //   headerTitle: 'Complain',
                  // });
                }}
              />

              <Button
                style={[styles.modalConfirmButton]}
                title={'Confirm'}
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
                {'Web Link (New)'}
              </Text>
              <Input
                style={{ marginTop: 30, marginBottom: 50, marginHorizontal: 10 }}
                placeholder={''}
                isLeft={IMAGES.weblink}
                onChangeText={text => {
                  // setDay(text);
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
                title={'Cancel'} //or Change Delivery Date (according to condition)
                onPress={() => {
                  // props.navigation.navigate('SendSuggestion', {
                  //   headerTitle: 'Complain',
                  // });
                }}
              />

              <Button
                style={[styles.modalConfirmButton]}
                title={'Confirm'}
                onPress={() => {
                  webLinkModalVisibleModalVisibility();
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
                {'Photos (New)'}
              </Text>
              <TouchableOpacity
               onPress={onPressUpload}
                style={{
                  alignItems: 'center',
                  marginHorizontal: 20,
                  marginTop: 20,
                  marginBottom: 40,
                  borderRadius: 10,
                  backgroundColor: COLORS.homeBg,
                }}>
                <Image
                  style={{
                    width: 34,
                    height: 34,
                    marginTop: 20,
                  }}
                  source={prodImg ? {uri: prodImg} : IMAGES.photos}
                />
                <Text
                  style={{ marginTop: 10, marginBottom: 20 }}
                  size="18"
                  weight="500"
                  align="left"
                  color={'#787878'}>
                  {'Upload Photos'}
                </Text>
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
                title={'Cancel'} //or Change Delivery Date (according to condition)
                onPress={() => {
                  setProdImg('')
                  photosModalVisibleModalVisibility();
                }}
              />
              <Button
                style={[styles.modalConfirmButton]}
                title={'Confirm'}
                onPress={() => {
                  if(!prodImg){
                    Toast.show('Please capture image')
                  }else{
                    //Toast.show('captured image')
                    //updateImageInModifyDb();
                    db.transaction((tx) => {
                      tx.executeSql(
                        'SELECT * FROM modify_product where prod_id = ?',
                        ['71'],
                        (tx, results) => {
                          var len = results.rows.length;
                          if (len > 0) {
                            let res = results.rows.item(0);
                            console.log('prod_imgggg ', res.prod_img)
                            
                          } else {
                            Toast.show('No user found');
                            
                          }
                        }
                      );
                    });
                    
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
                {'Price - Quantity (New)'}
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '50%' }}>
                  <Text
                    style={{ marginTop: 20, marginLeft: 20 }}
                    size="14"
                    weight="500"
                    align="left"
                    color={COLORS.black}>
                    {'Enter price in €'}
                  </Text>
                  <Input
                    style={{ marginTop: 7, marginHorizontal: 10 }}
                    placeholder={''}
                    isLeft={IMAGES.percentage}
                    value={'6.00'}
                    onChangeText={text => {
                      // setDay(text);
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
                    {'Quantity'}
                  </Text>
                  <Input
                    style={{ marginTop: 7, marginEnd: 10 }}
                    placeholder={''}
                    isLeft={IMAGES.quantity}
                    onChangeText={text => {
                      // setDay(text);
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
                {'Total Price'}
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
                {'€ 6.00'}
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
                title={'Cancel'} //or Change Delivery Date (according to condition)
                onPress={() => {
                  // props.navigation.navigate('SendSuggestion', {
                  //   headerTitle: 'Complain',
                  // });
                }}
              />
              <Button
                style={[styles.modalConfirmButton]}
                title={'Confirm'}
                onPress={() => {
                  changePriceQuantityModalVisibleModalVisibility();
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
                {'Commission (New)'}
              </Text>
              <View>
                <Text
                  style={{ marginTop: 20 }}
                  size="14"
                  weight="500"
                  align="center"
                  color={COLORS.black}>
                  {'Enter Global Commission in €'}
                </Text>
                <Input
                  style={{ marginTop: 7, marginHorizontal: 10 }}
                  placeholder={''}
                  isLeft={IMAGES.percentage}
                  onChangeText={text => {
                    // setDay(text);
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
                  {'Your commission:'}
                </Text>
                <Text
                  style={{ paddingHorizontal: 10 }}
                  size="18"
                  weight="500"
                  align="center"
                  color={COLORS.primaryColor}>
                  {'€ 0.50'}
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
                title={'Cancel'} //or Change Delivery Date (according to condition)
                onPress={() => {
                  commissionModalVisibleModalVisibility();
                }}
              />
              <Button
                style={[styles.modalConfirmButton]}
                title={'Confirm'}
                onPress={() => {
                  commissionModalVisibleModalVisibility();
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
      {show && <DateTimePick value={date} mode={mode} onChange={onChange} minimumDate={new Date()} />}
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
});

export default AdSummaryDetails;
