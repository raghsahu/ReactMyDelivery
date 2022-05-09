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
  FlatList,
  BackHandler
} from 'react-native';

//ASSETS
import { COLORS, IMAGES, DIMENSION } from '../assets';

//COMMON COMPONENT
import {
  Button,
  Text,
  Input,
  Header,
  BottomBackground,
  ProductsItemList,
  DateTimePick,
  ProgressView,
} from '../components';
import moment from 'moment'; // date format

const { height, width } = Dimensions.get('screen');
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { Rating } from 'react-native-ratings';
import Toast from 'react-native-simple-toast';
import firestore from '@react-native-firebase/firestore'
import Clipboard from '@react-native-community/clipboard';
//CONTEXT
import { LocalizationContext } from '../context/LocalizationProvider';
import { APPContext } from '../context/AppProvider';
import { CommonUtilsContext } from '../context/CommonUtils';

function SummaryTransaction(props) {
  const { status, subTabIndex } = props.route.params;
  const [item, setItem] = useState({});
  const [products, setItemProducts] = useState([]);
  const [user_x, setUser_X] = useState([]);
  const [user_y, setUser_Y] = useState([]);
  const { getTranslation } = useContext(LocalizationContext);
  const { imageBaseUrl, putDateTimeChangeRequest, check_code, user } = useContext(APPContext);
  const { getAdGender } = useContext(CommonUtilsContext);
  const [isTxnCodeModalVisible, setTxnCodeModalVisible] = useState(false);
  const [isDateModalVisible, setDateModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [selectDate, setSelectDate] = useState('');
  const [selectTime, setSelectTime] = useState('');
  const [dateSelected, setDateSelected] = useState(false);
  const [otp, setOtp] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isRating, setRatingStatus] = useState(false);

  // var dateA = new Date(moment(props.route.params.summaryData.ad_delivery_limit).format('YYYY-MM-DD')).valueOf();
  // var dateB = new Date(moment(new Date()).format('YYYY-MM-DD')).valueOf();
  const dateA = new Date(moment(props.route.params.summaryData.ad_delivery_limit, 'YYYY-MM-DDTHH:mm:ss.SSSZ').toString().split('GMT')[0]+ ' UTC').toISOString();
  const dateB = new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString();

  useEffect(() => {
    setItem({});
    setItemProducts([])
    setUser_X([])
    setUser_Y([])

    //**************** */
    const item = props.route.params.summaryData;
    setItem(item);
    setItemProducts(item.products)
    setUser_X(item.user_x[0])
    setUser_Y(item.user_y[0])

    console.log('ad_iddd ', item.ad_id)

  }, [props]);

  useEffect(() => {
    function handleBackButton() {
      backAction();
      return true;
    }
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => backHandler.remove();
  }, []);

  const backAction = () => {
    if (status == 'completed') {
      props.navigation.navigate('MyAccount', {
        tabIndex: 4,
      });
    } else {
      props.navigation.navigate('MyAccount', {
        tabIndex: 3,
      });
    }

  };

  const getNodeId = (ad_id, user1, user2) => {
    return ad_id + '_' + user1 + '_' + user2
  };

  const checkChatRoom = (headerTitle, receiverId, fcmKey) => {
    console.log('finalNode ', getNodeId(item.ad_id, user_x.user_id, user_y.user_id))

    if (getNodeId(item.ad_id, user_x.user_id, user_y.user_id)) {
      //*********get all thread***** */
      const unsubscribe = firestore()
        .collection('MESSAGES')
        .onSnapshot(querySnapshot => {
          const threads = querySnapshot.docs.map(documentSnapshot => {
            return {
              _id: documentSnapshot.id,
              name: '',
              ...documentSnapshot.data()
            }
          })

          if (threads.length > 0) {
            const threadId = findLinkByName(threads, getNodeId(item.ad_id, user_x.user_id, user_y.user_id));
            if (threadId) {
              props.navigation.navigate('ChatScreen', {
                headerTitle: headerTitle,
                chatRoomId: threadId,
                finalNodeId: getNodeId(item.ad_id, user_x.user_id, user_y.user_id),
                ad_id: item.ad_id,
                recieverId: receiverId,
                fcmKey: fcmKey,
                prodName: products[0].prod_name,
              })
            } else {
              NewThreadCreate(headerTitle, receiverId, fcmKey);
            }
          } else {
            NewThreadCreate(headerTitle, receiverId, fcmKey);
          }

        })
      return () => unsubscribe()

    } else {
      console.log('finalNodeNot found ')
    }

  };

  const NewThreadCreate = (headerTitle, receiverId, fcmKey) => {
    //// create new thread using firebase & firestore
    firestore()
      .collection('MESSAGES')
      .add({
        name: getNodeId(item.ad_id, user_x.user_id, user_y.user_id),
        createdAt: new Date().getTime(),
      })
      .then(docRef => {
        docRef.collection(getNodeId(item.ad_id, user_x.user_id, user_y.user_id)).add({
          text: `Chat room created. Welcome!`,
          createdAt: new Date().getTime(),
          system: true
        })
        if (docRef.id) {
          props.navigation.navigate('ChatScreen', {
            headerTitle: headerTitle,
            chatRoomId: docRef.id,
            finalNodeId: getNodeId(item.ad_id, user_x.user_id, user_y.user_id),
            ad_id: item.ad_id,
            recieverId: receiverId,
            fcmKey: fcmKey,
            prodName: products[0].prod_name,
          })
        }

      })
  };

  function findLinkByName(threads, name) {
    for (const item of threads) {
      if (item.name === name) {
        return item._id;
      }
    }
  }

  function showDatepicker(mode) {
    showMode(mode);
  }

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const onChange = (event, selectedDate) => {
    // console.log('time_select ' + selectedDate);
    setShow(Platform.OS === 'ios');

    if (dateSelected) {
      const currentDate = selectedDate || date;
      setDate(currentDate);
      setSelectDate(moment(currentDate).format('YYYY-MM-DD'));
    } else {
      setSelectTime(moment(selectedDate).format('HH:mm'));
    }
  };

  const TxnCodeModalVisibility = () => {
    setTxnCodeModalVisible(!isTxnCodeModalVisible);
  };

  const ChangeDateModalVisibility = () => {
    setDateModalVisible(!isDateModalVisible);
  };

  const setCheck = checkStatus => {
    setSelection(checkStatus);
  };

  const onNext = async () => {
    setLoading(true);
    const result = await putDateTimeChangeRequest(
      user.user_id,
      item.ad_id,
      selectDate,
      selectTime,
    );
    setLoading(false);
    if (result.status == true) {
      Toast.show(result.error);

    } else {
      Toast.show(result.error);
    }
  };

  const checkCodeApi = async () => {
    setLoading(true);
    const result = await check_code(item.ad_id, otp, '3');
    setLoading(false);
    if (result.status == true) {
      Toast.show(result.error);
      TxnCodeModalVisibility();
      props.navigation.navigate('ExchangeSuccessSummary', {
        summaryData: result.data,
      });

    } else {
      Toast.show(result.error);
    }
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
        <Header
          title={getTranslation('summary_of_txn')}
          onBack={() => {
            //  props.navigation.goBack();
            if (status == 'completed') {
              props.navigation.navigate('MyAccount', {
                tabIndex: 4,
              });
            } else {
              props.navigation.navigate('MyAccount', {
                tabIndex: 3,
              });
            }
          }}
        />
        <BottomBackground></BottomBackground>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          <View>
            {status != 'completed' && subTabIndex != 1 ?
              <View>
                <Text
                  style={[styles.inputView, { marginTop: 20 }]}
                  size="18"
                  weight="500"
                  align="left"
                  color={COLORS.textColor}>
                  {getTranslation('txn_code')}
                </Text>

                <View
                  style={{
                    justifyContent: 'center',
                    alignSelf: 'center',
                    marginTop: 20,
                    width: '85%',
                    height: 80,
                    shadowColor: 'black',
                    shadowOpacity: 0.26,
                    shadowOffset: { width: 0, height: 2 },
                    shadowRadius: 10,
                    elevation: 3,
                    borderRadius: 12,
                    backgroundColor: 'white',
                    flex: 1,
                  }}>
                  <TouchableOpacity onPress={() => {
                    Clipboard.setString(item.acpt_code)
                    Toast.show('Copied')
                  }}>
                    <Text
                      style={[
                        {
                          width: 194,
                          padding: 20,
                          alignSelf: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#FEC107',
                        },
                      ]}
                      size="18"
                      weight="500"
                      align="center"
                      color={COLORS.black}>
                      {item.acpt_code}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              :
              null
            }

            {status === 'inProgress' && subTabIndex === 1 ?
              <View>
                <Text
                  style={[styles.inputView, { marginTop: 20 }]}
                  size="18"
                  weight="500"
                  align="left"
                  color={COLORS.textColor}>
                  {'Deliveryman Details'}
                </Text>

                <View
                  style={{
                    justifyContent: 'center',
                    alignSelf: 'center',
                    marginTop: 20,
                    width: '85%',
                    height: 80,
                    shadowColor: 'black',
                    shadowOpacity: 0.26,
                    shadowOffset: { width: 0, height: 2 },
                    shadowRadius: 10,
                    elevation: 3,
                    borderRadius: 12,
                    backgroundColor: 'white',
                    flex: 1,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      margin: 5,
                      backgroundColor: COLORS.white,
                    }}>
                    <Image
                      style={{
                        width: 64,
                        height: 64,
                        margin: 5,
                        borderRadius: 32,
                        resizeMode: 'contain',
                      }}
                      source={user_y.user_img ? { uri: imageBaseUrl + user_y.user_img } : IMAGES.circle_placeholder}

                    />

                    <View
                      style={{
                        flex: 1,
                        margin: 5,
                      }}>
                      <Text color={COLORS.black} size="16" weight="500">
                        {user_y.user_f_name + ' ' + user_y.user_l_name}
                      </Text>

                      <View style={{ marginTop: 10, flexDirection: 'row' }}>
                        <Text
                          style={[{ marginStart: 15 }]}
                          size="18"
                          weight="500"
                          align="left"
                          color={COLORS.black}>
                          {parseFloat(user_y.user_rating).toFixed(2)}
                        </Text>
                        <Rating
                          type="custom"
                          ratingColor="#04D9C5"
                          startingValue={1}
                          ratingBackgroundColor="#04D9C5"
                          ratingCount={1}
                          imageSize={20}
                          // onFinishRating={this.ratingCompleted}
                          style={{
                            marginTop: 1,
                            marginStart: 15,
                            paddingVertical: 1,
                          }}
                        />
                        <Text
                          style={[{ marginStart: 10, marginEnd: 15 }]}
                          size="18"
                          weight="500"
                          align="left"
                          color={COLORS.black}>
                          {user_y.user_rating_count + ' ' + getTranslation('ratings')}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              :

              status != 'completed' ?
                <View>
                  <Text
                    style={[styles.inputView, { marginTop: 20 }]}
                    size="18"
                    weight="500"
                    align="left"
                    color={COLORS.textColor}>
                    {'User Details'}
                  </Text>

                  <View
                    style={{
                      justifyContent: 'center',
                      alignSelf: 'center',
                      marginTop: 20,
                      width: '85%',
                      height: 80,
                      shadowColor: 'black',
                      shadowOpacity: 0.26,
                      shadowOffset: { width: 0, height: 2 },
                      shadowRadius: 10,
                      elevation: 3,
                      borderRadius: 12,
                      backgroundColor: 'white',
                      flex: 1,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        margin: 5,
                        backgroundColor: COLORS.white,
                      }}>
                      <Image
                        style={{
                          width: 64,
                          height: 64,
                          margin: 5,
                          borderRadius: 32,
                          resizeMode: 'contain',
                        }}
                        source={user_x.user_img ? { uri: imageBaseUrl + user_x.user_img } : IMAGES.circle_placeholder}

                      />

                      <View
                        style={{
                          flex: 1,
                          margin: 5,
                        }}>
                        <Text color={COLORS.black} size="16" weight="500">
                          {user_x.user_f_name + ' ' + user_x.user_l_name}
                        </Text>

                        <View style={{ marginTop: 10, flexDirection: 'row' }}>
                          <Text
                            style={[{ marginStart: 15 }]}
                            size="18"
                            weight="500"
                            align="left"
                            color={COLORS.black}>
                            {parseFloat(user_x.user_rating).toFixed(2)}
                          </Text>
                          <Rating
                            type="custom"
                            ratingColor="#04D9C5"
                            startingValue={1}
                            ratingBackgroundColor="#04D9C5"
                            ratingCount={1}
                            imageSize={20}
                            // onFinishRating={this.ratingCompleted}
                            style={{
                              marginTop: 1,
                              marginStart: 15,
                              paddingVertical: 1,
                            }}
                          />
                          <Text
                            style={[{ marginStart: 10, marginEnd: 15 }]}
                            size="18"
                            weight="500"
                            align="left"
                            color={COLORS.black}>
                            {user_x.user_rating_count + ' ' + getTranslation('ratings')}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                :
                null

            }

          </View>


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
              return <ProductsItemList
                item={item} />;
            }}
          />

          <View style={[styles.inputView, { marginTop: 10, marginBottom: 20 }]}>
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
                color={COLORS.Darkgray}
                size="16"
                weight="500">
                {'€ ' + parseFloat(item.ad_cmsn_price).toFixed(2)}
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
                color={COLORS.Darkgray}
                size="16"
                weight="500">
                {'€ ' + parseFloat(item.ad_cmsn_delivery).toFixed(2)}
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
                color={COLORS.darkGray}
                size="16"
                weight="500">
                {moment(item.ad_delivery_limit).format('YYYY-MM-DD HH:mm')}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text style={{}} color={COLORS.black} size="16" weight="600">
                {getTranslation('place_of_delivery') + ' :'}
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

          <View style={[styles.inputView, { marginTop: 10, marginBottom: 20 }]}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text style={{}} color={COLORS.black} size="18" weight="600">
                {getTranslation('delivery_details')}
              </Text>

              <Text
                style={{
                  marginLeft: 10,
                }}
                color={COLORS.Darkgray}
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
                {getTranslation('delivery_man') + ':'}
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
                {moment(item.acpt_date + ' ' + item.acpt_time).format('HH:mm')}
              </Text>
            </View>
          </View>

          {status == 'completed' ? (
            <View>
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
                  {moment(item.ad_delv_time).format('YYYY-MM-DD HH:mm')}
                </Text>
              </View>

              <View
                style={[
                  styles.inputView,
                  {
                    // flexDirection: 'row',
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
                  {/* {'€600 + €32,4 + €8,1 = €638'} */}
                  {'€' + getProductPrice() + ' + €' + parseFloat(item.ad_cmsn_delivery).toFixed(2) + ' + €' + checkDecimal(item.ad_cmsn_price * 0.20) + ' = €' + parseFloat(item.ad_pay_amount).toFixed(2)}
                </Text>
              </View>
            </View>
          ) : null}


          {status == 'completed' ? (
            subTabIndex === 1 && user_x.rating_status == '0' ?
              <Button
                style={[styles.inputView, { marginTop: 30, marginBottom: 30 }]}
                title={'Rating'}
                // type={1}
                onPress={() => {

                  if (status === 'completed' && subTabIndex === 1) {

                    props.navigation.navigate('RatingReview', {
                      userName: user_y.user_f_name + ' ' + user_y.user_l_name,
                      rate_ad_id: item.ad_id,
                      onReturn: item => {
                        console.log('log_item ' + item);
                        setRatingStatus(true);
                      },
                    });
                  } else {
                    props.navigation.navigate('RatingReview', {
                      userName: user_x.user_f_name + ' ' + user_x.user_l_name,
                      rate_ad_id: item.ad_id,
                      onReturn: item => {
                        console.log('log_item ' + item);
                        setRatingStatus(true);
                      },
                    });

                  }

                }}
              />
              :
              subTabIndex === 2 && user_y.rating_status == '0' ?
                <Button
                  style={[styles.inputView, { marginTop: 30, marginBottom: 30 }]}
                  title={'Rating'}
                  // type={1}
                  onPress={() => {

                    if (status === 'completed' && subTabIndex === 1) {

                      props.navigation.navigate('RatingReview', {
                        userName: user_y.user_f_name + ' ' + user_y.user_l_name,
                        rate_ad_id: item.ad_id,
                        onReturn: item => {
                          console.log('log_item ' + item);
                          setRatingStatus(true);
                        },
                      });
                    } else {
                      props.navigation.navigate('RatingReview', {
                        userName: user_x.user_f_name + ' ' + user_x.user_l_name,
                        rate_ad_id: item.ad_id,
                        onReturn: item => {
                          console.log('log_item ' + item);
                          setRatingStatus(true);
                        },
                      });

                    }

                  }}
                />
                :

                <Button
                  style={[styles.inputView, { marginTop: 30, marginBottom: 30, backgroundColor: COLORS.darkGray }]}
                  title={'Evaluation Done'}
                  type={2}
                  onPress={() => {
                    //evalution done 
                    // props.navigation.goBack();

                  }}
                />

          ) : (
            <View
              style={{
                marginHorizontal: 15,
                marginBottom: 15,
                marginTop: 30,
                flexDirection: 'row',
                justifyContent: 'space-between',
                // position: 'absolute',
              }}>
              {status == 'inProgress' && dateB > dateA ?
                <Button
                  style={[{ width: 156, backgroundColor: COLORS.darkGray }]}
                  title={'Complaint'} //or Change Delivery Date (according to condition)
                  onPress={() => {
                    // props.navigation.navigate('SendSuggestion', {
                    //   headerTitle: 'Complain',
                    // });
                  }}
                /> :
                subTabIndex === 1 ?
                  <Button
                    style={[
                      {
                        width: 160,
                        //height: 36,
                        //marginTop: 5,
                        backgroundColor: COLORS.primaryColor,
                        borderRadius: 160 / 2,
                        alignSelf: 'center',
                        justifyContent: 'center',
                      },
                    ]}
                    title={getTranslation('txn_code')}
                    onPress={() => {
                      TxnCodeModalVisibility();
                    }}
                  />
                  :
                  null
              }

              {status == 'deliveryAccepted' || (status == 'inProgress' && subTabIndex === 2 && dateB > dateA) ? (
                <Button
                  style={[
                    { width: 160, justifyContent: 'center', alignSelf: 'center' },
                  ]}
                  title={'Change Delivery Date'} //or Change Delivery Date (according to condition)
                  onPress={() => {
                    ChangeDateModalVisibility();
                  }}
                />
              ) : null}

              <Button
                style={[{ width: 160 }]}
                title={getTranslation('chat')} // X-chat (delivery man chat with user)
                type={1}
                onPress={() => {
                  let headerTitle = ''
                  let receiverID = ''
                  let fcmKey = ''
                  if (status === 'inProgress' && subTabIndex === 1) {
                    headerTitle = user_y.user_f_name + ' ' + user_y.user_l_name;
                    receiverID = user_y.user_id;
                    fcmKey = user_y.user_fcm_key;

                  } else if (status != 'completed') {
                    headerTitle = user_x.user_f_name + ' ' + user_x.user_l_name;
                    receiverID = user_x.user_id;
                    fcmKey = user_x.user_fcm_key;
                  } else {
                    headerTitle = '';

                  }

                  checkChatRoom(headerTitle, receiverID, fcmKey);

                }}
              />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>

      {isLoading ? <ProgressView></ProgressView> : null}

      <Modal
        animationType="slide"
        transparent
        visible={isTxnCodeModalVisible}
        presentationStyle="overFullScreen"
        onDismiss={isTxnCodeModalVisible}>
        <View style={styles.viewWrapper}>
          <View style={styles.modalView1}>
            <Image
              source={IMAGES.right_tick_icon}
              style={{
                height: 56,
                width: 56,
                marginTop: 20,
                alignSelf: 'center',
                justifyContent: 'center',
              }}
            />

            <Text
              style={{ marginTop: 20 }}
              size="18"
              weight="500"
              align="center"
              color={COLORS.black}>
              {getTranslation('pls_confirm_txn')}
            </Text>

            {/* <OTPInputView
              style={[{ height: 32, marginTop: 24 }]}
              pinCount={10}
              autoFocusOnLoad={false}
              keyboardType={'email-address'}
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              // placeholderCharacter=''
              // placeholderTextColor={'rgba(64,86,124,1)'}
              //code={otp}
              onCodeFilled={(code => {
                //console.log(`Code is ${code}, you are good to go!`)
                setOtp(code);
              })}
            /> */}
            <Input
              style={[styles.inputView, styles.inputContainer]}
              placeholder={'Please enter Transaction code'}
              onChangeText={text => {
                setOtp(text);
              }}

            />

            <View
              style={{
                marginHorizontal: DIMENSION.marginHorizontal,
                marginTop: 30,
                flexDirection: 'row',
                justifyContent: 'space-between',
                // position: 'absolute',
              }}>
              <Button
                style={[
                  styles.inputView,
                  { width: 100, justifyContent: 'center' },
                ]}
                title={getTranslation('cancel')}
                onPress={() => {
                  setOtp('')
                  TxnCodeModalVisibility();
                }}
              />

              <Button
                style={[{ width: 100 }]}
                title={getTranslation('confirm')}
                onPress={() => {
                  if (!otp) {
                    Toast.show('Please enter 10 digit txn code')
                  } else if (otp.length != 10) {
                    Toast.show('Please enter 10 digit txn code')
                  }
                  else {
                    checkCodeApi();
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
        visible={isDateModalVisible}
        presentationStyle="overFullScreen"
        onDismiss={isDateModalVisible}>
        <View style={styles.viewWrapper}>
          <View style={styles.modalView}>
            <Text
              style={{
                width: '100%',
                backgroundColor: COLORS.primaryColor,
                padding: 10,
                alignSelf: 'center',
              }}
              size="18"
              weight="500"
              align="center"
              color={COLORS.white}>
              {getTranslation('change_date_time')}
            </Text>

            <Text
              style={{ padding: 10, alignSelf: 'center' }}
              size="18"
              weight="500"
              align="center"
              color={COLORS.black}>
              {'Proposal changing \n delivery date and time'}
            </Text>

            <TouchableOpacity
              onPress={() => {
                showDatepicker('date');
                setDateSelected(true);
              }}
              style={[styles.inputView, styles.inputContainer]}>
              <Input
                //style={[styles.inputView, styles.inputContainer]}
                placeholder={getTranslation('day')}
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
              style={[styles.inputView, styles.inputContainer]}>
              <Input
                //  style={[styles.inputView, styles.inputContainer]}
                placeholder={getTranslation('hour')}
                isLeft={IMAGES.time}
                editable={false}
                value={selectTime}
              />
            </TouchableOpacity>

            <View
              style={{
                marginHorizontal: DIMENSION.marginHorizontal,
                marginTop: 30,
                flexDirection: 'row',
                justifyContent: 'space-between',
                // position: 'absolute',
              }}>
              <Button
                style={[
                  styles.inputView,
                  { width: 100, justifyContent: 'center' },
                ]}
                title={getTranslation('cancel')}
                onPress={() => {
                  setSelectDate('')
                  setSelectTime('')
                  ChangeDateModalVisibility();
                }}
              />

              <Button
                style={[{ width: 100 }]}
                title={getTranslation('propose')}
                onPress={() => {
                  if (!selectDate) {
                    Toast.show('Please enter day');
                  } else if (!selectTime) {
                    Toast.show('Please enter time');
                  } else {
                    ChangeDateModalVisibility();
                    onNext();
                  }
                  // props.navigation.navigate('ProposalChangedDate');
                  // setEnableTxnCodeBtn(true);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>

      {show && <DateTimePick value={date} mode={mode} onChange={onChange}
        minimumDate={new Date()}
      />}
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
    transform: [{ translateX: -(width * 0.46) }, { translateY: -90 }],
    height: 320,
    width: width * 0.93,
    backgroundColor: '#fff',
    borderRadius: 7,
  },
  modalView: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    elevation: 5,
    transform: [{ translateX: -(width * 0.4) }, { translateY: -90 }],
    height: 350,
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
    height: 40,
    borderRadius: 16,
    //backgroundColor: COLORS.lightGray,
    color: COLORS.black,

  },
  underlineStyleHighLighted: {
    borderColor: COLORS.primaryColor,
    color: COLORS.black,
  },
});

export default SummaryTransaction;
