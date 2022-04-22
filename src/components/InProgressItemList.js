import React, { useContext, useEffect, useState } from 'react';
import { View, Dimensions, Image, TouchableOpacity } from 'react-native';
const { height, width } = Dimensions.get('screen');
//ASSETS
import { COLORS, IMAGES } from '../assets';
//COMMON COMPONENT
import { Text, Button } from '../components';
import { LocalizationContext } from '../context/LocalizationProvider';
import { APPContext } from '../context/AppProvider';
import moment from 'moment'; // date format

const InProgressItemList = props => {
  const { getTranslation } = useContext(LocalizationContext);
  const { imageBaseUrl } = useContext(APPContext);
  const [products, setProducts] = useState({});
  const item = props.item;

  var dateA = new Date(moment(props.item.ad_delivery_limit).format('YYYY-MM-DD')).valueOf();
  var dateB = new Date(moment(new Date()).format('YYYY-MM-DD')).valueOf();

  useEffect(() => {
    if (props.item.hasOwnProperty('products')) {
      setProducts(props.item.products[0])
    }

  }, []);

  return (
    <TouchableOpacity
      onPress={() => {
        props.onSummary();
      }}
    >
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
              source={
                item.user_img
                  ? { uri: imageBaseUrl + item.user_img }
                  : IMAGES.circle_placeholder
              }
            />

            <View
              style={{
                padding: 5,
                marginTop: 10,
                flex: 1,
              }}>
              <Text
                style={{ marginBottom: 5 }}
                color={COLORS.textColor2}
                size="18"
                weight="500">
                {item.user_f_name + ' ' + item.user_l_name}
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
                    //marginRight: 10,
                    //flex: 1,
                  }}
                  color={COLORS.primaryColor}
                  size="16"
                  weight="500">
                  {products.prod_place_delivery}
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
            {props.tabStatus === 'inProgress' && dateB > dateA ?
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
                title={'Complaint'}
                type={2}
               onPress={() => {props.onComplaint()}}
              />
              :
              props.subTabIndex ===1 ?
              <Button
              style={[
                {
                  width: 133,
                  height: 36,
                  marginTop: 5,
                  backgroundColor: COLORS.primaryColor,
                  borderRadius: 133/2,
                  alignSelf: 'center',
                  justifyContent: 'center',
                },
              ]}
              title={getTranslation('txn_code')}
              onPress={() => {
                props.onCodeExchange();
              }}
            />
            :
            null
            }
            {props.tabStatus === 'completed' ?
              <Button
                style={[
                  {
                    width: 93,
                    height: 29,
                    marginTop: 5,
                    backgroundColor: COLORS.primaryColor,
                    borderRadius: 0,
                    alignSelf: 'center',
                    justifyContent: 'center',
                  },
                ]}
                title={getTranslation('rating')}
                onPress={() => {
                  props.onRating();
                }}
              />
              :
              null
            }
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
                {products.prod_price_total}
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
                {item.ad_cmsn_delivery}
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
    </TouchableOpacity>
  );
};

export default InProgressItemList;