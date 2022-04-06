import React, {useContext} from 'react';
import {View, Dimensions, Image, TouchableOpacity} from 'react-native';
const {height, width} = Dimensions.get('screen');
//ASSETS
import {COLORS, IMAGES} from '../assets';
//COMMON COMPONENT
import {Text, Button} from '../components';
import {LocalizationContext} from '../context/LocalizationProvider';

const IncompleteItemList = props => {
  const {getTranslation} = useContext(LocalizationContext);
  const item = props.item;

  return (
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
        source={
          item.prod_img ? {uri: item.prod_img} : IMAGES.product_placeholder
        }
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
          {item.product_name}
        </Text>

        <Text color={COLORS.black} size="14" weight="500">
          {getTranslation('web_link') + ' : ' + item.web_link}
        </Text>
        <Text color={COLORS.black} size="14" weight="500">
          {'Price : ' +
            '€ ' +
            item.price_of_product +
            ' * ' +
            item.quantity +
            ' = € ' +
            item.price_of_product * item.quantity}
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
            title={getTranslation('modify')}
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
            title={getTranslation('delete')}
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
