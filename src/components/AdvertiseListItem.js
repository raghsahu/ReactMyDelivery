import React, {useContext} from 'react';
import {
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
const {height, width} = Dimensions.get('screen');
//ASSETS
import {COLORS, IMAGES} from '../assets';
//COMMON COMPONENT
import {Text, Button} from '../components';
import {Rating} from 'react-native-ratings';
//CONTEXT
import {LocalizationContext} from '../context/LocalizationProvider';
import {APPContext} from '../context/AppProvider';

const AsSenderItemList = props => {
  const {getTranslation} = useContext(LocalizationContext);
  const {imageBaseUrl} = useContext(APPContext);
  const item = props.item;

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
      <Text color={COLORS.textColor2} size="8" weight="bold" align={'right'}>
        {getTranslation('publication_date') + ' : '+ item.ad_create_date}
      </Text>

      <View>
        <View style={styles.mainViewStyle}>
          <View style={{}}>
            <Text style={{}} color={COLORS.textColor2} size="8" weight="800">
              {getTranslation('application_rate')}
            </Text>
            <Text style={{}} color={COLORS.textColor} size="8" weight="400">
              {getTranslation('number_evaluation') + ' 31'}
            </Text>
          </View>
          <View style={styles.ratingView}>
            <Rating
              //isDisabled= {true}
              type="custom"
              ratingColor="#04D9C5"
              startingValue={item.user_rating ? item.user_rating : 0}
              ratingBackgroundColor="#c8c7c8"
              ratingCount={5}
              imageSize={13}
              isDisabled={false}
              // onFinishRating={this.ratingCompleted}
              style={{paddingVertical: 1}}
            />
          </View>
        </View>

        <View style={styles.imageView}>
          <Image style={styles.image} 
          source={
              item.products[0].prod_img
                ? {uri: imageBaseUrl + item.products[0].prod_img}
                : IMAGES.circle_placeholder
            } />

          <View
            style={{
              margin: 5,
            }}>
            <Text style={{}} color={COLORS.textColor} size="18" weight="500">
              {item.products[0].prod_name}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <View style={styles.circleView}>
                <Image
                  source={IMAGES.location}
                  tintColor={COLORS.white}
                  style={styles.locationIcon}
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
                {item.products[0].prod_place_delivery}
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.text_left]}>
          <Text style={{}} color={COLORS.textColor2} size="16" weight="500">
            {getTranslation('acceptance_limit')}
          </Text>

          <Text
            style={styles.text_right}
            color={COLORS.textColor3}
            size="16"
            weight="500">
            {item.ad_accept_limit}
          </Text>
        </View>

        <View style={[styles.text_left]}>
          <Text style={{}} color={COLORS.textColor2} size="16" weight="500">
            {getTranslation('delivery_limit')}
          </Text>

          <Text
            style={styles.text_right}
            color={COLORS.textColor3}
            size="16"
            weight="500">
            {item.ad_delivery_limit}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
            marginBottom: 5,
            //justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 5,
              alignItems: 'center',
            }}>
            <Text style={{}} color={COLORS.textColor2} size="16" weight="500">
              {getTranslation('price') + ' :'}
            </Text>

            <Text
              style={styles.text_left}
              color={COLORS.primaryColor}
              size="16"
              weight="500">
              {'€ '+ item.products[0].prod_price}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginLeft: 25,
            }}>
            <Text style={{}} color={COLORS.black} size="16" weight="500">
              {getTranslation('delivery_man_commission') + ' :'}
            </Text>

            <Text
              style={[styles.text_right, {alignSelf: 'center'}]}
              color={COLORS.primaryColor}
              size="16"
              weight="500">
              {'€ '+ item.ad_cmsn_delivery}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: '#D5D5D5',
        }}></View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1.0,
    backgroundColor: COLORS.white,
  },
  mainViewStyle: {
    flex: 1.0,
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    marginTop: 5,
    flexDirection: 'row',
  },
  ratingView: {
    marginStart: 5,
    alignSelf: 'center',
  },
  imageView: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    margin: 5,
  },
  locationIcon: {
    height: 18,
    width: 18,
    alignSelf: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  circleView: {
    backgroundColor: COLORS.primaryColor,
    height: 27,
    width: 27,
    margin: 1,
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  text_left: {
    flexDirection: 'row',
    marginLeft: 5,
    marginTop: 5,
  },
  text_right: {
    marginLeft: 10,
  },
});

export default AsSenderItemList;
