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
import {COLORS, IMAGES} from '../assets';

//COMMON COMPONENT
import {
  Button,
  Text,
  Input,
  Header,
  BottomBackground,
  RadioButtons,
  CheckBox,
} from '../components';
import {Rating} from 'react-native-ratings';

const {height, width} = Dimensions.get('screen');

function AdModificationProposal(props) {
  const [name, setName] = useState('');
  const [day, setDay] = useState('');
  const [hour, setHour] = useState('');
  const [reasonToChange, setReasonToChange] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.white} />

      <SafeAreaView style={styles.container}>
        <Header
          title={'Proposal: Modification of Ad'}
          onBack={() => {
            props.navigation.goBack();
          }}
        />
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          <Text
            style={[styles.inputView, {marginTop: 10}]}
            size="20"
            weight="600"
            align="left"
            color={COLORS.primaryColor}>
            {'Your announcement'}
          </Text>

          <Text
            style={[styles.inputView, {marginTop: 10}]}
            size="18"
            weight="600"
            align="left"
            color={COLORS.textColor}>
            {'Product 1'}
          </Text>

          <Image
            style={{
              width: 300,
              height: 300,
              marginTop: 10,
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

            <Text
              style={[styles.rightButtons, {position: 'absolute'}]}
              size="16"
              weight="500"
              align="left"
              color={COLORS.textColor5}>
              {'Photo changed'}
            </Text>

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
                  {'Web Link :'}
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

              <Text
                style={styles.rightButtons}
                color={COLORS.textColor5}
                size="16"
                weight="500"
                onPress={() => {}}>
                {'Changed'}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text style={{}} color={COLORS.black} size="16" weight="600">
                {'Place to Buy :'}
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
                  {'Price :'}
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

              <Text
                style={[styles.rightButtons]}
                color={COLORS.textColor5}
                size="16"
                weight="500"
                onPress={() => {}}>
                {'Changed'}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text style={{}} color={COLORS.black} size="16" weight="600">
                {'Additional Information:'}
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
            <Text
              style={[
                styles.rightButtons,
                {position: 'absolute', marginTop: 10, paddingVertical: 10},
              ]}
              color={COLORS.textColor5}
              size="16"
              weight="500"
              onPress={() => {}}>
              {'Changed'}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text style={{}} color={COLORS.black} size="16" weight="600">
                {'Global Commission :'}
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
                {'Deliveryman Commission:'}
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
                {'Ad Seen By :'}
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
                {'Acceptance Limit : '}
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
                {'Delivery Limit:'}
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
                  {'Place of Delivery :'}
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

              <Text
                style={[styles.rightButtons, {marginRight: 0}]}
                color={COLORS.textColor5}
                size="16"
                weight="500"
                onPress={() => {}}>
                {'Changed'}
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: COLORS.borderColor2,
              height: 2,
              marginTop: 10,
            }}></View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              marginHorizontal: 20,
            }}>
            <Text style={{}} color={COLORS.black} size="16" weight="600">
              {'Global Commission :'}
            </Text>

            <Text
              style={{
                marginLeft: 10,
              }}
              color={COLORS.primaryColor}
              size="16"
              weight="500">
              {'€ 2.00'}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
              marginHorizontal: 20,
            }}>
            <Text style={{}} color={COLORS.black} size="16" weight="600">
              {'Deliveryman Commission:'}
            </Text>

            <Text
              style={{
                marginLeft: 10,
              }}
              color={COLORS.primaryColor}
              size="16"
              weight="500">
              {'€ 1.00'}
            </Text>
          </View>

          <TextInput
            placeholderTextColor={COLORS.placeHolderTextColor}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={props.secureTextEntry && !open}
            multiline
            numberOfLines={6}
            textAlign="left"
            value={reasonToChange}
            style={[
              styles.inputView,
              styles.inputContainer,
              {
                flex: 1,
                fontFamily: 'Poppins-Regular',
                fontWeight: '400',
                fontSize: 16,
                color: COLORS.black,
                paddingVertical: 1,
                paddingHorizontal: 20,
                borderRadius: 24,
                backgroundColor: '#F0F0F0',
                marginBottom: 20,
              },
            ]}
            placeholder={'Why this change...'}
            onChangeText={text => {
              setReasonToChange(text);
            }}
          />

          <Text
            style={[styles.inputView, {marginTop: 10}]}
            size="20"
            weight="500"
            align="left"
            color={COLORS.textColor}>
            {'Delivery Details'}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              marginHorizontal: 20,
            }}>
            <Text style={{}} color={COLORS.black} size="16" weight="600">
              {'Delivery Date : '}
            </Text>

            <Text
              style={{
                marginLeft: 10,
              }}
              color={COLORS.primaryColor}
              size="16"
              weight="500">
              {'2022-01-19'}
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
              {'Delivery Time : '}
            </Text>

            <Text
              style={{
                marginLeft: 10,
              }}
              color={COLORS.primaryColor}
              size="16"
              weight="500">
              {'12:01'}
            </Text>
          </View>

          <View
            style={{
              backgroundColor: COLORS.borderColor2,
              height: 2,
            }}></View>

          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 20,
              marginTop: 20,
            }}>
            <Text style={{}} color={COLORS.black} size="22" weight="600">
              {'Difference to Pay :'}
            </Text>

            <Text
              style={{
                marginLeft: 10,
              }}
              color={COLORS.primaryColor}
              size="22"
              weight="600">
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
              style={[
                {
                  borderColor: COLORS.primaryColor,
                  borderWidth: 1.2,
                  width: 156,
                },
              ]}
              title={'Refuse'}
              onPress={() => {}}
            />

            <Button
              style={[{width: 156}]}
              title={'Accept'}
              onPress={() => {props.navigation.navigate('SummaryTransaction')}}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1.0,
    backgroundColor: COLORS.white,
  },
  inputView: {
    marginHorizontal: 20,
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
    backgroundColor: '#C4C2C3',
  },
});

export default AdModificationProposal;
