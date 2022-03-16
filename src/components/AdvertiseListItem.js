import React, {useContext} from 'react';
import {View, Dimensions, Image, TouchableOpacity} from 'react-native';
const {height, width} = Dimensions.get('screen');
//ASSETS
import {COLORS, IMAGES} from '../assets';
//COMMON COMPONENT
import {Text, Button} from '../components';
import {Rating} from 'react-native-ratings';
//CONTEXT
import { LocalizationContext } from '../context/LocalizationProvider';

const AsSenderItemList = props => {
  const { getTranslation} = useContext(LocalizationContext);
  //const item = props.item;

  return (
    <TouchableOpacity
      style={[
        props.mainViewStyle,
        {
          backgroundColor: COLORS.white,
        },
      ]}
      onPress={() => {
        props.onSummary();
      }}>
      <Text
        // style={{marginBottom:10}}
        color={COLORS.textColor2}
        size="8"
        weight="bold"
        align={'right'}>
        {getTranslation('publication_date') +' : 2022-01-13'}
      </Text>

      <View>
        <View
          style={{
            flex: 1.0,
            // justifyContent: 'space-between',
            alignSelf: 'center',
            justifyContent: 'center',
            position: 'absolute',
            right: 0,
            marginTop: 5,
            flexDirection: 'row',
          }}>
          <View style={{}}>
            <Text style={{}} color={COLORS.textColor2} size="8" weight="800">
              {getTranslation('application_rate')}
            </Text>
            <Text style={{}} color={COLORS.textColor} size="8" weight="400">
              {getTranslation('number_evaluation') +' 31'}
            </Text>
          </View>
          <View
            style={{
              marginStart: 5,
              alignSelf: 'center',
            }}>
            <Rating
              //isDisabled= {true}
              type="custom"
              ratingColor="#04D9C5"
              startingValue={4}
              ratingBackgroundColor="#c8c7c8"
              ratingCount={5}
              imageSize={13}
              isDisabled={false}
              // onFinishRating={this.ratingCompleted}
              style={{paddingVertical: 1}}
            />
          </View>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: 20,
          }}>
          <Image
            style={{
              width: 70,
              height: 70,
              borderRadius: 35,
              margin: 5,
            }}
            source={IMAGES.circle_placeholder}
          />

          <View
            style={{
              margin: 5,
            }}>
            <Text style={{}} color={COLORS.textColor} size="18" weight="500">
              {'Test3'}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <View
                style={{
                  backgroundColor: COLORS.primaryColor,
                  height: 27,
                  width: 27,
                  margin: 1,
                  borderRadius: 20,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  marginRight: 5,
                }}>
                <Image
                  source={IMAGES.location}
                  tintColor={COLORS.white}
                  style={{
                    height: 18,
                    width: 18,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    resizeMode: 'contain',
                  }}
                />
              </View>

              <Text
                style={{
                  marginLeft: 5,
                  width: 220,
                }}
                color={COLORS.primaryColor}
                size="16"
                weight="500">
                {'Constantine Constantine, Algerie '}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginLeft: 5,
            marginTop: 5,
          }}>
          <Text style={{}} color={COLORS.textColor2} size="16" weight="600">
            {getTranslation('acceptance_limit')}
          </Text>

          <Text
            style={{
              marginLeft: 10,
            }}
            color={COLORS.textColor3}
            size="16"
            weight="500">
            {'2021-11-07 14:42'}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginLeft: 5,
            marginTop: 10,
          }}>
          <Text style={{}} color={COLORS.textColor2} size="16" weight="600">
            {getTranslation('delivery_limit')}
          </Text>

          <Text
            style={{
              marginLeft: 10,
            }}
            color={COLORS.textColor3}
            size="16"
            weight="500">
            {'2021-11-07 14:42'}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            marginBottom: 5,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 5,
              alignItems: 'center',
            }}>
            <Text style={{}} color={COLORS.textColor2} size="16" weight="600">
              {getTranslation('price') +' :'}
            </Text>

            <Text
              style={{
                marginLeft: 10,
              }}
              color={COLORS.primaryColor}
              size="16"
              weight="500">
              {'€ 6.00'}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginLeft: 5,
            }}>
            <Text style={{}} color={COLORS.black} size="16" weight="600">
              {getTranslation('delivery_man_commission') +' :'}
            </Text>

            <Text
              style={{
                marginLeft: 10,
                alignSelf: 'center',
              }}
              color={COLORS.primaryColor}
              size="16"
              weight="500">
              {'€ 6.00'}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          backgroundColor: COLORS.gray,
          height: 1,
        }}></View>
    </TouchableOpacity>
  );
};

export default AsSenderItemList;
