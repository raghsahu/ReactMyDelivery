import React, {useContext, useState} from 'react';
import {View, Dimensions, Image, TouchableOpacity, StyleSheet} from 'react-native';
const {height, width} = Dimensions.get('screen');
//ASSETS
import {COLORS, IMAGES} from '../assets';
//COMMON COMPONENT
import {Text, Button} from '../components';
//CONTEXT
import { LocalizationContext } from '../context/LocalizationProvider';

const FilterItem = props => {
  const { getTranslation} = useContext(LocalizationContext);
  const item = props.item;
  //const[selected, setSelected]= useState(false);

  return (
    <TouchableOpacity style={[item.selected ? styles.filter_item_selected : styles.filter_item]}
        onPress={() => {
           // setSelected(!selected);
            props.onFilter(item.key);
        }}>
    <Text
      style={{textAlignVertical: 'center'}}
      size="10"
      weight="500"
      align="center"
      color={item.selected ? COLORS.white : COLORS.textColor3}>
      {item.label}
    </Text>
  </TouchableOpacity>

    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1.0,
      backgroundColor: COLORS.white,
    },
    filter_item: {
      flex: 1,
      height: 30,
      width: '33%',
      borderRadius: 15,
      margin: 5,
      borderWidth: 1,
      borderColor:  COLORS.borderColor,
      backgroundColor:  COLORS.white,
      paddingHorizontal: 5,
      justifyContent: 'center', 
    },
    filter_item_selected: {
        flex: 1,
        height: 30,
        width: '33%',
        borderRadius: 15,
        margin: 5,
        borderWidth: 1,
        borderColor:  COLORS.primaryColor ,
        backgroundColor: COLORS.primaryColor ,
        paddingHorizontal: 5,
        justifyContent: 'center', 
      },
  });

export default FilterItem;