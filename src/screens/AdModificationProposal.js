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
} from '../components';
import {Rating} from 'react-native-ratings';
//CONTEXT
import {LocalizationContext} from '../context/LocalizationProvider';

const {height, width} = Dimensions.get('screen');

function AdModificationProposal(props) {
  const [name, setName] = useState('');
  const [day, setDay] = useState('');
  const [hour, setHour] = useState('');
  const [reasonToChange, setReasonToChange] = useState('');
  const {getTranslation} = useContext(LocalizationContext);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.white} />

      <SafeAreaView style={styles.container}>
        <Header
          title={getTranslation('proposal_modification_ad')}
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
            {getTranslation('your_announcement')}
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
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                // style={{flex: 1}}
                size="20"
                weight="500"
                align="left"
                color={COLORS.textColor}>
                {'souris'}
              </Text>

              <Text
                style={[styles.rightButtons, {width: 150}]}
                size="16"
                weight="500"
                align="center"
                color={COLORS.textColor5}>
                {getTranslation('photo_changed')}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 10
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

              <Text
                style={[styles.rightButtons, {width: 97}]}
                size="16"
                weight="500"
                align="center"
                color={COLORS.textColor5}>
                {getTranslation('changed')}
              </Text>
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

              {/* <Text
                style={[styles.rightButtons]}
                color={COLORS.textColor5}
                size="16"
                weight="500"
                onPress={() => {}}>
                {getTranslation('changed')}
              </Text> */}
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
            <Text
              style={[
                styles.rightButtons,
                {position: 'absolute',  alignSelf: 'flex-end'},
              ]}
              color={COLORS.textColor5}
              size="16"
              weight="500"
              onPress={() => {}}>
              {getTranslation('changed')}
            </Text>

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
                {getTranslation('deliveryman_commission') + ' :'}
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

              {/* <Text
                style={[styles.rightButtons, {marginRight: 0}]}
                color={COLORS.textColor5}
                size="16"
                weight="500"
                onPress={() => {}}>
                {getTranslation('changed')}
              </Text> */}
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
              {getTranslation('global_commission') + ' :'}
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
              {getTranslation('deliveryman_commission') + ' :'}
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
            style={[styles.inputView, styles.comment]}
            placeholder={getTranslation('why_this_change')}
            multiline={true}
            //value={''}
          />

          <Text
            style={[styles.inputView, {marginTop: 10}]}
            size="20"
            weight="500"
            align="left"
            color={COLORS.textColor}>
            {getTranslation('delivery_details')}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              marginHorizontal: 20,
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
              {getTranslation('delivery_time')}
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
              {getTranslation('difference_to_pay')}
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
              title={getTranslation('refuse')}
              onPress={() => {}}
            />

            <Button
              style={[{width: 156}]}
              title={getTranslation('accept')}
              onPress={() => {
                props.navigation.navigate('SummaryTransaction', {
                  status: '',
                });
              }}
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
    height: 38,
    borderRadius: 19,
    paddingVertical: 7,
    paddingHorizontal: 10,
    backgroundColor: '#C4C2C3',
    justifyContent: 'center',
    alignSelf: 'center',
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
});

export default AdModificationProposal;
