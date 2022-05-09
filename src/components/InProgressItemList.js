import React, { useContext, useEffect, useState } from 'react';
import { View, Dimensions, Image, TouchableOpacity, StyleSheet } from 'react-native';
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

  // var dateA = new Date(moment(props.item.ad_delivery_limit).format('YYYY-MM-DD')).valueOf();
  // var dateB = new Date(moment(new Date()).format('YYYY-MM-DD')).valueOf();

  const dateA = new Date(moment(props.item.ad_delivery_limit, 'YYYY-MM-DDTHH:mm:ss.SSSZ').toString().split('GMT')[0]+ ' UTC').toISOString();
  const dateB = new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString();

  const setImages = prodImg => {
    var imageArray = ''
    if(prodImg){
       imageArray = prodImg.split(',');
    }
    
    return imageArray ? imageArray[0]: '' 
  };

  return (
    <TouchableOpacity
      onPress={() => {
        props.onSummary(item);
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
                props.item.hasOwnProperty('products') ?
                setImages(props.item.products[0].prod_img)
                ? {uri: imageBaseUrl + setImages(props.item.products[0].prod_img)}
                : IMAGES.circle_placeholder : IMAGES.circle_placeholder
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
                  {item.ad_delv_addr}
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
              props.subTabIndex ===1 &&  props.tabStatus != 'completed' ?
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
                props.onCodeExchange(item);
              }}
            />
            :
            null
            }
            {props.tabStatus === 'completed' ?
              props.subTabIndex ===1 && item.user_x[0].rating_status == '0' ?
              <Button
                style={[
                  styles.rating
                ]}
                title={getTranslation('rating')}
                onPress={() => {
                  props.onRating(item);
                }}
              />
              :
              
              props.subTabIndex ===2 && item.user_y[0].rating_status == '0' ?
              <Button
                style={[styles.rating]}
                title={'Rating'}
                // type={1}
                onPress={() => {
  
                  props.onRating(item);
  
                }}
              />
              :
              <Button
                style={[styles.rating, { width: 130, backgroundColor: COLORS.darkGray}]}
                title={'Evaluation Done'}
                type={2}
                onPress={() => {
                    //evalution done  
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
              {moment(item.ad_accept_limit).format('YYYY-MM-DD HH:mm')}
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
                {moment(item.ad_delivery_limit).format('YYYY-MM-DD HH:mm')}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: 5,
              marginBottom: 10,
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 5,
                flex: 1,
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
                {'€ '+ parseFloat(item.ad_pay_amount - item.ad_cmsn_price).toFixed(2)}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginLeft: 5,
                flex: 1,
              }}>
              <Text style={{}} color={COLORS.textColor2} size="16" weight="600">
                {getTranslation('deliveryman_commission') + ' :'}
              </Text>

              <Text
                style={{
                  marginLeft: 10,
                  justifyContent: 'center',
                  alignSelf: 'center'
                }}
                color={COLORS.primaryColor}
                size="16"
                weight="500">
                {'€ '+ parseFloat(item.ad_cmsn_delivery).toFixed(2)}
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

const styles = StyleSheet.create({
rating: {
    width: 93,
    height: 29,
    marginTop: 5,
    backgroundColor: COLORS.primaryColor,
    borderRadius: 0,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default InProgressItemList;
