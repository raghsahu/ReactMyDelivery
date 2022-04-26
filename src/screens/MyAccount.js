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
  TextInput,
} from 'react-native';
//ASSETS
import { COLORS, IMAGES, DIMENSION } from '../assets';

import LinearGradient from 'react-native-linear-gradient';
import { CommonActions } from '@react-navigation/native';
//COMMON COMPONENT
import {
  Button,
  Header,
  Text,
  ProgressView,
} from '../components';

import Incomplete from './Incomplete';
import Published from './Published';
import InProgressAsUser from './InProgressAsUser';

//CONTEXT
import { LocalizationContext } from '../context/LocalizationProvider';
import { APPContext } from '../context/AppProvider';
import Toast from 'react-native-simple-toast';

const { height, width } = Dimensions.get('screen');
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'DescribeProduct.db' });

function MyAccount(props) {
  const { tabIndex } = props.route.params ? props.route.params : 1;
  const { getTranslation, clearAllData } = useContext(LocalizationContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [index1, setIndex1] = useState(1);
  const [tabStatus, setTabStatus] = useState('');
  const [inputCaptcha, setInputCaptcha] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [isLoading, setLoading] = useState(false);
  const { delUser, user, imageBaseUrl, setUser } = useContext(APPContext);
  const [productListItems, setProductListItems] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_product', [], (tx, results) => {
        var temp = [];

        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        setProductListItems(temp);
      });
    });
  }, []);

  useEffect(() => {
    tabIndex ? setIndex(tabIndex) : setIndex(1);
  }, []);

  const deleteAccountModalVisibility = () => {
    setModalVisible(!isModalVisible);
  };

  const logoutModalVisibility = () => {
    setLogoutModalVisible(!isLogoutModalVisible);
  };

  const RenderElement = () => {
    //You can add N number of Views here in if-else condition
    if (index === 1) {
      //Return the FirstScreen as a child to set in Parent View
      return (
        <Incomplete
          data={productListItems}
          onModify={() => {
            props.navigation.navigate('AddProductCommision');
          }}
        />
      );
    } else if (index === 2) {
      //Return the SecondScreen as a child to set in Parent View
      return <Published
        onPublishedAdsDetails={(item) => {
          props.navigation.navigate('PublishedAdsDetails', {
            ProdData: item,
          });
        }}
      />;
    } else if (index === 3) {
      setTabStatus('inProgress');
      return <CompletedElement />;
    } else {
      setTabStatus('completed');
      return <CompletedElement />;
    }
  };

  const CompletedElement = () => {
    return (
      <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: COLORS.white,
            marginTop: 5,
          }}>
          {/*To set the FirstScreen*/}
          <TouchableOpacity
            style={[
              styles.buttonStyle,
              index1 === 1
                ? {
                  borderBottomColor: COLORS.primaryColor,
                  borderBottomWidth: 1,
                }
                : null,
            ]}
            onPress={() => setIndex1(1)}>
            <Text
              style={{}}
              size="16"
              weight="500"
              align="center"
              color={index1 === 1 ? COLORS.primaryColor : COLORS.black}>
              {getTranslation('as_user')}
            </Text>
          </TouchableOpacity>
          {/*To set the SecondScreen*/}
          <TouchableOpacity
            style={[
              styles.buttonStyle,
              index1 === 2
                ? {
                  borderBottomColor: COLORS.primaryColor,
                  borderBottomWidth: 1,
                }
                : null,
            ]}
            onPress={() => setIndex1(2)}>
            <Text
              size="16"
              weight="500"
              align="center"
              color={index1 === 2 ? COLORS.primaryColor : COLORS.black}>
              {getTranslation('as_delivery_man')}
            </Text>
          </TouchableOpacity>
          {/*To set the ThirdScreen*/}
          <TouchableOpacity
            style={[
              styles.buttonStyle,
              index1 === 3
                ? {
                  borderBottomColor: COLORS.primaryColor,
                  borderBottomWidth: 1,
                }
                : null,
            ]}
            onPress={() => setIndex1(3)}>
            <Text
              size="16"
              weight="500"
              align="center"
              color={index1 === 3 ? COLORS.primaryColor : COLORS.black}>
              {getTranslation('as_sender')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  const RenderElement2 = () => {
    //You can add N number of Views here in if-else condition
    if (index1 === 1) {
      if (tabStatus == 'completed') {
        return (
          <InProgressAsUser
            subTabIndex={index1}
            tabStatus={tabStatus}
            onSummary={(item) => {
              props.navigation.navigate('SummaryTransaction', {
                status: tabStatus,
                subTabIndex: index1,
                summaryData: item,
              });
            }}
            onRating={(item) => {
              props.navigation.navigate('RatingReview', {
                userName: item.user_y[0].user_f_name + ' ' + item.user_y[0].user_l_name,
              });
            }}
          />
        );
      } else {
        return (
          <InProgressAsUser
            subTabIndex={index1}
            tabStatus={tabStatus}
            onSummary={(item) => {
              props.navigation.navigate('SummaryTransaction', {
                status: tabStatus,
                subTabIndex: index1,
                summaryData: item,
              });
            }}
            onComplaint={() => {
              props.navigation.navigate('SendSuggestion', {
                headerTitle: 'Complain',
              });
            }}
            onCodeExchange={(data) => {
              props.navigation.navigate('ExchangeSuccessSummary', {
                summaryData: data,
               });
            }}
          />
        );
      }
    } else if (index1 === 2) {
      if (tabStatus == 'completed') {
        return (
          <InProgressAsUser
            subTabIndex={index1}
            tabStatus={tabStatus}
            onSummary={(item) => {
              props.navigation.navigate('SummaryTransaction', {
                status: tabStatus,
                subTabIndex: index1,
                summaryData: item,
              });
            }}
            onRating={(item) => {
              props.navigation.navigate('RatingReview', {
                userName:  item.user_x[0].user_f_name + ' ' + item.user_x[0].user_l_name,
              });
            }}
          />
        );
      } else {
        return (
          <InProgressAsUser
            subTabIndex={index1}
            tabStatus={tabStatus}
            onSummary={(item) => {
              props.navigation.navigate('SummaryTransaction', {
                status: tabStatus,
                subTabIndex: index1,
                summaryData: item,
              });
            }}
            onComplaint={() =>{
              props.navigation.navigate('SendSuggestion', {
                headerTitle: 'Complain',
              });
            }}
          />
        );
      }

    } else if (index1 === 3) {
      //Return the SecondScreen as a child to set in Parent View
      if (tabStatus == 'completed') {
        return null
        //  (
        //   <AsSender
        //     onSummary={() => {
        //       // props.navigation.navigate('SummaryTransaction', {
        //       //   status: 'completed',
        //       // });
        //     }}
        //     onRating={() => {
        //       props.navigation.navigate('RatingReview');
        //     }}
        //   />
        // );
      } else {
        return null
        //  (
        //   <InProgressAsUser
        //     subTabIndex={index1}
        //     tabStatus={tabStatus}
        //   // onSummary={() => {
        //   //   props.navigation.navigate('SummaryTransaction');
        //   // }}
        //   />
        // );
      }
    }
  };

  function makeCaptcha() {
    var text = '';
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 6; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    setCaptcha(text);
    return text;
  }

  const onDeleteAccount = async () => {
    if (!inputCaptcha) {
      Toast.show('Please enter verification code');
    } else if (captcha != inputCaptcha) {
      Toast.show('verification code did not match');
    } else {
      setLoading(true);
      const result = await delUser(user.user_id);
      setLoading(false);
      console.log('DeleteUser', result);
      if (result.status == true) {
        Toast.show(result.error);
        deleteAccountModalVisibility();
        setCaptcha('');
        setInputCaptcha('');
        clearAllData();
        onDiscard();
        setTimeout(() => {
          props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Splash', params: { isFromLogin: true } }],
            }),
          );
        }, 500);
      } else {
        Toast.show(result.error);
      }
    }
  };

  const onDiscard = () => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM table_product',
        (tx, results) => {
          try {
            console.log('ResultsDelete', results.rowsAffected);

            if (results.rowsAffected > 0) {

            }
          } catch (ex) {
            console.log(ex)
          }

        },
      );
    });
  };

 
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.primaryColor}
      />
      {/* <BottomBackground></BottomBackground> */}
      <SafeAreaView style={styles.container}>
        <View
          style={{
            backgroundColor: COLORS.primaryColor,
            //flex: 1,
            Top: 0,
            height: 393,
            width: '100%',
            position: 'absolute',
          }}></View>

        <Header
          title={getTranslation('my_account')}
          onEdit={() => {
            props.navigation.navigate('EditAccount');
          }}
          onBack={() => {
            // props.navigation.goBack();
            props.navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'BottomBar' }],
              }),
            );
          }}
        />

        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1 }}>
            <Image
              source={user ?
                user.user_img
                  ? { uri: imageBaseUrl + user.user_img }
                  : IMAGES.circle_placeholder
                : IMAGES.circle_placeholder
              }
              style={{
                height: 114,
                width: 114,
                borderRadius: 114 / 2,
                marginTop: 5,
                alignSelf: 'center',
                justifyContent: 'center',
              }}
            />

            <Text
              style={[styles.inputView, { marginTop: 5 }]}
              size="16"
              weight="500"
              align="center"
              color={COLORS.white}>
              {user ? user.user_f_name +
                ' ' +
                user.user_l_name +
                '               ' +
                user.user_name : ''}
            </Text>

            <Text
              style={[styles.inputView, { marginTop: 3 }]}
              size="16"
              weight="500"
              align="center"
              color={COLORS.white}>
              {'+' + user.user_mb_code + ' ' + user.user_mb_no}
            </Text>

            <Text
              style={[styles.inputView, { marginTop: 3 }]}
              size="16"
              weight="500"
              align="center"
              color={COLORS.white}>
              {user ? user.user_email : ''}
            </Text>

            <View
              style={{
                marginHorizontal: 20,
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                // position: 'absolute',
              }}>
              <TouchableOpacity
                onPress={() => {
                  logoutModalVisibility();
                }}>
                <LinearGradient
                  colors={['#971DB5', '#E47EFD', '#792392']}
                  style={{
                    height: 41,
                    backgroundColor: COLORS.gray,
                    width: 110,
                    borderRadius: 32,
                    borderColor: COLORS.red,
                    borderWidth: 0.3,
                    marginLeft: 24,
                    alignSelf: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    size="16"
                    weight="500"
                    align="center"
                    color={COLORS.white}>
                    {getTranslation('logout')}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  makeCaptcha();
                  deleteAccountModalVisibility();
                }}>
                <LinearGradient
                  colors={['#971DB5', '#E47EFD', '#792392']}
                  style={{
                    height: 41,
                    backgroundColor: COLORS.gray,
                    // width: 180,
                    borderRadius: 32,
                    borderColor: COLORS.red,
                    borderWidth: 0.3,
                    alignSelf: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      marginLeft: 15,
                      marginRight: 15,
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}
                    size="16"
                    weight="500"
                    align="center"
                    color={COLORS.red}>
                    {getTranslation('delete_account')}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View
              style={{
                marginHorizontal: 10,
                marginTop: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
                // position: 'absolute',
              }}>
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => {
                  props.navigation.navigate('SendSuggestion', {
                    headerTitle: 'Send Suggestion',
                  });
                }}>
                <LinearGradient
                  colors={['#971DB5', '#E47EFD', '#792392']}
                  style={{
                    height: 41,
                    backgroundColor: '#792392',
                    // width: 160,
                    borderRadius: 32,
                    borderColor: COLORS.red,
                    borderWidth: 0.3,
                    //alignSelf: 'center',
                    justifyContent: 'center',
                    marginRight: 5,
                  }}>
                  <Text
                    style={{ paddingLeft: 10, paddingRight: 10 }}
                    size="16"
                    weight="500"
                    align="center"
                    color={COLORS.white}>
                    {getTranslation('suggestion')}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => {
                  props.navigation.navigate('SendSuggestion', {
                    headerTitle: 'Send Complaint',
                  });
                }}>
                <LinearGradient
                  colors={['#971DB5', '#E47EFD', '#792392']}
                  style={{
                    height: 41,
                    //backgroundColor: COLORS.gray,
                    //width: 160,
                    borderRadius: 32,
                    borderColor: COLORS.red,
                    borderWidth: 0.3,
                    //alignSelf: 'center',
                    justifyContent: 'center',
                    marginLeft: 5,
                  }}>
                  <Text
                    style={{ paddingLeft: 10, paddingRight: 10 }}
                    size="16"
                    weight="500"
                    align="center"
                    color={COLORS.white}>
                    {getTranslation('complaint')}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View
              style={[
                {
                  backgroundColor: '#F6F6F6',
                  marginTop: 5,
                  height: 50,
                  justifyContent: 'center',
                },
              ]}>
              <Text
                style={[styles.inputView, { justifyContent: 'center' }]}
                size="18"
                weight="500"
                align="left"
                color={COLORS.black}>
                {index == 3 || index == 4 ? getTranslation('transactions') : getTranslation('announcement')}
              </Text>
            </View>

            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}>
              <View
                style={{ flexDirection: 'row', backgroundColor: COLORS.white }}>
                {/*To set the FirstScreen*/}
                <TouchableOpacity
                  style={[
                    styles.buttonStyle,
                    {
                      backgroundColor:
                        index === 1 ? COLORS.primaryColor : COLORS.white,
                      borderRadius: 20,
                    },
                  ]}
                  onPress={() => setIndex(1)}>
                  <Text
                    size="16"
                    weight="500"
                    align="center"
                    color={index === 1 ? COLORS.white : COLORS.black}>
                    {getTranslation('incomplete')}
                  </Text>
                </TouchableOpacity>
                {/*To set the SecondScreen*/}
                <TouchableOpacity
                  style={[
                    styles.buttonStyle,
                    {
                      backgroundColor:
                        index === 2 ? COLORS.primaryColor : COLORS.white,
                      borderRadius: 20,
                    },
                  ]}
                  onPress={() => setIndex(2)}>
                  <Text
                    size="16"
                    weight="500"
                    align="center"
                    color={index === 2 ? COLORS.white : COLORS.black}>
                    {getTranslation('published')}
                  </Text>
                </TouchableOpacity>
                {/*To set the ThirdScreen*/}
                <TouchableOpacity
                  style={[
                    styles.buttonStyle,
                    {
                      backgroundColor:
                        index === 3 ? COLORS.primaryColor : COLORS.white,
                      borderRadius: 20,
                    },
                  ]}
                  onPress={() => setIndex(3)}>
                  <Text
                    size="16"
                    weight="500"
                    align="center"
                    color={index === 3 ? COLORS.white : COLORS.black}>
                    {getTranslation('inProgress')}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.buttonStyle,
                    {
                      backgroundColor:
                        index === 4 ? COLORS.primaryColor : COLORS.white,
                      borderRadius: 20,
                    },
                  ]}
                  onPress={() => setIndex(4)}>
                  <Text
                    size="16"
                    weight="500"
                    align="center"
                    color={index === 4 ? COLORS.white : COLORS.black}>
                    {getTranslation('completed')}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>

            <RenderElement />

            {index === 3 || index === 4 ? <RenderElement2 /> : null}
          </View>
        </ScrollView>
      </SafeAreaView>

      <Modal
        animationType="slide"
        transparent
        visible={isModalVisible}
        presentationStyle="overFullScreen"
        onDismiss={deleteAccountModalVisibility}>
        <View style={styles.viewWrapper}>
          <View style={styles.modalView}>
            <Text
              style={{ alignSelf: 'center', marginTop: 15, marginHorizontal: 10 }}
              size="20"
              weight="500"
              align="left"
              color={COLORS.black}>
              {getTranslation('are_you_delete_account')}
            </Text>

            <View
              style={[
                {
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginTop: 20,
                  borderColor: '#A9A9A9',
                  borderRadius: 2,
                  borderWidth: 1,
                  width: 200,
                  height: 70,
                  backgroundColor: '#F7F7FF',
                },
              ]}>
              <Text
                style={[{ alignSelf: 'center', justifyContent: 'center' }]}
                size="20"
                weight="500"
                align="left"
                color={COLORS.black}>
                {captcha}
              </Text>
            </View>

            <View
              style={[
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginHorizontal: 10,
                },
              ]}>
              <Text
                style={[
                  {
                    flex: 1,
                    marginRight: 5,
                    height: 40,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    backgroundColor: COLORS.gray,
                    padding: 5,
                  },
                ]}
                size="16"
                weight="500"
                align="center"
                color={COLORS.black}>
                {getTranslation('verification_code')}
              </Text>

              <TextInput
                style={[
                  {
                    flex: 1,
                    marginLeft: 5,
                    height: 40,
                    backgroundColor: COLORS.gray,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    padding: 5,
                  },
                ]}
                // placeholder={''}
                onChangeText={text => {
                  setInputCaptcha(text);
                }}
              />
            </View>

            <View
              style={{
                marginHorizontal: 20,
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                // position: 'absolute',
              }}>
              <Button
                style={[{ width: 104 }]}
                title={getTranslation('yes')}
                onPress={() => {
                  onDeleteAccount();
                }}
              />

              <Button
                style={[{ width: 104 }]}
                title={getTranslation('no')}
                onPress={() => {
                  deleteAccountModalVisibility();
                }}
              />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent
        visible={isLogoutModalVisible}
        presentationStyle="overFullScreen"
        onDismiss={logoutModalVisibility}>
        <View style={styles.viewWrapper}>
          <View style={styles.modalView1}>
            <Text
              style={{ alignSelf: 'center', marginTop: 15, marginHorizontal: 10 }}
              size="20"
              weight="500"
              align="left"
              color={COLORS.black}>
              {getTranslation('are_you_logout')}
            </Text>

            <View
              style={{
                marginHorizontal: 20,
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                // position: 'absolute',
              }}>
              <Button
                style={[{ width: 104 }]}
                title={getTranslation('yes')}
                onPress={() => {
                  clearAllData();
                  logoutModalVisibility();
                  setUser({}); //set user data to null
                  onDiscard();
                  props.navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [{ name: 'Splash', params: { isFromLogin: false } }],
                    }),
                  );
                }}
              />

              <Button
                style={[{ width: 104 }]}
                title={getTranslation('no')}
                onPress={() => {
                  logoutModalVisibility();
                }}
              />
            </View>
          </View>
        </View>
      </Modal>

      {isLoading ? <ProgressView></ProgressView> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1.0,
    //backgroundColor: COLORS.white,
  },
  inputView: {
    marginHorizontal: DIMENSION.marginHorizontal,
  },
  item: {
    backgroundColor: COLORS.white,
    // borderRadius: 4,
    padding: 10,
    marginTop: 10,
    marginHorizontal: 10,
  },
  footer: {
    padding: 10,
    marginTop: 40,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },

  viewWrapper: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalView: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    elevation: 5,
    transform: [{ translateX: -(width * 0.4) }, { translateY: -90 }],
    height: 300,
    width: width * 0.85,
    backgroundColor: '#fff',
    borderRadius: 7,
  },
  modalView1: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    elevation: 5,
    transform: [{ translateX: -(width * 0.4) }, { translateY: -90 }],
    height: 180,
    width: width * 0.85,
    backgroundColor: '#fff',
    borderRadius: 7,
  },
 
  buttonStyle: {
    flex: 1,
    alignItems: 'center',
    //backgroundColor: '#808080',
    padding: 10,
    margin: 5,
    height: 40,
  },

});

export default MyAccount;
