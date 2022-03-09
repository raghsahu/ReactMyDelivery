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

const ProductsItemListCompleted = props => {
  //const item = props.item;

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
            {'Web Link :'}
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
            {'Place to Buy :'}
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
            {'Additional Information:'}
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

export default ProductsItemListCompleted;