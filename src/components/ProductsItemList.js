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
import {LocalizationContext} from '../context/LocalizationProvider';

const ProductsItemList = props => {
  const {getTranslation} = useContext(LocalizationContext);
  //const item = props.item;

  return (
    <View
      style={
        {
          //margin: 5,
        }
      }>
      <Image
        style={{
          width: 300,
          height: 300,
          borderRadius: 24,
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

        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
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
            {'www.com'}
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
            {'€ 2.00 x 1 = € 2.00'}
          </Text>
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
    marginHorizontal: 30,
  },
});

export default ProductsItemList;
