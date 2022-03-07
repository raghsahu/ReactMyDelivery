import React, {useContext} from 'react';
import {View, Dimensions, Image, TouchableOpacity} from 'react-native';
const {height, width} = Dimensions.get('screen');
//ASSETS
import {COLORS, IMAGES} from '../assets';
//COMMON COMPONENT
import {Text, Button} from '../components';

const IncompleteItemList = props => {
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
          width: 95,
          height: 95,
          margin: 5,
          // borderRadius: 12,
        }}
        source={IMAGES.rectangle_gray_border}
      />

      <View
        style={{
          flex: 1,
          margin: 5,
        }}>
        <Text
          style={{
            flex: 1,
          }}
          color={COLORS.primaryColor}
          size="18"
          weight="500">
          {'Test'}
        </Text>

        <Text color={COLORS.black} size="14" weight="500">
          {'Web Link :ghu.com'}
        </Text>
        <Text color={COLORS.black} size="14" weight="500">
          {'Price :'}
        </Text>

        <View
          style={{
            // marginHorizontal: 20,
            // marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          <Button
            style={[
              {
                width: 88,
                height: 29,
                margin: 5,
                alignSelf: 'center',
                justifyContent: 'center',
              },
            ]}
            title={'Modify'}
            onPress={() => {
              props.onModify();
            }}
          />

          <Button
            style={[
              {
                width: 88,
                height: 29,
                margin: 5,
                backgroundColor: COLORS.red,
                alignSelf: 'center',
                justifyContent: 'center',
              },
            ]}
            title={'Delete'}
            onPress={() => {
              props.onDelete();
            }}
          />
        </View>
      </View>
    </View>
    // </TouchableOpacity>
  );
};

export default IncompleteItemList;
