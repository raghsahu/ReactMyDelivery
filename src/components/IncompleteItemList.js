import React, { useContext } from 'react';
import { View, Dimensions, Image, Linking } from 'react-native';
const { height, width } = Dimensions.get('screen');
//ASSETS
import { COLORS, IMAGES } from '../assets';
//COMMON COMPONENT
import { Text, Button } from '../components';
import { LocalizationContext } from '../context/LocalizationProvider';
import { validateURL } from '../context/CommonUtils';

const IncompleteItemList = props => {
  const { getTranslation } = useContext(LocalizationContext);
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
          width: 70,
          height: 70,
          margin: 5,
          borderRadius: 35,
        }}
        source={
          item ? { uri: JSON.parse(item.prod_img)[0] } : IMAGES.product_placeholder
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
          {item ? item.product_name : ''}
        </Text>

        <Text color={COLORS.black} size="14" weight="500"
         onPress={() => {
          Linking.openURL(validateURL(item ? item.web_link : ''));
        }}>
          {getTranslation('web_link') + ' : ' + item.web_link ? item.web_link : ''}
        </Text>
        <Text color={COLORS.black} size="14" weight="500">
          {item ? 'Price : ' +
            '€ ' +
            item.price_of_product +
            ' * ' +
            item.quantity +
            ' = € ' +
            item.price_of_product * item.quantity : ''}
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
