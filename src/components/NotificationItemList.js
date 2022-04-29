import React, {useContext} from 'react';
import {View, Dimensions, Image, TouchableOpacity} from 'react-native';
const {height, width} = Dimensions.get('screen');
//ASSETS
import {COLORS, IMAGES} from '../assets';
//COMMON COMPONENT
import {Text, Button} from '../components';
import {APPContext} from '../context/AppProvider';
import {CommonUtilsContext} from '../context/CommonUtils';

/*
* Notifictions type
0- Nothing,
1- Y deliveryman change parameter ,
2- Z Accept ad ,
3- X Accept ad,
4- Y recovers the item from Z,
5- Y accepts the ads notify the X & Z
6- X send proposal to Z
7- Z send proposal to X
8- Y delivered to X
9- Y change the date*/

const NotificationItemList = props => {
  const item = props.item;
  const {imageBaseUrl} = useContext(APPContext);
  const {changeDateFormat} = useContext(CommonUtilsContext);

  const setImages = prodImg => {
    var imageArray = prodImg.split(',');
    //console.log('image '+ imageArray)
    return imageArray ? imageArray[0] : '';
  };

  return (
    <TouchableOpacity
      style={{
        //paddingVertical: 10,
    
      }}
      onPress={() => props.onPress()}>
    <View
      style={{
        flexDirection: 'row',
        marginTop: 10,
        marginHorizontal: 10,
        backgroundColor: COLORS.white,
        borderRadius: 8,
      }}>
      <View
        style={{
          backgroundColor: COLORS.primaryColor,
          borderBottomLeftRadius: 8,
          borderTopLeftRadius: 8,
          width: 5,
        }}></View>
      <Image
        style={{
          width: 57,
          height: 76,
          margin: 5,
          //resizeMode: 'contain'
        }}
        source={
          setImages(item.prod_img)
            ? {uri: imageBaseUrl + setImages(item.prod_img)}
            : IMAGES.product_placeholder
        }
      />

      <View
        style={{
          flex: 1,
          margin: 5,
        }}>
        <Text style={{}} color={COLORS.primaryColor} size="16" weight="500">
          {item.user_f_name + ' ' + item.user_l_name}
        </Text>

        <Text color={COLORS.black} size="16" weight="500">
          {item.prod_name}
        </Text>
        <Text color={COLORS.darkGray} size="14" weight="500">
          {changeDateFormat(item.notn_create_date, 'yyyy-MM-DD hh:mm a')}
        </Text>
      </View>
    </View>
    </TouchableOpacity>
  );
};

export default NotificationItemList;
