import React, {useEffect, useContext, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  StatusBar,
  FlatList,
  ActivityIndicator,
  Toast,
  TouchableOpacity,
  ImageBackground,
  Modal,
  Dimensions,
} from 'react-native';
//ASSETS
import {COLORS, IMAGES} from '../assets';

import LinearGradient from 'react-native-linear-gradient';
//COMMON COMPONENT
import {Button, Header, Text, Input, BottomBackground} from '../components';

import EditAccount from './EditAccount';
import Incomplete from './Incomplete';
import Published from './Published';
import AsSender from './AsSender';

//CONTEXT
//import {APPContext} from '../context/APPProvider';
const {height, width} = Dimensions.get('screen');

function MyAccount(props) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const [index, setIndex] = useState(1);
  const [index1, setIndex1] = useState(3);

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
      return <Incomplete />;
    } else if (index === 2) {
      //Return the SecondScreen as a child to set in Parent View
      return <Published />;
    } else if (index === 3) {
      return <CompletedElement />;
    } else {
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
            //onPress={() => setIndex1(1)}
          >
            <Text
              style={{}}
              size="16"
              weight="500"
              align="center"
              color={index1 === 1 ? COLORS.primaryColor : COLORS.black}>
              {'AS USER'}
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
            // onPress={() => setIndex1(2)}
          >
            <Text
              size="16"
              weight="500"
              align="center"
              color={index1 === 2 ? COLORS.primaryColor : COLORS.black}>
              {'AS DELIVERY MAN'}
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
              {'AS SENDER'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  const RenderElement2 = () => {
    //You can add N number of Views here in if-else condition
    if (index1 === 1) {
      //Return the FirstScreen as a child to set in Parent View
      return <AsSender />;
    } else if (index1 === 2) {
      //Return the SecondScreen as a child to set in Parent View
      return <AsSender />;
    } else if (index1 === 3) {
      //Return the SecondScreen as a child to set in Parent View
      return (
              <AsSender
                onSummary={() => {
                  props.navigation.navigate('SummaryTransaction')
                }}
               
              />
            );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.white} />
      {/* <BottomBackground></BottomBackground> */}
      <SafeAreaView style={styles.container}>
        <View
          style={{
            backgroundColor: COLORS.primaryColor,
            flex: 1,
            Top: 0,
            height: 350,
            width: '100%',
            position: 'absolute',
          }}></View>

        <Header
          title={'My Account'}
          onEdit={() => {
            props.navigation.navigate('EditAccount');
          }}
          onBack={() => {
            props.navigation.goBack();
          }}
        />

        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          <View style={{flex: 1}}>
            <Image
              source={IMAGES.circle_placeholder}
              style={{
                height: 114,
                width: 114,
                marginTop: 5,
                alignSelf: 'center',
                justifyContent: 'center',
              }}
            />

            <Text
              style={[styles.inputView, {marginTop: 5}]}
              size="16"
              weight="500"
              align="center"
              color={COLORS.white}>
              {'Omar Bentchikou'}
            </Text>

            <Text
              style={[styles.inputView, {marginTop: 3}]}
              size="16"
              weight="500"
              align="center"
              color={COLORS.white}>
              {'+213-77967736'}
            </Text>

            <Text
              style={[styles.inputView, {marginTop: 3}]}
              size="16"
              weight="500"
              align="center"
              color={COLORS.white}>
              {'diomdi3@gmail.com'}
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
                    alignSelf: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    size="16"
                    weight="500"
                    align="center"
                    color={COLORS.white}>
                    {'Logout'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  deleteAccountModalVisibility();
                }}>
                <LinearGradient
                  colors={['#971DB5', '#E47EFD', '#792392']}
                  style={{
                    height: 41,
                    backgroundColor: COLORS.gray,
                    //width: 110,
                    borderRadius: 32,
                    borderColor: COLORS.red,
                    borderWidth: 0.3,
                    alignSelf: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{marginLeft: 15, marginRight: 15}}
                    size="16"
                    weight="500"
                    align="center"
                    color={COLORS.red}>
                    {'Delete Account'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View
              style={{
                marginHorizontal: 20,
                marginTop: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
                // position: 'absolute',
              }}>
              <TouchableOpacity
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
                    width: 160,
                    borderRadius: 32,
                    borderColor: COLORS.red,
                    borderWidth: 0.3,
                    //alignSelf: 'center',
                    justifyContent: 'center',
                    marginRight: 5,
                  }}>
                  <Text
                    style={{paddingLeft: 10, paddingRight: 10}}
                    size="16"
                    weight="500"
                    align="center"
                    color={COLORS.white}>
                    {'Suggestion'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
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
                    width: 160,
                    borderRadius: 32,
                    borderColor: COLORS.red,
                    borderWidth: 0.3,
                    //alignSelf: 'center',
                    justifyContent: 'center',
                    marginLeft: 5,
                  }}>
                  <Text
                    style={{paddingLeft: 10, paddingRight: 10}}
                    size="16"
                    weight="500"
                    align="center"
                    color={COLORS.white}>
                    {'Complaint'}
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
                style={[styles.inputView, {justifyContent: 'center'}]}
                size="18"
                weight="500"
                align="left"
                color={COLORS.black}>
                {'Announcements:'}
              </Text>
            </View>

            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}>
              <View
                style={{flexDirection: 'row', backgroundColor: COLORS.white}}>
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
                    {'INCOMPLETE'}
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
                    {'PUBLISHED'}
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
                    {'INPROGRESS'}
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
                    {'COMPLETED'}
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
              style={{alignSelf: 'center', marginTop: 15, marginHorizontal: 10}}
              size="20"
              weight="500"
              align="left"
              color={COLORS.black}>
              {'Are you sure you want to delete your account'}
            </Text>

            <View
              style={[
                {
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginTop: 20,
                  borderColor: COLORS.gray,
                  borderRadius: 2,
                  borderWidth: 1,
                  width: 200,
                  height: 70,
                  backgroundColor: COLORS.lightGray,
                },
              ]}>
              <Text
                style={[{alignSelf: 'center', justifyContent: 'center'}]}
                size="20"
                weight="500"
                align="left"
                color={COLORS.black}>
                {'L0OwsY'}
              </Text>
            </View>

            <Text
              style={[
                {alignSelf: 'center', justifyContent: 'center', marginTop: 5},
              ]}
              size="16"
              weight="500"
              align="center"
              color={COLORS.black}>
              {'Verification Code'}
            </Text>

            <Input
              style={[styles.inputView, {marginTop: 5}]}
              placeholder={'Enter Code'}
              onChangeText={text => {
                //setName(text);
              }}
            />

            <View
              style={{
                marginHorizontal: 20,
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                // position: 'absolute',
              }}>
              <Button
                style={[{width: 104}]}
                title={'Yes'}
                onPress={() => {
                  // props.navigation.navigate('Market')
                }}
              />

              <Button
                style={[{width: 104}]}
                title={'No'}
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
              style={{alignSelf: 'center', marginTop: 15, marginHorizontal: 10}}
              size="20"
              weight="500"
              align="left"
              color={COLORS.black}>
              {'Are you sure you want to logout your account'}
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
                style={[{width: 104}]}
                title={'Yes'}
                onPress={() => {
                  // props.navigation.navigate('Market')
                }}
              />

              <Button
                style={[{width: 104}]}
                title={'No'}
                onPress={() => {
                  logoutModalVisibility();
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
    //backgroundColor: COLORS.white,
  },
  inputView: {
    marginHorizontal: 20,
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
    top: '50%',
    left: '50%',
    elevation: 5,
    transform: [{translateX: -(width * 0.4)}, {translateY: -90}],
    height: 325,
    width: width * 0.85,
    backgroundColor: '#fff',
    borderRadius: 7,
  },
  modalView1: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    elevation: 5,
    transform: [{translateX: -(width * 0.4)}, {translateY: -90}],
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
