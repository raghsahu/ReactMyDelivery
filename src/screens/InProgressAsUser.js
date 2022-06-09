import React, { useEffect, useContext, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  StatusBar,
  FlatList,
  Modal,
  Dimensions,
} from 'react-native';

//ASSETS
import { COLORS, IMAGES, DIMENSION } from '../assets';
const { height, width } = Dimensions.get('screen');
//COMMON COMPONENT
import {
  Button,
  Text,
  InProgressItemList,
  ProgressView,
  Input,
} from '../components';
//CONTEXT
import { LocalizationContext } from '../context/LocalizationProvider';
import { APPContext } from '../context/AppProvider';
import Toast from 'react-native-simple-toast';

function InProgressAsUser(props) {
  const [isLoading, setLoading] = useState(false);
  const { user, imageBaseUrl, publishedProduct, check_code, completededMyItem, inProgressMyItem } = useContext(APPContext);
  const { getTranslation } = useContext(LocalizationContext);
  const [inProgressItem, setInProgressItem] = useState([]);
  const [isTxnCodeModalVisible, setTxnCodeModalVisible] = useState(false);
  const [otp, setOtp] = useState('');
  const [selectedAdId, setSelectedAdId] = useState('');

  useEffect(() => {
    if (props.tabStatus === 'inProgress') {
      getInProgressItemList('1,2,3,4,5', true);
    } else {
      getCompleteItemList('6', true);
    }

    const interval = setInterval(() => {
      if (props.tabStatus === 'inProgress') {
        getInProgressItemList('1,2,3,4,5', false);
      } else {
        getCompleteItemList('6', false);
      }
    }, 1000 * 15);
    return () => clearInterval(interval);
  }, [props]);


  const getCompleteItemList = async (status, isLoading) => {
    setLoading(isLoading);
    var result = null;
    if (props.subTabIndex === 1) {
      result = await completededMyItem(user.user_id, 'user');
    } else {
      result = await completededMyItem(user.user_id, 'deliveryman');
    }
    setLoading(false);
    if (result.status == true) {
      if (result.data.length > 0) {

        setInProgressItem([]);
        if (props.subTabIndex === 1) {
          setInProgressItem(result.data);

          let todos = [...inProgressItem];
          for (let i = 0; i < result.data.length; i++) {
            if (result.data[i].user_x.length != 0
              &&
              result.data[i].user_x[0].user_id == user.user_id
            ) {
              todos.push(result.data[i])
            }
          }
          setInProgressItem(todos);
        } else if (props.subTabIndex === 2) {
          let todos = [...inProgressItem];
          for (let i = 0; i < result.data.length; i++) {
            if (result.data[i].user_y.length != 0
              &&
              result.data[i].user_y[0].user_id == user.user_id
            ) {
              todos.push(result.data[i])
            }
          }
          setInProgressItem(todos);

        } else if (props.subTabIndex === 3) {

          let todos = [...inProgressItem];
          for (let i = 0; i < result.data.length; i++) {
            if (result.data[i].user_z.length != 0
              &&
              result.data[i].user_z[0].user_id == user.user_id
              // &&
              //result.data[i].user_id != user.user_id
            ) {
              todos.push(result.data[i])
            }
          }
          setInProgressItem(todos);

        }

      } else {
        //Toast.show('No record found');
      }
    } else {
      //Toast.show(result.error);
      setInProgressItem([]);
    }
  };

  const getInProgressItemList = async (status, isLoading) => {
    setLoading(isLoading);
    var result = null;
    if (props.subTabIndex === 1) {
      result = await inProgressMyItem(user.user_id, 'user');
    } else {
      result = await inProgressMyItem(user.user_id, 'deliveryman');
    }
    setLoading(false);
    if (result.status == true) {
      if (result.data.length > 0) {

        setInProgressItem([]);
        if (props.subTabIndex === 1) {
          setInProgressItem(result.data);
          //old native code logic
          //   for (Result adws : acceptedAdsList) {
          //     if (adws.getUserX().size()!=0 &&
          //             adws.getUserX().get(0) != null &&
          //             adws.getUserX().get(0).getUserId().equals(Constants.userDetails.getUserId())
          //             && !adws.getAdUserId().equals(Constants.userDetails.getUserId())) {
          //         u_AcceptsList.add(adws);


          //     }
          // }****************************

          let todos = [...inProgressItem];
          for (let i = 0; i < result.data.length; i++) {
            if (result.data[i].user_x.length != 0
              &&
              result.data[i].user_x[0].user_id == user.user_id
            ) {
              todos.push(result.data[i])
            }
          }
          setInProgressItem(todos);
        } else if (props.subTabIndex === 2) {
          let todos = [...inProgressItem];
          for (let i = 0; i < result.data.length; i++) {
            if (result.data[i].user_y.length != 0
              &&
              result.data[i].user_y[0].user_id == user.user_id
            ) {
              todos.push(result.data[i])
            }
          }
          setInProgressItem(todos);

        } else if (props.subTabIndex === 3) {
          // if (adws.getUserZ().size() != 0 &&
          // adws.getUserZ().get(0) != null &&
          // adws.getUserZ().get(0).getUserId().equals(Constants.userDetails.getUserId())
          //   && !Constants.userDetails.getUserId().equals(adws.getAdUserId())) {
          //       s_AcceptsList.add(adws);
          //   }

          let todos = [...inProgressItem];
          for (let i = 0; i < result.data.length; i++) {
            if (result.data[i].user_z.length != 0
              &&
              result.data[i].user_z[0].user_id == user.user_id
              // &&
              //result.data[i].user_id != user.user_id
            ) {
              todos.push(result.data[i])
            }
          }
          setInProgressItem(todos);

        }

      } else {
        //Toast.show('No record found');
      }
    } else {
     // Toast.show(result.error);
      setInProgressItem([]);
    }
  };

  const TxnCodeModalVisibility = () => {
    setTxnCodeModalVisible(!isTxnCodeModalVisible);
  };

  const checkCodeApi = async () => {
    setLoading(true);
    const result = await check_code(user.user_id, selectedAdId, otp, '3');
    setLoading(false);
    if (result.status == true) {
      Toast.show(result.error);
      TxnCodeModalVisibility();
      props.onCodeExchange(result.data)
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
        <FlatList
          showsVerticalScrollIndicator={false}
          data={inProgressItem}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <InProgressItemList
                item={item}
                tabStatus={props.tabStatus}
                subTabIndex={props.subTabIndex}
                onSummary={(item) => {
                  props.onSummary(item);
                }}
                onRating={(item) => {
                  props.onRating(item);
                }}
                onComplaint={() => {
                  props.onComplaint();
                }}
                onCodeExchange={(item) => {
                  setSelectedAdId(item.ad_id)
                  TxnCodeModalVisibility();
                }}
              />
            );
          }}
        />
      </SafeAreaView>
      {isLoading ? <ProgressView></ProgressView> : null}

      <Modal
        animationType="slide"
        transparent
        visible={isTxnCodeModalVisible}
        presentationStyle="overFullScreen"
        onDismiss={isTxnCodeModalVisible}>
        <View style={styles.viewWrapper}>
          <View style={styles.modalView2}>
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
              onCodeFilled = {(code => {
                //console.log(`Code is ${code}, you are good to go!`)
                setOtp(code);
            })}
            /> */}

            <Input
              style={[styles.inputView, styles.inputContainer]}
              placeholder={getTranslation('pls_enter_txn_code')}
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
                    Toast.show(getTranslation('pls_enter_10_digit_code'))
                  } else if (otp.length != 10) {
                    Toast.show(getTranslation('pls_enter_10_digit_code'))
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

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1.0,
    backgroundColor: '#FAFAFA',
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
    height: 140,
    width: width * 0.85,
    backgroundColor: '#fff',
    borderRadius: 7,
  },
  modalView2: {
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

export default InProgressAsUser;
