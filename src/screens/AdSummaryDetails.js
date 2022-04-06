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
  TextInput,
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
  RadioButtons,
  CheckBox,
  DateTimePick,
} from '../components';
import {Rating} from 'react-native-ratings';
import moment from 'moment'; // date format

const {height, width} = Dimensions.get('screen');
//CONTEXT
import {LocalizationContext} from '../context/LocalizationProvider';

function AdSummaryDetails(props) {
  const {getTranslation} = useContext(LocalizationContext);
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
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
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

  const logoutModalVisibility = () => {
    setLogoutModalVisible(!isLogoutModalVisible);
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
      setSelectDate(moment(currentDate).format('DD-MM-YYYY'));
    } else {
      setSelectTime(moment(selectedDate).format('HH:MM'));
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
                style={[{marginStart: 15, marginTop: 15, marginBottom: 40}]}
                size="18"
                weight="500"
                align="left"
                color={COLORS.black}>
                {'User'}
              </Text>
              <View
                style={{marginStart: 15, marginTop: 15, flexDirection: 'row'}}>
                <Text
                  style={[{marginStart: 15}]}
                  size="18"
                  weight="500"
                  align="left"
                  color={COLORS.black}>
                  {'0'}
                </Text>
                <Rating
                  type="custom"
                  ratingColor="#04D9C5"
                  startingValue={1}
                  ratingBackgroundColor="#04D9C5"
                  ratingCount={1}
                  imageSize={20}
                  // onFinishRating={this.ratingCompleted}
                  style={{marginTop: 1, marginStart: 15, paddingVertical: 1}}
                />
                <Text
                  style={[{marginStart: 10, marginEnd: 15}]}
                  size="18"
                  weight="500"
                  align="left"
                  color={COLORS.black}>
                  {'0'}
                </Text>
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

          <Image
            style={{
              width: 300,
              height: 300,
              marginTop: 20,
              borderRadius: 35,
              marginHorizontal: 5,
              justifyContent: 'center',
              alignSelf: 'center',
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
              {'souris'}
            </Text>
            {isProposalToModificationOfAd && (
              <Text
                style={[styles.rightButtons, {position: 'absolute'}]}
                size="16"
                weight="500"
                align="left"
                color={COLORS.white}
                onPress={() => {
                  photosModalVisibleModalVisibility();
                }}>
                {getTranslation('change_photo')}
              </Text>
            )}

            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text style={{}} color={COLORS.black} size="16" weight="600">
                  {getTranslation('web_link') + ' :'}
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
              {isProposalToModificationOfAd && (
                <Text
                  style={styles.rightButtons}
                  color={COLORS.white}
                  size="16"
                  weight="500"
                  onPress={() => {
                    webLinkModalVisibleModalVisibility();
                  }}>
                  {getTranslation('change')}
                </Text>
              )}
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text style={{}} color={COLORS.black} size="16" weight="600">
                {getTranslation('place_to_buy')}
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
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text style={{}} color={COLORS.black} size="16" weight="600">
                  {getTranslation('price') + ' :'}
                </Text>

                <Text
                  style={{
                    marginLeft: 10,
                  }}
                  color={COLORS.primaryColor}
                  size="16"
                  weight="500">
                  {'€ 6.00 x 1 = € 6.00'}
                </Text>
              </View>
              {isProposalToModificationOfAd && (
                <Text
                  style={[styles.rightButtons]}
                  color={COLORS.white}
                  size="16"
                  weight="500"
                  onPress={() => {
                    changePriceQuantityModalVisibleModalVisibility();
                  }}>
                  {getTranslation('change')}
                </Text>
              )}
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
              backgroundColor: COLORS.borderColor2,
              height: 2,
              marginTop: 10,
            }}></View>

          <View style={[styles.inputView, {marginTop: 20, marginBottom: 20}]}>
            {isProposalToModificationOfAd && (
              <Text
                style={[
                  styles.rightButtons,
                  {position: 'absolute', marginTop: 10, paddingVertical: 10},
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
                {'€ 2.00'}
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
                {'€ 1.00'}
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
                {'Both'}
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
                {'2022-01-15 12:00'}
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
                {'2022-01-22    12:00'}
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
                  {'Constantine Constantine,'}
                </Text>
              </View>
              {isProposalToModificationOfAd && (
                <Text
                  style={[styles.rightButtons, {marginRight: 0}]}
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
                  style={[{width: 156, backgroundColor: COLORS.homeBg}]}
                  title={getTranslation('to_propose')}
                  onPress={() => {
                    proposalToModificationOfAd();
                  }}
                />

                <Button
                  style={[{width: 156}]}
                  title={getTranslation('accept')}
                  onPress={() => {
                    logoutModalVisibility();
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
                  }}
                />

                <Button
                  style={[{width: 156}]}
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
              style={{marginTop: 20}}
              size="18"
              weight="500"
              align="center"
              color={COLORS.black}>
              {getTranslation('payment_guarantee_deposit')}
            </Text>

            <Text
              style={{marginTop: 20}}
              size="18"
              weight="500"
              align="center"
              color={COLORS.primaryColor}>
              {'€ 3.00'}
            </Text>

            <Text
              style={{marginTop: 20, marginHorizontal: 20}}
              size="16"
              weight="400"
              align="center"
              color={COLORS.black}>
              {'Sum blocked until the end \nof the transaction'}
            </Text>

            <Text
              style={{marginTop: 20}}
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
              style={{marginHorizontal: 10, marginTop: 20}}>
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
              style={{marginVertical: 10, marginHorizontal: 10}}>
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
                logoutModalVisibility();
                props.navigation.navigate('SummaryTransaction', {
                  status: '',
                });
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
                style={{marginTop: 20, marginHorizontal: 20}}
                size="18"
                weight="500"
                align="left"
                color={COLORS.black}>
                {'Place of Delivery (New)'}
              </Text>
              <Input
                style={{marginTop: 30, marginBottom: 50, marginHorizontal: 10}}
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
                style={{marginTop: 20, marginHorizontal: 20}}
                size="18"
                weight="500"
                align="left"
                color={COLORS.black}>
                {'Web Link (New)'}
              </Text>
              <Input
                style={{marginTop: 30, marginBottom: 50, marginHorizontal: 10}}
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
                style={{marginTop: 20, marginHorizontal: 20}}
                size="18"
                weight="500"
                align="left"
                color={COLORS.black}>
                {'Photos (New)'}
              </Text>
              <View
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
                  source={IMAGES.photos}
                />
                <Text
                  style={{marginTop: 10, marginBottom: 20}}
                  size="18"
                  weight="500"
                  align="left"
                  color={'#787878'}>
                  {'Upload Photos'}
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
                  // props.navigation.navigate('SendSuggestion', {
                  //   headerTitle: 'Complain',
                  // });
                }}
              />
              <Button
                style={[styles.modalConfirmButton]}
                title={'Confirm'}
                onPress={() => {
                  photosModalVisibleModalVisibility();
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
                style={{marginTop: 20, marginHorizontal: 20}}
                size="18"
                weight="500"
                align="left"
                color={COLORS.black}>
                {'Price - Quantity (New)'}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <View style={{width: '50%'}}>
                  <Text
                    style={{marginTop: 20, marginLeft: 20}}
                    size="14"
                    weight="500"
                    align="left"
                    color={COLORS.black}>
                    {'Enter price in €'}
                  </Text>
                  <Input
                    style={{marginTop: 7, marginHorizontal: 10}}
                    placeholder={''}
                    isLeft={IMAGES.percentage}
                    value={'6.00'}
                    onChangeText={text => {
                      // setDay(text);
                    }}
                  />
                </View>
                <View style={{width: '50%'}}>
                  <Text
                    style={{marginTop: 20, marginLeft: 5}}
                    size="14"
                    weight="500"
                    align="left"
                    color={COLORS.black}>
                    {'Quantity'}
                  </Text>
                  <Input
                    style={{marginTop: 7, marginEnd: 10}}
                    placeholder={''}
                    isLeft={IMAGES.quantity}
                    onChangeText={text => {
                      // setDay(text);
                    }}
                  />
                </View>
              </View>
              <Text
                style={{alignSelf: 'center', marginTop: 20}}
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
                style={{marginTop: 20, marginHorizontal: 20}}
                size="18"
                weight="500"
                align="left"
                color={COLORS.black}>
                {'Commission (New)'}
              </Text>
              <View>
                <Text
                  style={{marginTop: 20}}
                  size="14"
                  weight="500"
                  align="center"
                  color={COLORS.black}>
                  {'Enter Global Commission in €'}
                </Text>
                <Input
                  style={{marginTop: 7, marginHorizontal: 10}}
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
                  style={{alignSelf: 'center'}}
                  size="18"
                  weight="500"
                  align="left"
                  color={COLORS.black}>
                  {'Your commission:'}
                </Text>
                <Text
                  style={{paddingHorizontal: 10}}
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
      {show && <DateTimePick value={date} mode={mode} onChange={onChange} />}
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
    transform: [{translateX: -(width * 0.4)}, {translateY: -90}],
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
});

export default AdSummaryDetails;
