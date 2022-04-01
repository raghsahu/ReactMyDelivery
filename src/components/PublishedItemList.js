import React, {useContext} from 'react';
import {View, Dimensions, Image, TouchableOpacity} from 'react-native';
const {height, width} = Dimensions.get('screen');
//ASSETS
import {COLORS, IMAGES} from '../assets';
//COMMON COMPONENT
import {Text, Button} from '../components';
import {LocalizationContext} from '../context/LocalizationProvider';
import {APPContext} from '../context/AppProvider';

const PublishedItemList = props => {
  const {getTranslation} = useContext(LocalizationContext);
  const {imageBaseUrl} = useContext(APPContext);
  const item = props.item;

  return (
    <View style={{}}>
      <View
        style={{
          padding: 5,
          // marginTop: 4,
          marginLeft: 5,
          marginRight: 5,
          // backgroundColor: '',
        }}>
        <View
          style={{
            // flex: 1,
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
            source={item.products[0].prod_img ? {uri: imageBaseUrl + item.products[0].prod_img} : IMAGES.circle_placeholder}
          />

          <View
            style={{
              padding: 5,
              marginTop: 10,
            }}>
            <Text
              style={{marginBottom: 5}}
              color={COLORS.textColor2}
              size="18"
              weight="500">
              {item.products[0].prod_name}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Image
                tintColor={COLORS.primaryColor}
                style={{
                  width: 20,
                  height: 20,
                  //borderRadius: 35,
                }}
                source={IMAGES.location}
              />

              <Text
                style={{
                  marginLeft: 5,
                }}
                color={COLORS.primaryColor}
                size="16"
                weight="500">
                {item.products[0].prod_place_delivery}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            // flex: 1.0,
            position: 'absolute',
            right: 0,
            marginTop: 5,
            marginRight: 0,
          }}>
          <Button
            style={[
              {
                width: 93,
                height: 29,
                borderRadius: 0,
                alignSelf: 'center',
                justifyContent: 'center',
                backgroundColor: '#C2C2C2',
              },
            ]}
            title={getTranslation('expired')}
            type={2}
            //onPress={() => {props.onModify()}}
          />

          <Button
            style={[
              {
                width: 93,
                height: 29,
                marginTop: 5,
                backgroundColor: COLORS.red,
                borderRadius: 0,
                alignSelf: 'center',
                justifyContent: 'center',
              },
            ]}
            title={getTranslation('delete')}
            onPress={() => {
              props.onDelete();
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginLeft: 5,
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
            marginLeft: 5,
            marginTop: 5,
          }}>
          <Text style={{}} color={COLORS.textColor2} size="16" weight="600">
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
            flexDirection: 'row',
            marginTop: 5,
            marginBottom: 10,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 5,
            }}>
            <Text style={{}} color={COLORS.textColor2} size="16" weight="600">
              {getTranslation('price') + ' :'}
            </Text>

            <Text
              style={{
                marginLeft: 10,
              }}
              color={COLORS.primaryColor}
              size="16"
              weight="500">
              {item.products[0].prod_price}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginLeft: 5,
            }}>
            <Text style={{}} color={COLORS.textColor2} size="16" weight="600">
              {getTranslation('deliveryman_commission') + ' :'}
            </Text>

            <Text
              style={{
                marginLeft: 10,
              }}
              color={COLORS.primaryColor}
              size="16"
              weight="500">
              {item.ad_cmsn_price}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          height: 4,
          backgroundColor: '#D5D5D5',
        }}></View>
    </View>
  );
};

export default PublishedItemList;
