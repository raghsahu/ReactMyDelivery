import React, {useContext} from 'react';
import {
  View,
  Dimensions,
  Image,
  ScrollView,
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
      <Image
        style={styles.image}
        source={item.prod_img ? {uri: item.prod_img} : IMAGES.product_placeholder}
      />

      <View style={[styles.inputView, {marginTop: 20}]}>
        <Text
          size="20"
          weight="500"
          align="left"
          color={COLORS.textColor}>
          {item.product_name}
        </Text>

        <View
          style={styles.singleRow}>
          <Text style={{}} color={COLORS.black} size="16" weight="600">
            {getTranslation('web_link') + ' :'}
          </Text>

          <Text
            style={styles.text_right}
            color={'#35CCC1'}
            size="16"
            weight="500">
            {item.web_link}
          </Text>
        </View>

        <View
          style={styles.singleRow}>
          <Text style={{}} color={COLORS.black} size="16" weight="600">
            {getTranslation('place_to_buy')}
          </Text>

          <Text
            style={styles.text_right}
            color={COLORS.darkGray}
            size="16"
            weight="500">
            {item.place_to_buy}
          </Text>
        </View>

        <View
          style={styles.singleRow}>
          <Text style={{}} color={COLORS.black} size="16" weight="600">
            {'Price :'}
          </Text>

          <Text
            style={styles.text_right}
            color={COLORS.primaryColor}
            size="16"
            weight="500">
            {'€ '+ item.price_of_product  +' * '+  item.quantity + ' = € ' + item.price_of_product * item.quantity }
          </Text>
        </View>

        <View
          style={styles.singleRow}>
          <Text style={{}} color={COLORS.black} size="16" weight="600">
            {getTranslation('additional_info')}
          </Text>

          {/* <ScrollView 
          style={[styles.text_right, {height: 70}]}>  */}
          <Text
            style={styles.text_right}
            color={COLORS.darkGray}
            size="16"
            weight="500">
            {item.additional_info}
            {/* {'qwerty uiopasd fghj klmn bvcxz asdf qrwreec yruro prvfk ddkdfn jdjdf djdjd djdjdd ddjsdjdj djdjd djdd djddj djd djd jd djbd djd '} */}
          </Text>
          {/* </ScrollView>  */}
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
  image:{
    width: 300,
    height: 300,
    borderRadius: 24,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  singleRow: {
    flexDirection: 'row',
    marginTop: 5,
  },
  text_right:{
    flex: 1,
    marginLeft: 10,
  },
});

export default AddProductsItemList;
