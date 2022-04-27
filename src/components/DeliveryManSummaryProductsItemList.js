import React, {useContext, useState} from 'react';
import {
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
const {height, width} = Dimensions.get('screen');
//ASSETS
import {COLORS, IMAGES, DIMENSION} from '../assets';
//COMMON COMPONENT
import {Text, Button} from '../components';
import {LocalizationContext} from '../context/LocalizationProvider';
import {APPContext} from '../context/AppProvider';
import PagerView from 'react-native-pager-view';

const DeliveryManSummaryProductsItemList = props => {
  const {getTranslation} = useContext(LocalizationContext);
  const {imageBaseUrl} = useContext(APPContext);
  const item = props.item;

  const setImages = prodImg => {
    var imageArray = prodImg.split(',');
   // console.log('imaggggg '+ imageArray[0])
    return imageArray ? imageArray[0]: '' 
  };

  const isValidHttpUrl = prodImg => {
    if (prodImg.includes('file:')) { 
      // Found world
      return true
    }
      return false

  };

  return (
    <View
      style={
        {
          //margin: 5,
        }
      }>
     <Image
          style={styles.image}
            source={props.isProposalToModificationOfAd ? {uri: isValidHttpUrl(setImages(item.prod_img)) ? setImages(item.prod_img) : imageBaseUrl+ setImages(item.prod_img) } : 
              setImages(item.prod_img)
                ? {uri: imageBaseUrl + setImages(item.prod_img)}
                : IMAGES.product_placeholder
            }
          />
          {/* <PagerView style={styles.image} initialPage={0}>
            {setImages(item.prod_img).map(x => {
            // console.log(x);
              return (
                <View >
                  <Image
                    style={styles.image}
                    source={{uri: x}}
                  />
                </View>
              )
            })}
      
          </PagerView> */}

          <View style={[styles.inputView, { marginTop: 20 }]}>
            <Text
              // style={[styles.inputView]}
              size="20"
              weight="500"
              align="left"
              color={COLORS.textColor}>
              {item.prod_name}
            </Text>
            {props.isProposalToModificationOfAd && (
              <Text
                style={[styles.rightButtons, { position: 'absolute' }]}
                size="16"
                weight="500"
                align="left"
                color={COLORS.white}
                onPress={() => {
                  props.photosModalVisibleModalVisibility(item.prod_id);
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
                   {item.prod_web_link}
                </Text>
              </View>
              {props.isProposalToModificationOfAd && (
                <Text
                  style={styles.rightButtons}
                  color={COLORS.white}
                  size="16"
                  weight="500"
                  onPress={() => {
                    props.webLinkModalVisibleModalVisibility(item.prod_id);
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
                {item.prod_place_purchase}
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
                  {'€ '+ item.prod_price  +' * '+  item.prod_qnty + ' = € ' + parseFloat(item.prod_price_total).toFixed(2) }
                </Text>
              </View>
              {props.isProposalToModificationOfAd && (
                <Text
                  style={[styles.rightButtons]}
                  color={COLORS.white}
                  size="16"
                  weight="500"
                  onPress={() => {
                    props.changePriceQuantityModalVisibleModalVisibility(item.prod_id);
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
              <Text style={{flex:0.5,}} color={COLORS.black} size="16" weight="600">
                {getTranslation('additional_info')}
              </Text>

              <Text
                style={{
                  marginLeft: 10,
                  flex:1,
                }}
                color={COLORS.darkGray}
                size="16"
                weight="500">
                {item.prod_info}
              </Text>
            </View>
          </View>

      <View
        style={{
          backgroundColor: COLORS.gray,
          height: 2,
          marginTop: 10,
        }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1.0,
    backgroundColor: COLORS.white,
  },
  inputView: {
    marginHorizontal: DIMENSION.marginHorizontal,
  },
  image:{
      width: 300,
      height: 300,
      marginTop: 20,
      borderRadius: 35,
      marginHorizontal: 5,
      justifyContent: 'center',
      alignSelf: 'center',
  },
   rightButtons: {
    // position: 'absolute',
    alignSelf: 'flex-end',
    borderRadius: 30,
    paddingVertical: 2,
    paddingHorizontal: 10,
    backgroundColor: COLORS.primaryColor,
  },
  text_right:{
    marginLeft: 10,
  },
});

export default DeliveryManSummaryProductsItemList;
