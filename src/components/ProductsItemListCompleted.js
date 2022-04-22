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

const ProductsItemListCompleted = props => {
  const {getTranslation} = useContext(LocalizationContext);
  const item = props.item;

  return (
    <View
      style={
        {
          //margin: 5,
        }
      }>
      <View style={[styles.inputView, {marginTop: 10}]}>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 5,
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
          }}>
          <Text style={{}} color={COLORS.black} size="16" weight="600">
            {getTranslation('price') + ':'}
          </Text>

          <Text
            style={{
              marginLeft: 10,
            }}
            color={COLORS.primaryColor}
            size="16"
            weight="500">
            {'€ '+ item.prod_price  +' * '+  item.prod_qnty + ' = € ' + parseFloat(item.prod_price_total).toFixed(2)}
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
    marginHorizontal: 30,
  },
});

export default ProductsItemListCompleted;
