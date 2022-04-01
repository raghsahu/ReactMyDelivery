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

const AddProductsItemList = props => {
  const {getTranslation} = useContext(LocalizationContext);
  const item = props.item;

  return (
    <View
      style={
        {
          //margin: 5,
        }
      }>
     {/* {item.prod_img ?  */}
      <Image
        style={{
          width: 300,
          height: 300,
          borderRadius: 24,
          marginHorizontal: 5,
          justifyContent: 'center',
          alignSelf: 'center',
          marginTop: 10,
        }}
        source={item.prod_img ? {uri: item.prod_img} : IMAGES.product_placeholder}
      />
      {/* : null } */}

      <View style={[styles.inputView, {marginTop: 20}]}>
        <Text
          // style={[styles.inputView]}
          size="20"
          weight="500"
          align="left"
          color={COLORS.textColor}>
          {item.product_name}
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
            {item.web_link}
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
            {item.place_to_buy}
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
            {'€ '+ item.price_of_product  +' * '+  item.quantity + ' = € ' + item.price_of_product * item.quantity }
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
            {item.additional_info}
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

export default AddProductsItemList;
