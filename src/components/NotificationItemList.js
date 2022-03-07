import React, {useContext} from 'react';
import {View, Dimensions, Image, TouchableOpacity} from 'react-native';
const {height, width} = Dimensions.get('screen');
//ASSETS
import {COLORS, IMAGES} from '../assets';
//COMMON COMPONENT
import {Text, Button} from '../components';

const NotificationItemList = props => {
  //const item = props.item;

  return (
    // <TouchableOpacity
    //   style={{
    //     paddingVertical: 10,
    //
    //   }}
    //   onPress={() => props.onPress()}>
    <View
      style={{
        flexDirection: 'row',
        margin: 5,
        backgroundColor: COLORS.white,
      }}>
      <Image
        style={{
          width: 57,
          height: 76,
          margin: 5,
          resizeMode: 'contain'
        }}
        source={IMAGES.circle_placeholder}
      />

      <View
        style={{
          flex: 1,
          margin: 5,
        }}>
        <Text
          style={{
            
          }}
          color={COLORS.primaryColor}
          size="16"
          weight="500">
          {'Test'}
        </Text>

        <Text color={COLORS.black} size="16" weight="500">
          {'Lorem Impsum Lorem Impsum Lorem Impsum Lorem '}
        </Text>
        <Text color={COLORS.darkGray} size="14" weight="500">
          {'2022-01-13  20:08'}
        </Text>

      </View>
    </View>
    // </TouchableOpacity>
  );
};

export default NotificationItemList;
