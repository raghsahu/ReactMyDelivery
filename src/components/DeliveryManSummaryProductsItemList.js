import React, { useContext, useState } from 'react';
import {
  View,
  Dimensions,
  Image,
  Linking,
  StyleSheet,
} from 'react-native';
const { height, width } = Dimensions.get('screen');
//ASSETS
import { COLORS, IMAGES, DIMENSION } from '../assets';
//COMMON COMPONENT
import { Text, Button } from '../components';
import { LocalizationContext } from '../context/LocalizationProvider';
import { APPContext } from '../context/AppProvider';
import { validateURL } from '../context/CommonUtils';
import PagerView from 'react-native-pager-view';

const DeliveryManSummaryProductsItemList = props => {
  const { getTranslation } = useContext(LocalizationContext);
  const { imageBaseUrl } = useContext(APPContext);
  const item = props.item;

  const setImages = prodImg => {
    var imageArray = prodImg.split(',');
    return imageArray ? imageArray[0] : ''
  };

  const isLocalUrl = prodImg => {// local capture image url
    if (prodImg.includes('file:')) {
      // Found world
      return true
    }
    return false
  };

  const isJsonFile = jsonStr => {
    try {
      JSON.parse(jsonStr);
      return true
    } catch (e) {
      //console.log('invalid json'); 
      return false
    }
  }

  const setImagesList = prodImg => {
    var ImageList = [];
    var imageArray = prodImg.split(',');
    //console.log('imgArray '+ imageArray )
    for (var i = 0; i < imageArray.length; i++) {
      ImageList.push(imageArray[i]);
    }
    return ImageList
  };

  return (
    <View
      style={
        {
          //margin: 5,
        }
      }>

      {isJsonFile(item.prod_img) ?
        <PagerView style={styles.image} initialPage={0}>
          {JSON.parse(item.prod_img).map(x => {
            return (
              <View >
                <Image
                  style={styles.image}
                  source={{ uri: x }}
                />
              </View>
            )
          })}
        </PagerView>
        :
        <PagerView style={styles.image} initialPage={0}>
          {setImagesList(item.prod_img).map(x => {
            return (
              <View >
                <Image
                  style={styles.image}
                  source={{ uri: imageBaseUrl + x }}
                />
              </View>
            )
          })}
        </PagerView>

      }


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
              weight="500"
              onPress={() => {
                Linking.openURL(validateURL(item.prod_web_link));
              }}>
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
              {'€ ' + item.prod_price + ' * ' + item.prod_qnty + ' = € ' + parseFloat(item.prod_price_total).toFixed(2)}
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
          <Text style={{}} color={COLORS.black} size="16" weight="600">
            {getTranslation('additional_info')}
          </Text>

          <Text
            style={{
              marginLeft: 5,
              flex: 1,
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
  image: {
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
  text_right: {
    marginLeft: 10,
  },
});

export default DeliveryManSummaryProductsItemList;
