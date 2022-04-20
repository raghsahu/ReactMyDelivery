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
import {COLORS, IMAGES, DIMENSION} from '../assets';

//COMMON COMPONENT
import {
  Button,
  Text,
  Input,
  Header,
  BottomBackground,
  DeliveryManSummaryProductsItemList,
  ProductsItemList,
  DateTimePick,
  ProgressView,
} from '../components';
import moment from 'moment'; // date format

const {height, width} = Dimensions.get('screen');
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {Rating} from 'react-native-ratings';
import Toast from 'react-native-simple-toast';
//CONTEXT
import {LocalizationContext} from '../context/LocalizationProvider';
import {APPContext} from '../context/AppProvider';
import {CommonUtilsContext} from '../context/CommonUtils';

function SummaryTransaction(props) {
  const {status} = props.route.params;
  const [item, setItem] = useState({});
  const [products, setItemProducts] = useState([]);
  const [user_x, setUser_X] = useState([]);
  const [user_y, setUser_Y] = useState([]);
  const {getTranslation} = useContext(LocalizationContext);
  const {imageBaseUrl, putDateTimeChangeRequest} = useContext(APPContext);
  const {getAdGender} = useContext(CommonUtilsContext);
  const [name, setName] = useState('');
  const [isSelected, setSelection] = useState(false);
  const [isTxnCodeModalVisible, setTxnCodeModalVisible] = useState(false);
  const [isDateModalVisible, setDateModalVisible] = useState(false);
  const [enableTxnCodeBtn, setEnableTxnCodeBtn] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [selectDate, setSelectDate] = useState('');
  const [selectTime, setSelectTime] = useState('');
  const [dateSelected, setDateSelected] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const item = props.route.params.summaryData;
    setItem(item);
    setItemProducts(item.products)
    setUser_X(item.user_x[0])
    setUser_Y(item.user_y[0])
  }, []);

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
      setSelectTime(moment(selectedDate).format('HH:mm:ss'));
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
          props.navigation.navigate('MyAccount', {
            tabIndex: 3,
          });
          }}
        />
        <BottomBackground></BottomBackground>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          {status === 'completed' ? null : (
            <View>
              <Text
                style={[styles.inputView, {marginTop: 20}]}
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
                  shadowOffset: {width: 0, height: 2},
                  shadowRadius: 10,
                  elevation: 3,
                  borderRadius: 12,
                  backgroundColor: 'white',
                  flex: 1,
                }}>
                <Text
                  style={[
                    {
                      width: 154,
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
              </View>

              <Text
                style={[styles.inputView, {marginTop: 20}]}
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
                  shadowOffset: {width: 0, height: 2},
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
                    source={user_x.user_img ? {uri: imageBaseUrl + user_x.user_img} : IMAGES.circle_placeholder}
              
                  />

                  <View
                    style={{
                      flex: 1,
                      margin: 5,
                    }}>
                    <Text color={COLORS.black} size="16" weight="500">
                      {user_x.user_f_name + ' '+ user_x.user_l_name}
                    </Text>

                    <View style={{marginTop: 10, flexDirection: 'row'}}>
                      <Text
                        style={[{marginStart: 15}]}
                        size="18"
                        weight="500"
                        align="left"
                        color={COLORS.black}>
                        {user_x.user_rating}
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
                        style={[{marginStart: 10, marginEnd: 15}]}
                        size="18"
                        weight="500"
                        align="left"
                        color={COLORS.black}>
                        {user_x.user_rating_count +' ' + getTranslation('ratings')}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}

          <Text
            style={[styles.inputView, {marginTop: 20}]}
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
            renderItem={({item, index}) => {
              return <DeliveryManSummaryProductsItemList
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
                {getTranslation('global_commission') + ' :'}
              </Text>

              <Text
                style={{
                  marginLeft: 10,
                }}
                color={COLORS.Darkgray}
                size="16"
                weight="500">
                {'€ '+ item.ad_cmsn_price}
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
                {'€ '+ item.ad_cmsn_delivery}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text style={{}} color={COLORS.black} size="16" weight="600">
                {getTranslation('ad_seen_by') }
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
                color={COLORS.darkGray}
                size="16"
                weight="500">
                {item.ad_delivery_limit}
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

          <View style={[styles.inputView, {marginTop: 10, marginBottom: 20}]}>
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
                {user_y.user_f_name + ' '+ user_y.user_l_name}
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
                {item.acpt_time}
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
                  {getTranslation('total_to_pay')}
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
            </View>
          ) : null}

          {/* //hide & show button with conditions */}

          {/* <Button
            style={[styles.inputView, {marginTop: 30, marginBottom: 30}]}
            title={'Evaluation Done'}
            // type={1}
            onPress={() => {
              
            }}
          /> */}

          {status == 'completed' ? (
            <Button
              style={[styles.inputView, {marginTop: 30, marginBottom: 30}]}
              title={'Rating'}
              // type={1}
              onPress={() => {
                props.navigation.navigate('RatingReview');
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
              {/* <Button
                style={[{width: 156}]}
                title={'Complaint'} //or Change Delivery Date (according to condition)
                onPress={() => {
                  props.navigation.navigate('SendSuggestion', {
                    headerTitle: 'Complain',
                  });
                }}
              /> */}

              {!enableTxnCodeBtn ? (
                <Button
                  style={[
                    {width: 160, justifyContent: 'center', alignSelf: 'center'},
                  ]}
                  title={'Change Delivery Date'} //or Change Delivery Date (according to condition)
                  onPress={() => {
                    ChangeDateModalVisibility();
                  }}
                />
              ) : null}

              {enableTxnCodeBtn ? (
                <Button
                  style={[{width: 156}]}
                  title={getTranslation('txn_code')} //or Change Delivery Date (according to condition)
                  onPress={() => {
                    TxnCodeModalVisibility();
                  }}
                />
              ) : null}

              <Button
                style={[{width: 160}]}
                title={getTranslation('chat')} // X-chat (delivery man chat with user)
                type={1}
                onPress={() => {
                  props.navigation.navigate('SendSuggestion', {
                    headerTitle: 'Souad Bentchikou',
                  });
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
              style={{marginTop: 20}}
              size="18"
              weight="500"
              align="center"
              color={COLORS.black}>
              {getTranslation('pls_confirm_txn')}
            </Text>

            <OTPInputView
              style={[{height: 32, marginTop: 24}]}
              pinCount={10}
              autoFocusOnLoad
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              // placeholderCharacter=''
              // placeholderTextColor={'rgba(64,86,124,1)'}
              onCodeFilled={code => {
                //console.log(`Code is ${code}, you are good to go!`);
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
                  {width: 100, justifyContent: 'center'},
                ]}
                title={getTranslation('cancel')}
                onPress={() => {
                  TxnCodeModalVisibility();
                }}
              />

              <Button
                style={[{width: 100}]}
                title={getTranslation('confirm')}
                onPress={() => {
                  TxnCodeModalVisibility();
                  props.navigation.navigate('ExchangeSuccessSummary');
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
              style={{padding: 10, alignSelf: 'center'}}
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
                  {width: 100, justifyContent: 'center'},
                ]}
                title={getTranslation('cancel')}
                onPress={() => {
                  setSelectDate('')
                  setSelectTime('')
                  ChangeDateModalVisibility();
                }}
              />

              <Button
                style={[{width: 100}]}
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
    top: '40%',
    left: '50%',
    elevation: 5,
    transform: [{translateX: -(width * 0.4)}, {translateY: -90}],
    height: 320,
    width: width * 0.83,
    backgroundColor: '#fff',
    borderRadius: 7,
  },
  modalView: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    elevation: 5,
    transform: [{translateX: -(width * 0.4)}, {translateY: -90}],
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

export default SummaryTransaction;
